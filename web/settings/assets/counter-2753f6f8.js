import{_ as c,q as n,k as l,l as u,B as o,M as s,x as a,u as d,y as p}from"./vendor-b3afda6d.js";import"./vendor-sortablejs-806a0b5c.js";const _={name:"DeviceShellyCounter",emits:["update:configuration"],props:{configuration:{type:Object,required:!0},deviceId:{default:void 0},componentId:{required:!0}},methods:{updateConfiguration(e,t=void 0){this.$emit("update:configuration",{value:e,object:t})}}},f={class:"device-shelly-counter"},m={class:"small"};function b(e,t,h,g,v,y){const i=n("openwb-base-heading"),r=n("openwb-base-alert");return l(),u("div",f,[o(i,null,{default:s(()=>[a(" Einstellungen für Shelly Zähler "),d("span",m,"(Modul: "+p(e.$options.name)+")",1)]),_:1}),o(r,{subtype:"info"},{default:s(()=>[a(" Diese Komponente benötigt keine Einstellungen. ")]),_:1})])}const x=c(_,[["render",b],["__file","/opt/openWB-dev/openwb-ui-settings/src/components/devices/shelly/counter.vue"]]);export{x as default};
