(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-fdc971aa"],{4562:function(e,t,n){},5891:function(e,t,n){},"5b15":function(e,t,n){},"5fee":function(e,t,n){},6217:function(e,t,n){},"898d":function(e,t,n){"use strict";n.r(t);var l=n("8bbf");function a(e,t,n,a,o,i){var c=Object(l["resolveComponent"])("demo1"),u=Object(l["resolveComponent"])("demo-wrapper"),s=Object(l["resolveComponent"])("demo2"),r=Object(l["resolveComponent"])("demo3"),d=Object(l["resolveComponent"])("demo4");return Object(l["openBlock"])(),Object(l["createBlock"])("div",null,[Object(l["createVNode"])(u,{title:"基本"},{default:Object(l["withCtx"])((function(){return[Object(l["createVNode"])(c)]})),_:1}),Object(l["createVNode"])(u,{title:"单级菜单"},{default:Object(l["withCtx"])((function(){return[Object(l["createVNode"])(s)]})),_:1}),Object(l["createVNode"])(u,{title:"菜单多选"},{default:Object(l["withCtx"])((function(){return[Object(l["createVNode"])(r)]})),_:1}),Object(l["createVNode"])(u,{title:"单级菜单多选"},{default:Object(l["withCtx"])((function(){return[Object(l["createVNode"])(d)]})),_:1})])}var o=n("ba9a"),i=(n("5891"),[{value:"1",label:"Food",children:[{label:"All Foods",value:"1",disabled:!1},{label:"Chinese Food",value:"2"},{label:"Hot Pot",value:"3"},{label:"Buffet",value:"4"},{label:"Fast Food",value:"5"},{label:"Snack",value:"6"},{label:"Bread",value:"7"},{label:"Fruit",value:"8"},{label:"Noodle",value:"9"},{label:"Leisure Food",value:"10"}]},{value:"2",label:"Supermarket",children:[{label:"All Supermarkets",value:"1"},{label:"Supermarket",value:"2",disabled:!0},{label:"C-Store",value:"3"},{label:"Personal Care",value:"4"}]},{value:"3",label:"Extra",isLeaf:!0,children:[{label:"you can not see",value:"1"}]}]),c=Object(l["defineComponent"])({name:"MenuExample",props:{},setup:function(e,t){t.emit,t.slots;var n=Object(l["reactive"])({initData:[],show:!1}),a=function(e){var t="";i.forEach((function(n){n.value===e[0]&&(t=n.label,n.children&&e[1]&&n.children.forEach((function(n){n.value===e[1]&&(t+=" ".concat(n.label))})))})),console.log(t)},o=function(e){e.preventDefault(),n.show=!n.show,n.initData.length||setTimeout((function(){n.initData=i}),500)},c=function(){n.show=!1};return{onChange:a,state:n,handleClick:o,onMaskClick:c}},render:function(){var e=this.state,t=e.initData,n=e.show,a=Object(l["createVNode"])(Object(l["resolveComponent"])("m-menu"),{class:"foo-menu",data:t,value:["1","3"],onChange:this.onChange,height:.6*document.documentElement.clientHeight},null),o=Object(l["createVNode"])("div",{style:{width:"100%",height:.6*document.documentElement.clientHeight,display:"flex",justifyContent:"center"}},[Object(l["createVNode"])(Object(l["resolveComponent"])("m-activity-indicator"),{size:"large"},null)]);return Object(l["createVNode"])("div",{class:n?"menu-active demo":"demo"},[Object(l["createVNode"])(Object(l["resolveComponent"])("m-nav-bar"),{leftContent:"Menu",mode:"light",icon:Object(l["createVNode"])("img",{src:"https://gw.alipayobjects.com/zos/rmsportal/iXVHARNNlmdCGnwWxQPH.svg",class:"am-icon am-icon-md",alt:""},null),onLeftClick:this.handleClick,class:"top-nav-bar"},{default:function(){return[Object(l["createTextVNode"])("Here is title")]}}),n?t.length?a:o:null,n?Object(l["createVNode"])("div",{class:"menu-mask",onClick:this.onMaskClick.bind(this)},null):null])}}),u=(n("4562"),[{value:"1",label:"Food",children:null},{value:"2",label:"Supermarket"},{value:"3",label:"Extra",isLeaf:!0}]),s=Object(l["defineComponent"])({name:"MenuExample",props:{},setup:function(e,t){t.emit,t.slots;var n=Object(l["reactive"])({initData:[],show:!1}),a=function(e){var t="";u.forEach((function(n){n.value===e[0]&&(t=n.label,n.children&&e[1]&&n.children.forEach((function(n){n.value===e[1]&&(t+=" ".concat(n.label))})))})),console.log(t)},o=function(e){e.preventDefault(),n.show=!n.show,n.initData.length||setTimeout((function(){n.initData=u}),500)},i=function(){n.show=!1};return{state:n,onChange:a,handleClick:o,onMaskClick:i}},render:function(){var e=this.state,t=e.initData,n=e.show,a=Object(l["createVNode"])(Object(l["resolveComponent"])("m-menu"),{class:"single-foo-menu",data:t,value:["1"],level:1,onChange:this.onChange,height:.6*document.documentElement.clientHeight},null),o=Object(l["createVNode"])("div",{style:{position:"absolute",width:"100%",height:.6*document.documentElement.clientHeight,display:"flex",justifyContent:"center"}},[Object(l["createVNode"])(Object(l["resolveComponent"])("m-activity-indicator"),{size:"large"},null)]);return Object(l["createVNode"])("div",{class:n?"single-menu-active demo":"demo"},[Object(l["createVNode"])(Object(l["resolveComponent"])("m-nav-bar"),{leftContent:"Menu",mode:"light",onLeftClick:this.handleClick.bind(this),class:"single-top-nav-bar"},{default:function(){return[Object(l["createTextVNode"])("OneLevel menu")]}}),n?t.length?a:o:null,n?Object(l["createVNode"])("div",{class:"menu-mask",onClick:this.onMaskClick},null):null])}}),r=(n("5fee"),[{value:"1",label:"Food",children:[{label:"American Foods",value:"1",disabled:!1},{label:"Chinese Food",value:"2"},{label:"Hot Pot",value:"3"},{label:"Buffet",value:"4"},{label:"Fast Food",value:"5"},{label:"Snack",value:"6"},{label:"Bread",value:"7"},{label:"Fruit",value:"8"},{label:"Noodle",value:"9"},{label:"Leisure Food",value:"10"}]},{value:"2",label:"Supermarket",children:[{label:"All Supermarkets",value:"1"},{label:"Supermarket",value:"2",disabled:!0},{label:"C-Store",value:"3"},{label:"Personal Care",value:"4"}]},{value:"3",label:"Extra",isLeaf:!0,children:[{label:"you can not see",value:"1"}]}]),d=Object(l["defineComponent"])({name:"MenuExample",props:{},setup:function(e,t){t.emit,t.slots;var n=Object(l["reactive"])({initData:null,show:!1}),a=function(e){console.log(e)},o=function(e){console.log(e),i()},i=function(){n.show=!1},c=function(e){e.preventDefault(),n.show=!n.show,n.initData||setTimeout((function(){n.initData=r}),500)},u=function(){n.show=!1},s=Object(l["ref"])(["1",["3","4"]]);return{state:n,onChange:a,onCancel:i,onOk:o,handleClick:c,onMaskClick:u,value:s}},render:function(){var e=this,t=this.state,n=t.initData,a=t.show,o=Object(l["createVNode"])(Object(l["resolveComponent"])("m-menu"),{class:"multi-foo-menu",data:n,value:e.value,"onUpdate:value":function(t){return e.value=t},onChange:this.onChange,onOk:this.onOk,onCancel:this.onCancel,height:.6*document.documentElement.clientHeight,multiSelect:!0},null),i=Object(l["createVNode"])("div",{style:{position:"absolute",width:"100%",height:.6*document.documentElement.clientHeight,display:"flex",justifyContent:"center"}},[Object(l["createVNode"])(Object(l["resolveComponent"])("m-activity-indicator"),{size:"large"},null)]);return Object(l["createVNode"])("div",{class:a?"multi-menu-active demo":"demo"},[Object(l["createVNode"])(Object(l["resolveComponent"])("m-nav-bar"),{leftContent:"Menu",mode:"light",onLeftClick:this.handleClick.bind(this),class:"multi-top-nav-bar"},{default:function(){return[Object(l["createTextVNode"])("Multi select menu")]}}),a?n?o:i:null,a?Object(l["createVNode"])("div",{class:"menu-mask",onClick:this.onMaskClick},null):null])}}),b=(n("5b15"),[{value:"1",label:"Food"},{value:"2",label:"Supermarket"},{value:"3",label:"Extra",isLeaf:!0}]),m=Object(l["defineComponent"])({name:"MenuExample",props:{},setup:function(e,t){t.emit,t.slots;var n=Object(l["reactive"])({initData:null,show:!1}),a=function(e){console.log(e)},o=function(e){console.log(e),i()},i=function(){n.show=!1},c=function(e){e.preventDefault(),n.show=!n.show,n.initData||setTimeout((function(){n.initData=b}),500)},u=function(){n.show=!1},s=Object(l["ref"])(["1"]);return{state:n,onChange:a,onOk:o,onCancel:i,handleClick:c,onMaskClick:u,value:s}},render:function(){var e=this,t=this.state,n=t.initData,a=t.show,o=Object(l["createVNode"])(Object(l["resolveComponent"])("m-menu"),{class:"single-multi-foo-menu",data:n,value:e.value,"onUpdate:value":function(t){return e.value=t},level:1,onChange:this.onChange,onOk:this.onOk.bind(this),onCancel:this.onCancel,height:.6*document.documentElement.clientHeight,multiSelect:!0},null),i=Object(l["createVNode"])("div",{style:{position:"absolute",width:"100%",height:.6*document.documentElement.clientHeight,display:"flex",justifyContent:"center"}},[Object(l["createVNode"])(Object(l["resolveComponent"])("m-activity-indicator"),{size:"large"},null)]);return Object(l["createVNode"])("div",{class:a?"single-multi-menu-active":""},[Object(l["createVNode"])(Object(l["resolveComponent"])("m-nav-bar"),{leftContent:"Menu",mode:"light",onLeftClick:this.handleClick.bind(this),class:"single-multi-top-nav-bar"},{default:function(){return[Object(l["createTextVNode"])("Single Multi menu")]}}),a?n?o:i:null,a?Object(l["createVNode"])("div",{class:"menu-mask",onClick:this.onMaskClick.bind(this)},null):null])}}),v=Object(l["defineComponent"])({components:{demo1:c,demo2:s,demo3:d,demo4:m,DemoWrapper:o["a"]},setup:function(){return{}}});v.render=a;t["default"]=v},ba9a:function(e,t,n){"use strict";var l=n("8bbf");n("6217");t["a"]=Object(l["defineComponent"])({props:{title:{}},render:function(){var e,t;return Object(l["createVNode"])("div",{class:"demo-preview-item"},[Object(l["createVNode"])("div",{class:"demo-title"},[this.title]),Object(l["createVNode"])("div",{class:"demo-container"},[null===(t=(e=this.$slots).default)||void 0===t?void 0:t.call(e)])])}})}}]);
//# sourceMappingURL=chunk-fdc971aa.ff7e8e03.js.map