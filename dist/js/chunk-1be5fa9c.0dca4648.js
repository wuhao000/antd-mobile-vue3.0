(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1be5fa9c"],{6217:function(e,t,n){},"854d":function(e,t,n){},ba9a:function(e,t,n){"use strict";var o=n("8bbf");n("6217");t["a"]=Object(o["defineComponent"])({props:{title:{}},render:function(){var e,t;return Object(o["createVNode"])("div",{class:"demo-preview-item"},[Object(o["createVNode"])("div",{class:"demo-title"},[this.title]),Object(o["createVNode"])("div",{class:"demo-container"},[null===(t=(e=this.$slots).default)||void 0===t?void 0:t.call(e)])])}})},c37f:function(e,t,n){"use strict";n.r(t);var o=n("8bbf");function c(e,t,n,c,l,a){var r=Object(o["resolveComponent"])("demo1"),s=Object(o["resolveComponent"])("demo-wrapper");return Object(o["openBlock"])(),Object(o["createBlock"])("div",null,[Object(o["createVNode"])(s,{title:"基本"},{default:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(r)]})),_:1})])}var l=n("ba9a"),a=(n("854d"),Object(o["defineComponent"])({name:"SegmentedControl",props:{},setup:function(){var e=function(e){console.log("selectedIndex:".concat(e.nativeEvent.selectedSegmentIndex))},t=function(e){return console.log(e)};return{onChange:e,onValueChange:t}},render:function(){var e=this;return Object(o["createVNode"])(Object(o["resolveComponent"])("m-wing-blank"),{size:"lg",class:"sc-example"},{default:function(){return[Object(o["createVNode"])("p",{class:"sub-title"},[Object(o["createTextVNode"])("Simplest")]),Object(o["createVNode"])(Object(o["resolveComponent"])("m-segmented-control"),{values:["Segment1","Segment2"]},null),Object(o["createVNode"])("p",{class:"sub-title"},[Object(o["createTextVNode"])("Disabled")]),Object(o["createVNode"])(Object(o["resolveComponent"])("m-segmented-control"),{values:["Segment1","Segment2"],disabled:!0},null),Object(o["createVNode"])("p",{class:"sub-title"},[Object(o["createTextVNode"])("SelectedIndex")]),Object(o["createVNode"])(Object(o["resolveComponent"])("m-segmented-control"),{selectedIndex:1,values:["Segment1","Segment2","Segment3"]},null),Object(o["createVNode"])("p",{class:"sub-title"},[Object(o["createTextVNode"])("TintColor")]),Object(o["createVNode"])(Object(o["resolveComponent"])("m-segmented-control"),{values:["Segment1","Segment2","Segment3"],tintColor:"#ff0000",style:{height:"40px",width:"250px"}},null),Object(o["createVNode"])("p",{class:"sub-title"},[Object(o["createTextVNode"])("onChange/onValueChange")]),Object(o["createVNode"])(Object(o["resolveComponent"])("m-segmented-control"),{values:["Segment1","Segment2","Segment3"],onChange:e.onChange,onValueChange:e.onValueChange},null)]}})}})),r=Object(o["defineComponent"])({components:{demo1:a,DemoWrapper:l["a"]},setup:function(){return{}}});r.render=c;t["default"]=r}}]);
//# sourceMappingURL=chunk-1be5fa9c.0dca4648.js.map