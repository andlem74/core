import{C as l}from"./HardwareInstallation-a0083e3a.js";import{_ as r,u as t,k as u,l as m,D as i,N as d,y as c}from"./vendor-f2b8aa6f.js";import"./vendor-fortawesome-71546160.js";import"./index-b0e5e618.js";import"./vendor-bootstrap-4ad604fa.js";import"./vendor-jquery-d3cb8fad.js";import"./vendor-axios-65ecee4b.js";import"./vendor-sortablejs-2f1828d0.js";import"./dynamic-import-helper-be004503.js";const b={name:"DeviceOpenwbFlexBat",mixins:[l]},_={class:"device-openwb-flex-bat"};function f(e,o,v,w,g,x){const a=t("openwb-base-heading"),p=t("openwb-base-select-input"),s=t("openwb-base-number-input");return u(),m("div",_,[i(a,null,{default:d(()=>[c(" Einstellungen für openWB-Flex Batteriespeicher ")]),_:1}),i(p,{title:"Zählermodell",notSelected:"Bitte auswählen",options:[{value:0,text:"MPM3PM"},{value:1,text:"SDM120"},{value:2,text:"SDM630/SDM72D-M"}],"model-value":e.component.configuration.version,required:"","onUpdate:modelValue":o[0]||(o[0]=n=>e.updateConfiguration(n,"configuration.version"))},null,8,["model-value"]),i(s,{title:"Modbus-ID",required:"",min:1,max:255,"model-value":e.component.configuration.id,"onUpdate:modelValue":o[1]||(o[1]=n=>e.updateConfiguration(n,"configuration.id"))},null,8,["model-value"])])}const N=r(b,[["render",f],["__file","/opt/openWB-dev/openwb-ui-settings/src/components/devices/openwb/openwb_flex/bat.vue"]]);export{N as default};