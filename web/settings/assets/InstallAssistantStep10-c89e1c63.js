import{C as i}from"./index-d084f6bd.js";import a from"./InstallAssistantStepTemplate-61e7a445.js";import{_ as o,q as r,k as l,z as d,M as m,u as s}from"./vendor-b3afda6d.js";import"./vendor-fortawesome-b013cb5c.js";import"./vendor-bootstrap-37731caa.js";import"./vendor-jquery-2371184a.js";import"./vendor-axios-dc7988e3.js";import"./vendor-sortablejs-806a0b5c.js";const p={name:"InstallAssistantStep10",mixins:[i],emits:["switchPage","endAssistant"],components:{InstallAssistantStepTemplate:a},data:()=>({mqttTopicsToSubscribe:[]}),methods:{nextPage(){},previousPage(){this.$emit("switchPage",9)},sendCommand(t){this.$emit("sendCommand",t)},endAssistant(){this.$emit("endAssistant")}}},c=s("h2",null,"Die Grundkonfiguration ist abgeschlossen.",-1),g=s("p",null," Die grundlegende Konfiguration der openWB ist abgeschlossen. Du wirst mit Beendigung dieses Assistenten auf die Statusseite weitergeleitet. Bitte überprüfe die dargestellten Informationen und passe bei Unstimmigkeiten die Einstellungen an. Weitere Einstellungen sind für den Betrieb der openWB als secondary nicht notwendig. Detaillierte Einstellungsmöglichkeiten befinden sich in den jeweiligen Konfigurationsseiten. ",-1);function u(t,_,h,f,A,e){const n=r("InstallAssistantStepTemplate");return l(),d(n,{title:"Abgeschlossen",onNextPage:e.nextPage,onPreviousPage:e.previousPage,onEndAssistant:e.endAssistant,hideNext:!0},{content:m(()=>[c,g]),_:1},8,["onNextPage","onPreviousPage","onEndAssistant"])}const k=o(p,[["render",u],["__file","/opt/openWB-dev/openwb-ui-settings/src/components/install_assistant/InstallAssistantStep10.vue"]]);export{k as default};
