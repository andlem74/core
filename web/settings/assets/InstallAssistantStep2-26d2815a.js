import{C as l}from"./index-f9dddb60.js";import u from"./InstallAssistantStepTemplate-ebbbe760.js";import d from"./System-e67fdb26.js";import{_ as p,u as a,k as f,z as g,E as o,x as s,G as S}from"./vendor-809787c9.js";import"./vendor-fortawesome-e760f6db.js";import"./vendor-bootstrap-5ce91dd7.js";import"./vendor-jquery-49acc558.js";import"./vendor-axios-57a82265.js";import"./vendor-sortablejs-d99a4022.js";const c={name:"InstallAssistantStep2",components:{InstallAssistantStepTemplate:u,SystemView:d},mixins:[l],emits:["save","reset","defaults","sendCommand","switchPage","endAssistant"],data:()=>({mqttTopicsToSubscribe:[]}),methods:{nextPage(){this.$emit("switchPage",3)},previousPage(){this.$emit("switchPage",1)},endAssistant(){this.$emit("endAssistant")}}};function A(t,e,w,k,v,i){const r=a("SystemView"),m=a("InstallAssistantStepTemplate");return f(),g(m,{title:"2. Aktualisierung des openWB-Systems",onNextPage:i.nextPage,onPreviousPage:i.previousPage,onEndAssistant:i.endAssistant},{help:o(()=>e[4]||(e[4]=[s("p",null," Bitte ein System-Update durchführen, um die Software auf den neuesten Stand der Features und Funktionen zu bringen. ",-1),s("p",null," Hierzu Versions-Informationen / Aktualisierung auswählen, Informationen aktualisieren klicken und falls ein Update verfügbar ist, wird der Update-Button grün (zum Update bereit). ",-1),s("p",null," Bei openWB-Systemen mit integriertem Display muss nach Zurücksetzen auf Werkseinstellungen oder nach Ausführen eines Updates das Display wieder eingeschaltet werden. ",-1),s("p",null,' Ein Klick auf "Änderungen" zeigt die Modifikationen. Ein Klick auf "Update" startet die Aktualisierung, welche auch einen automatischen Reboot initiiert (bitte ca. 5 Minuten warten). Danach muss der Assistent neu gestartet werden. ',-1)])),content:o(()=>[S(r,{"install-assistant-active":!0,onSendCommand:e[0]||(e[0]=n=>t.$emit("sendCommand",n)),onSave:e[1]||(e[1]=n=>t.$emit("save")),onReset:e[2]||(e[2]=n=>t.$emit("reset")),onDefaults:e[3]||(e[3]=n=>t.$emit("defaults"))})]),_:1},8,["onNextPage","onPreviousPage","onEndAssistant"])}const z=p(c,[["render",A],["__file","/opt/openWB-dev/openwb-ui-settings/src/components/install_assistant/InstallAssistantStep2.vue"]]);export{z as default};