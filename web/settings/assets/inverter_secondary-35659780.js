import{_ as u,q as o,k as c,l as p,B as t,M as l,x as _,u as m,y as f}from"./vendor-c6bc340e.js";import"./vendor-sortablejs-02fb77a0.js";const v={name:"DeviceFroniusSecondaryInverter",emits:["update:configuration"],props:{configuration:{type:Object,required:!0},deviceId:{default:void 0},componentId:{required:!0}},methods:{updateConfiguration(n,e=void 0){this.$emit("update:configuration",{value:n,object:e})}}},b={class:"device-fronius-inverter-secondary"},g={class:"small"};function h(n,e,i,y,w,s){const a=o("openwb-base-heading"),r=o("openwb-base-number-input");return c(),p("div",b,[t(a,null,{default:l(()=>[_(" Einstellungen für einen sekundären Wechselrichter "),m("span",g,"(Modul: "+f(n.$options.name)+")",1)]),_:1}),t(r,{title:"ID","model-value":i.configuration.id,min:"0","onUpdate:modelValue":e[0]||(e[0]=d=>s.updateConfiguration(d,"configuration.id"))},null,8,["model-value"])])}const k=u(v,[["render",h],["__file","/opt/openWB-dev/openwb-ui-settings/src/components/devices/fronius/inverter_secondary.vue"]]);export{k as default};