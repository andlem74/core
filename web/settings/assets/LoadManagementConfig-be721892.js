import{l as y,V as C,U as L,F as x}from"./vendor-fortawesome-e760f6db.js";import{C as V}from"./index-f9dddb60.js";import{S as $}from"./OpenwbSortableList-74181be5.js";import{_ as q,u as l,k as u,l as m,x as d,G as s,E as o,y as i,N as w,M as v,z as W,F as _}from"./vendor-809787c9.js";import"./vendor-bootstrap-5ce91dd7.js";import"./vendor-jquery-49acc558.js";import"./vendor-axios-57a82265.js";import"./vendor-sortablejs-d99a4022.js";y.add(C,L);const Z={name:"OpenwbLoadManagementConfigView",components:{SortableList:$,FontAwesomeIcon:x},mixins:[V],props:{installAssistantActive:{type:Boolean,required:!1,default:!1}},emits:["sendCommand","save","reset","defaults"],data(){return{mqttTopicsToSubscribe:["openWB/general/extern","openWB/counter/config/home_consumption_source_id","openWB/counter/config/consider_less_charging","openWB/counter/get/hierarchy","openWB/system/device/+/component/+/config","openWB/counter/+/config/max_power_errorcase","openWB/counter/+/config/max_currents","openWB/counter/+/config/max_total_power","openWB/pv/+/config/max_ac_out","openWB/chargepoint/+/config"]}},computed:{componentConfigurations(){return this.getWildcardTopics("openWB/system/device/+/component/+/config")},counterConfigs:{get(){let t=this.getWildcardTopics("openWB/system/device/+/component/+/config");return Object.keys(t).filter(e=>{var n;return(n=t[e])==null?void 0:n.type.includes("counter")}).reduce((e,n)=>({...e,[n]:t[n]}),{})}},counterOptions(){var t=[];for(const e of Object.values(this.componentConfigurations))this.isComponentType(e==null?void 0:e.type,"counter")&&t.push({value:e.id,text:e.name});return t.sort((e,n)=>e.text==n.text?0:e.text>n.text?1:-1)},inverterConfigs:{get(){let t=this.getWildcardTopics("openWB/system/device/+/component/+/config");return Object.keys(t).filter(e=>{var n;return(n=t[e])==null?void 0:n.type.includes("inverter")}).reduce((e,n)=>({...e,[n]:t[n]}),{})}},hierarchyLabels:{get(){let t={};for(const e of Object.values(this.$store.state.mqtt["openWB/counter/get/hierarchy"]))t={...t,...this.getElementTreeNames(e)};return t}},getHcSourceIdOptions(){let t=[{value:null,text:"von openWB berechnen (in 99% der Fälle die richtige Einstellung)"}],e=[{label:"Eingerichtete Zähler-Komponenten",options:[...this.counterOptions]}];return{options:t,groups:e}}},methods:{getElementTreeNames(t){let e={};if(t.type=="cp"){let n=this.getChargePoint(t.id);n&&(e[t.id]=n.name)}else{let n=this.getComponent(t.id);n&&(e[t.id]=n.name)}return t.children.forEach(n=>{e={...e,...this.getElementTreeNames(n)}}),e},getComponent(t){let e;return Object.keys(this.$store.state.mqtt).forEach(n=>{n.match("^openWB/system/device/[0-9]+/component/"+t+"/config$")&&(e=this.$store.state.mqtt[n])}),e},getChargePoint(t){let e;return Object.keys(this.$store.state.mqtt).forEach(n=>{n.match("^openWB/chargepoint/"+t+"/config$")&&(e=this.$store.state.mqtt[n])}),e},isComponentType(t,e){return t==null?void 0:t.split("_").includes(e)}}},M={class:"loadManagementConfig"},U={name:"loadManagementConfigForm"},A={key:0},E={key:1},F={key:0},D={key:1};function O(t,e,n,P,H,g){const h=l("openwb-base-alert"),k=l("openwb-base-button-group-input"),B=l("openwb-base-select-input"),f=l("openwb-base-heading"),b=l("font-awesome-icon"),p=l("openwb-base-number-input"),c=l("openwb-base-card"),S=l("sortable-list"),z=l("openwb-base-submit-buttons");return u(),m("div",M,[d("form",U,[s(c,{title:"Einstellungen",collapsible:!0,collapsed:!1},{default:o(()=>[t.$store.state.mqtt["openWB/general/extern"]===!0?(u(),m("div",A,[s(h,{subtype:"info"},{default:o(()=>e[6]||(e[6]=[i(' Diese Einstellungen sind nicht verfügbar, solange sich diese openWB im Steuerungsmodus "secondary" befindet. ')])),_:1})])):(u(),m("div",E,[s(k,{title:"Fahrzeuge, die nicht mit Sollstrom laden",buttons:[{buttonValue:!1,text:"nicht berücksichtigen",class:"btn-outline-danger"},{buttonValue:!0,text:"berücksichtigen",class:"btn-outline-success"}],"model-value":t.$store.state.mqtt["openWB/counter/config/consider_less_charging"],"onUpdate:modelValue":e[0]||(e[0]=r=>t.updateState("openWB/counter/config/consider_less_charging",r))},{help:o(()=>e[7]||(e[7]=[d("p",null," Wenn angesteckte Fahrzeuge, die nicht oder nicht mit der Sollstromstärke laden, im Lastmanagement berücksichtigt werden, wird für diese der Sollstrom reserviert. Dadurch können bei Eingreifen des Lastmanagements andere Fahrzeuge möglicherweise nur mit reduzierter Stromstärke laden und der reservierte Strom wird nicht genutzt. Wenn die Fahrzeuge wieder Leistung beziehen, z.B. um vorzuklimatisieren, nutzen sie den für sie reservierten Strom. ",-1),d("p",null," Wenn angesteckte Fahrzeuge, die nicht oder nicht mit der Sollstromstärke laden, nicht im Lastmanagement berücksichtigt werden, wird für diese auch kein Strom bei vorliegender Ladefreigabe reserviert bzw. es wird nur der tatsächlich genutzte Strom im Lastmanagement berücksichtigt. Andere Fahrzeuge können dadurch mit höherer Stromstärke laden. Wenn die maximalen Lastmanagement-Grenzen fast erreicht sind und die Fahrzeuge wieder Leistung beziehen, z.B. um vorzuklimatisieren, kann es zu einer kurzzeitigen Überschreitung der Lastmanagement-Grenzen kommen, bis im nächsten Zyklus die Stromstärken aller Ladepunkte an die neue Situation angepasst wurden. Das kurzzeitige Überschreiten der Maximal-Werte stellt für die Sicherungen in der Regel kein Problem dar. ",-1)])),_:1},8,["model-value"]),s(B,{title:"Hausverbrauch",options:g.getHcSourceIdOptions.options,groups:g.getHcSourceIdOptions.groups,"model-value":t.$store.state.mqtt["openWB/counter/config/home_consumption_source_id"],"onUpdate:modelValue":e[1]||(e[1]=r=>t.updateState("openWB/counter/config/home_consumption_source_id",r))},{help:o(()=>e[8]||(e[8]=[i(" Meist ist der Zähler am EVU-Punkt installiert, dann muss hier 'von openWB berechnen' ausgewählt werden. Wenn der Zähler im Hausverbrauchszweig installiert ist, die Struktur wie im "),d("a",{href:"https://github.com/openWB/core/wiki/Hausverbrauchs-Zähler",target:"_blank",rel:"noopener noreferrer"}," Wiki ",-1),i(" beschrieben anordnen und hier den Hausverbrauchszähler auswählen. Dann wird dieser Wert abzüglich der Ladeleistung als Hausverbrauch erfasst. ")])),_:1},8,["options","groups","model-value"]),s(f,null,{default:o(()=>e[9]||(e[9]=[i(" Vorhandene Zählermodule ")])),_:1}),s(h,{subtype:"info"},{default:o(()=>e[10]||(e[10]=[i(" Die maximale Leistung wird nur für den EVU-Zähler berücksichtigt. Bei Zwischenzählern begrenzt das Lastmanagement rein anhand der maximalen Phasenströme."),d("br",null,null,-1),i(" Wenn ein Zähler nicht auslesbar ist, wird weiterhin versucht, diesen auszulesen und nach 60s die angenommene Leistung im Fehlerfall verwendet, die unten für jeden Zähler eingestellt wird, um eine Überlast zu vermeiden. Die angenommene Leistung wird gleichmäßig auf die Phasen verteilt."),d("br",null,null,-1),i(" Überlicherweise sind Hausanschlüsse mit 24kW und 3*35A bzw. 43kW und 3*63A abgesichert. ")])),_:1}),(u(!0),m(w,null,v(g.counterConfigs,r=>(u(),W(c,{key:r.id,collapsible:!0,collapsed:!0,subtype:"danger"},{header:o(()=>[s(b,{"fixed-width":"",icon:["fas","gauge-high"]}),i(" "+_(r.name),1)]),default:o(()=>[s(p,{title:"Maximale Leistung",min:1,step:.1,required:"",unit:"kW","model-value":t.$store.state.mqtt["openWB/counter/"+r.id+"/config/max_total_power"]/1e3,"onUpdate:modelValue":a=>t.updateState("openWB/counter/"+r.id+"/config/max_total_power",a*1e3)},{help:o(()=>[...e[11]||(e[11]=[i(" Maximal zulässige Leistung für diesen (Zwischen-)Zähler. ")])]),_:2},1032,["model-value","onUpdate:modelValue"]),s(p,{title:"Maximaler Strom L1",min:16,step:1,unit:"A",required:"","model-value":t.$store.state.mqtt["openWB/counter/"+r.id+"/config/max_currents"][0],"onUpdate:modelValue":a=>t.updateState("openWB/counter/"+r.id+"/config/max_currents",a,"0")},{help:o(()=>[...e[12]||(e[12]=[i(" Maximal zulässiger Strom für die Phase 1 dieses (Zwischen-)Zählers. ")])]),_:2},1032,["model-value","onUpdate:modelValue"]),s(p,{title:"Maximaler Strom L2",min:16,step:1,unit:"A",required:"","model-value":t.$store.state.mqtt["openWB/counter/"+r.id+"/config/max_currents"][1],"onUpdate:modelValue":a=>t.updateState("openWB/counter/"+r.id+"/config/max_currents",a,"1")},{help:o(()=>[...e[13]||(e[13]=[i(" Maximal zulässiger Strom für die Phase 2 dieses (Zwischen-)Zählers. ")])]),_:2},1032,["model-value","onUpdate:modelValue"]),s(p,{title:"Maximaler Strom L3",min:16,step:1,unit:"A",required:"","model-value":t.$store.state.mqtt["openWB/counter/"+r.id+"/config/max_currents"][2],"onUpdate:modelValue":a=>t.updateState("openWB/counter/"+r.id+"/config/max_currents",a,"2")},{help:o(()=>[...e[14]||(e[14]=[i(" Maximal zulässiger Strom für die Phase 3 dieses (Zwischen-)Zählers. ")])]),_:2},1032,["model-value","onUpdate:modelValue"]),s(p,{title:"Maximale Leistung im Fehlerfall",min:0,step:.1,unit:"kW","model-value":t.$store.state.mqtt["openWB/counter/"+r.id+"/config/max_power_errorcase"]/1e3,"onUpdate:modelValue":a=>t.updateState("openWB/counter/"+r.id+"/config/max_power_errorcase",a*1e3)},{help:o(()=>[...e[15]||(e[15]=[i(" Angenommen Leistung für diesen (Zwischen-)Zähler, falls vom Zähler keine Werte abgefragt werden können. ")])]),_:2},1032,["model-value","onUpdate:modelValue"])]),_:2},1024))),128)),s(f,null,{default:o(()=>e[16]||(e[16]=[i(" Vorhandene Wechselrichtermodule ")])),_:1}),(u(!0),m(w,null,v(g.inverterConfigs,r=>(u(),W(c,{key:r.id,collapsible:!0,collapsed:!0,subtype:"success"},{header:o(()=>[s(b,{"fixed-width":"",icon:["fas","solar-panel"]}),i(" "+_(r.name),1)]),default:o(()=>[s(p,{title:"Maximale Ausgangsleistung des Wechselrichters",min:0,step:.1,unit:"kW",required:"","model-value":t.$store.state.mqtt["openWB/pv/"+r.id+"/config/max_ac_out"]/1e3,"onUpdate:modelValue":a=>t.updateState("openWB/pv/"+r.id+"/config/max_ac_out",a*1e3)},{help:o(()=>[...e[17]||(e[17]=[i(" Relevant bei Hybrid-Systemen mit DC-Speicher. ")])]),_:2},1032,["model-value","onUpdate:modelValue"])]),_:2},1024))),128))]))]),_:1}),s(c,{title:"Struktur",collapsible:!0,collapsed:!0},{default:o(()=>[t.$store.state.mqtt["openWB/general/extern"]===!0?(u(),m("div",F,[s(h,{subtype:"info"},{default:o(()=>e[18]||(e[18]=[i(' Diese Einstellungen sind nicht verfügbar, solange sich diese openWB im Steuerungsmodus "secondary" befindet. ')])),_:1})])):(u(),m("div",D,[s(S,{title:"Anordnung der Komponenten","model-value":t.$store.state.mqtt["openWB/counter/get/hierarchy"],labels:g.hierarchyLabels,"onUpdate:modelValue":e[2]||(e[2]=r=>t.updateState("openWB/counter/get/hierarchy",r))},{help:o(()=>e[19]||(e[19]=[i(" Durch die Anordnung der Komponenten werden Abhängigkeiten abgebildet."),d("br",null,null,-1),i(" An erster Stelle muss eine Zählerkomponente stehen, die den Netzanschlusspunkt erfasst. Dafür kann auch ein virtueller Zähler genutzt werden."),d("br",null,null,-1),i(" Die weiteren Komponenten müssen hierarchisch so angeordnet werden, wie sie auch physisch im Stromnetz angeschlossen werden."),d("br",null,null,-1),i(" Bei DC-gekoppelten Speichern sind diese hinter dem zugehörigen Wechselrichter zu platzieren, damit die Abhängigkeit in der Regelung berücksichtigt werden kann. ")])),_:1},8,["model-value","labels"])]))]),_:1}),s(z,{"form-name":"loadManagementConfigForm",onSave:e[3]||(e[3]=r=>t.$emit("save")),onReset:e[4]||(e[4]=r=>t.$emit("reset")),onDefaults:e[5]||(e[5]=r=>t.$emit("defaults"))})])])}const Q=q(Z,[["render",O],["__file","/opt/openWB-dev/openwb-ui-settings/src/views/LoadManagementConfig.vue"]]);export{Q as default};