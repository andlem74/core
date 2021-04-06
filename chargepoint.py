"""Ladepunkt-Logik
"""

import time
import RPi.GPIO as GPIO

import data
import ev
import log
import pub
import timecheck


class allChargepoints():
    """
    """

    def __init__(self):
        self.data = {}
        self.data["get"] = {}
        pub.pub("openWB/chargepoint/get/power_all", 0)

    def used_power_all(self):
        """ermittelt die verwendete Leistung in allen Phasen.

        Return
        ------
        int: aufsummierte Leistung über alle Phasen und Ladepunkte
        """
        used_power_all = 0
        for chargepoint in data.cp_data:
            if "cp" in chargepoint:
                if "get" in data.cp_data[chargepoint].data:
                    if "power_all" in data.cp_data[chargepoint].data["get"]:
                        used_power_all += data.cp_data[chargepoint].data["get"]["power_all"]
        data.cp_data["all"].data["get"]["power_all"] = used_power_all
        pub.pub("openWB/chargepoint/get/power_all", used_power_all)

class chargepoint():
    """ geht alle Ladepunkte durch, prüft, ob geladen werden darf und ruft die Funktion des angesteckten Autos auf. 
    """

    def __init__(self, index):
        self.data = {}
        self.template = None  # Instanz des zugeordneten CP-Templates
        self.cp_num = index
        self.data["set"] = {}
        self.data["set"]["autolock_state"] = 0
        pub.pub("openWB/chargepoint_hw/"+str(self.cp_num)+"/set/current", 0)
        pub.pub("openWB/chargepoint_hw/"+str(self.cp_num)+"/set/autolock_state", 0)
        self.log_pub_state_str("")

    def log_pub_state_str(self, message):
        """sendet die Nachricht an den Broker und schreibt sie ins Debug-Log

        Parameter
        ---------
        message: str
            Nachricht, die gesendet werden soll
        """
        if message != "":
            log.message_debug_log("info", message)
        pub.pub("openWB/chargepoint/"+str(self.cp_num)+"/get/state_str", message)

    def _is_cp_available(self):
        """ prüft, ob sich der LP in der vorgegebenen Zeit zurückgemeldet hat.
        """
        # dummy
        state = True
        if state == False:
            self.log_pub_state_str("LP"+self.cp_num+" gesperrt, da sich der LP nicht innerhalb der vorgegebenen Zeit zurueckgemeldet hat.")
        else:
            self.log_pub_state_str("")
        return state

    def _is_autolock_active(self):
        """ ruft die Funktion der Template-Klasse auf.
        """
        try:
            state = self.template.autolock(self.data["set"]["autolock_state"], self.data["get"]["charge_state"], self.cp_num)
            if state == False:
                self.log_pub_state_str("Keine Ladung an LP"+self.cp_num+", da Autolock aktiv ist.")
            else:
                self.log_pub_state_str("")
            return state
        except Exception as e:
            log.exception_logging(e)

    def _is_manual_lock_active(self):
        state = self.data["set"]["manual_lock"]
        if state == True:
            self.log_pub_state_str("Keine Ladung an LP"+self.cp_num+", da der LP manuell gesperrt wurde.")
        else:
            self.log_pub_state_str("")
        return state

    def _is_ev_plugged(self):
        state = self.data["get"]["plug_state"]
        if state == False:
            self.log_pub_state_str("Keine Ladung an LP"+self.cp_num+", da kein Auto angesteckt ist.")
        else:
            self.log_pub_state_str("")
        return state

    def get_state(self):
        """prüft alle Bedingungen und ruft die EV-Logik auf.

        Return
        ------
        0..x: Nummer des zugeordneten EV
        None: Ladepunkt nicht verfügbar
        """
        try:
            if self._is_cp_available() == True:
                if self._is_manual_lock_active() == False:
                    if self._is_ev_plugged() == True:
                        if self._is_autolock_active() == True:
                            return self.template.get_ev(self.data["get"]["rfid"], self.cp_num)
            # Daten zurücksetzen, wenn nicht geladen werden soll.
            self.data.pop("set")
            pub.pub("openWB/chargepoint/"+str(self.cp_num)+"/set/charging_ev", "")
            pub.pub("openWB/chargepoint/"+str(self.cp_num)+"/set/current", 0)
            pub.pub("openWB/chargepoint/"+str(self.cp_num)+"/set/energy_to_charge", 0)
            pub.pub("openWB/chargepoint/"+str(self.cp_num)+"/set/phases_to_use", 0)
        except Exception as e:
            log.exception_logging(e)
            return None
        return None

    def initiate_control_pilot_interruption(self):
        """ prüft, ob eine Control Pilot- Unterbrechung erforderlich ist und führt diese durch.
        """
        try:
            charging_ev = self.data["set"]["charging_ev"]
            # War die Ladung pausiert?

            # Ist Control Pilot-Unterbrechung hardwareseitig möglich und ist die Control Pilot-Unterbrechung für das EV erforderlich?
            if self.data["config"]["control_pilot_interruption_hw"] == True and charging_ev.ev_template.data["control_pilot_interruption"] == True:
            # 50s warten bis CP-Skript aufgerufen wird?
                #self.perform_control_pilot_interruption(charging_ev.ev_template.data["control_pilot_interruption_duration"])
                log.message_debug_log("debug", "# Control-Pilot-Unterbrechung an LP"+str(self.cp_num)+" fuer "+charging_ev.ev_template.data["control_pilot_interruption_duration"]+"s durchfuehren.")
        except Exception as e:
            log.exception_logging(e)

class cpTemplate():
    """ Vorlage für einen LP.
    """

    def __init__(self):
        self.data = {}

    def autolock(self, autolock_state, charge_state, cp_num):
        """ ermittelt den Status des Autolock und published diesen. Es wird sich immer der Status des vorherigen Plans gemerkt, so kann festgestellt  werden, wenn sich zwei Pläne widersprechen.

        Parameter
        ---------
        autolock_state : int
            Autolock-Status-Code:
            0 = standby
            1 = Nach Beenden der Ladung wird Autolock aktiviert
            2 = durch Autolock gesperrt
            3 = nicht durch Autolock gesperrt
            4 = Autolock manuell deaktiviert

        charge_state : int
            Ladung aktiv/nicht aktiv

        cp_num : str
            LP-Nummer

        Return
        ------
        True: nicht durch Autolock gesperrt -> Ladung möglich
        False: durch Autolock gesperrt
        """
        try:
            if (self.data["autolock"]["active"] == True):
                if autolock_state != 4:
                    if timecheck.check_plans_timeframe(self.data["autolock"]) != None:
                        if self.data["autolock"]["wait_for_charging_end"] == True:
                            if charge_state == True:
                                state = 1
                            else:
                                state = 2
                        else:
                            state = 2
                    else:
                        state = 3

                    pub.pub("openWB/chargepoint/"+cp_num+"/set/autolock_state", state)
                    if (state == 1) or (state == 3):
                        return True
                    elif state == 2:
                        return False
                else:
                    return True
            else:
                return True
        except Exception as e:
            log.exception_logging(e)
            return True

    def autolock_manual_disabling(self, topic_path):
        """ aktuelles Autolock wird außer Kraft gesetzt.

        Parameter
        ---------
        topic_path : str
            allgemeiner Pfad für Chargepoint-Topics
        """
        try:
            if (self.data["autolock"]["active"] == True):
                pub.pub(topic_path+"/get/autolock", 4)
        except Exception as e:
            log.exception_logging(e)

    def autolock_manual_enabling(self, topic_path):
        """ aktuelles Autolock wird wieder aktiviert.

        Parameter
        ---------
        topic_path : str
            allgemeiner Pfad für Chargepoint-Topics
        """
        try:
            if (self.data["autolock"]["active"] == True):
                pub.pub(topic_path+"/get/autolock", 0)
        except Exception as e:
            log.exception_logging(e)

    def autolock_enable_after_charging_end(self, autolock_state, topic_path):
        """Wenn kein Strom für den LP übrig ist, muss Autolock ggf noch aktiviert werden.

        Parameter
        ---------
        topic_path : str
            allgemeiner Pfad für Chargepoint-Topics
        """
        try:
            if (self.data["autolock"]["active"] == True) and autolock_state == 1:
                pub.pub(topic_path+"/set/autolock", 2)
        except Exception as e:
            log.exception_logging(e)

    def get_ev(self, rfid, cp_num):
        """ermittelt das dem LP zugeordnete EV
        """
        ev_num = 0
        try:
            if self.data["rfid_enabling"] == True and rfid != 0:
                vehicle = ev.get_ev_to_rfid(rfid)
                if vehicle == None:
                    ev_num = self.data["ev"]
                else:
                    ev_num = vehicle
            else:
                ev_num = self.data["ev"]
            pub.pub("openWB/chargepoint/"+cp_num+"/set/autolock_state", ev_num)
            return ev_num
        except Exception as e:
            log.exception_logging(e)