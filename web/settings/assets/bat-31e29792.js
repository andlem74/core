import{_ as c,u as n,k as p,l as d,D as o,N as a,y as s,x as u,z as l}from"./vendor-f2b8aa6f.js";import"./vendor-sortablejs-2f1828d0.js";const _={name:"DeviceBatterXBat",emits:["update:configuration"],props:{configuration:{type:Object,required:!0},deviceId:{default:void 0},componentId:{required:!0}},methods:{updateConfiguration(e,t=void 0){this.$emit("update:configuration",{value:e,object:t})}}},b={class:"device-batterx-bat"},f={class:"small"};function m(e,t,g,h,v,B){const i=n("openwb-base-heading"),r=n("openwb-base-alert");return p(),d("div",b,[o(i,null,{default:a(()=>[s(" Einstellungen für BatterX Batteriespeicher "),u("span",f,"(Modul: "+l(e.$options.name)+")",1)]),_:1}),o(r,{subtype:"info"},{default:a(()=>[s(" Diese Komponente benötigt keine Einstellungen. ")]),_:1})])}const $=c(_,[["render",m],["__file","/opt/openWB-dev/openwb-ui-settings/src/components/devices/batterx/bat.vue"]]);export{$ as default};
