import{C as a}from"./HardwareInstallation-def527d3.js";import{_ as m,u as o,k as p,l as u,G as t,E as d,y as _}from"./vendor-06e11d0e.js";import"./vendor-fortawesome-05d7e447.js";import"./index-28dff6dc.js";import"./vendor-bootstrap-4263d7eb.js";import"./vendor-jquery-9fc083b4.js";import"./vendor-axios-22b906fb.js";import"./vendor-sortablejs-0bb60e5b.js";import"./dynamic-import-helper-be004503.js";const l={name:"DeviceSunnyBoyBatSmartEnergy",mixins:[a]},b={class:"device-sunnyboy-bat-smart-energy"};function c(n,e,f,y,g,v){const s=o("openwb-base-heading"),r=o("openwb-base-number-input");return p(),u("div",b,[t(s,null,{default:d(()=>e[1]||(e[1]=[_(" Einstellungen für SMA Sunny Boy Smart Energy Batteriespeicher ")])),_:1}),t(r,{title:"Modbus ID",required:"","model-value":n.component.configuration.modbus_id,min:"1",max:"255","onUpdate:modelValue":e[0]||(e[0]=i=>n.updateConfiguration(i,"configuration.modbus_id"))},null,8,["model-value"])])}const V=m(l,[["render",c],["__file","/opt/openWB-dev/openwb-ui-settings/src/components/devices/sma/sma_sunny_boy/bat_smart_energy.vue"]]);export{V as default};