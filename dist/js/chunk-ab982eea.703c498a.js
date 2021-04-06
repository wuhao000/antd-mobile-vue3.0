(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ab982eea"],{"18fd":function(t,n){t.exports="<table>\n<thead>\n<tr>\n<th>属性</th>\n<th>说明</th>\n<th>类型</th>\n<th>默认值</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>activateText</td>\n<td></td>\n<td>string</td>\n<td></td>\n</tr>\n<tr>\n<td>damping</td>\n<td></td>\n<td>number</td>\n<td>80</td>\n</tr>\n<tr>\n<td>deactivateText</td>\n<td></td>\n<td>string</td>\n<td></td>\n</tr>\n<tr>\n<td>direction</td>\n<td></td>\n<td>&#39;down&#39; | &#39;up&#39;</td>\n<td>DOWN</td>\n</tr>\n<tr>\n<td>distanceToRefresh</td>\n<td></td>\n<td>number</td>\n<td>35</td>\n</tr>\n<tr>\n<td>finishText</td>\n<td></td>\n<td>string</td>\n<td></td>\n</tr>\n<tr>\n<td>getScrollContainer</td>\n<td></td>\n<td>() =&gt; any</td>\n<td></td>\n</tr>\n<tr>\n<td>indicatorHeight</td>\n<td></td>\n<td>number</td>\n<td>40</td>\n</tr>\n<tr>\n<td>onRefresh</td>\n<td></td>\n<td>() =&gt; void</td>\n<td></td>\n</tr>\n<tr>\n<td>prefixCls</td>\n<td></td>\n<td>string</td>\n<td></td>\n</tr>\n<tr>\n<td>refreshing</td>\n<td></td>\n<td>boolean</td>\n<td></td>\n</tr>\n<tr>\n<td>value</td>\n<td></td>\n<td>boolean</td>\n<td></td>\n</tr>\n</tbody></table>\n"},8273:function(t,n){t.exports='<h1 id="下拉刷新--m-pull-refresh">下拉刷新  m-pull-refresh</h1>\n'},"85ba":function(t,n,e){"use strict";e.r(n);var d=e("8bbf"),r=Object(d["withScopeId"])("data-v-5cd1a8a5");Object(d["pushScopeId"])("data-v-5cd1a8a5");var o={id:"basic"},a=Object(d["createVNode"])("div",{class:"markdown-body m-b",id:"demo"},[Object(d["createVNode"])("span"),Object(d["createVNode"])("h2",null,"示例代码")],-1),i=Object(d["createVNode"])("div",{class:"markdown-body",id:"props"},[Object(d["createVNode"])("span"),Object(d["createVNode"])("h2",null,"属性说明")],-1);Object(d["popScopeId"])();var c=r((function(t,n,e,r,c,s){var l=Object(d["resolveComponent"])("title-doc"),u=Object(d["resolveComponent"])("demo1"),h=Object(d["resolveComponent"])("props-doc");return Object(d["openBlock"])(),Object(d["createBlock"])("div",null,[Object(d["createVNode"])("div",o,[Object(d["createVNode"])(l)]),a,Object(d["createVNode"])(u,{id:"demo1"}),i,Object(d["createVNode"])(h)])})),s={class:"demo"};function l(t,n,e,r,o,a){var i=Object(d["resolveComponent"])("code-box");return Object(d["openBlock"])(),Object(d["createBlock"])("div",s,[Object(d["createVNode"])(i,{code:t.code,markdown:t.md},null,8,["code","markdown"])])}var u="import { defineComponent, onMounted, reactive, ref } from 'vue';\nimport { PullRefresh, Button } from '../../index';\n\nfunction genData(dataArr = []) {\n  const len = dataArr.length;\n  for (let i = 0; i < 20; i++) {\n    dataArr.push(i + len);\n  }\n  return dataArr.reverse();\n}\n\nexport default defineComponent({\n  setup() {\n    const state = reactive({\n      refreshing: false,\n      down: true,\n      height: document.documentElement.clientHeight,\n      data: []\n    });\n    const ptrRef = ref(null);\n    onMounted(() => {\n      const hei = state.height - ptrRef.value.$el.offsetTop;\n      setTimeout(() => {\n        state.height = hei\n        state.data = genData(state.data);\n      }, 0);\n    });\n    return {\n      state, ptrRef\n    };\n  },\n  render() {\n    return (<div>\n      <Button\n          style={{ marginBottom: '15px' }}\n          onClick={() => {\n            this.state.down = !this.state.down;\n          }}\n      >\n        direction: {this.state.down ? 'down' : 'up'}\n      </Button>\n      <PullRefresh\n          damping={60}\n          ref={el => this.ptrRef = el}\n          style={{\n            height: this.state.height,\n            overflow: 'auto'\n          }}\n          indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}\n          direction={this.state.down ? 'down' : 'up'}\n          value={this.state.refreshing}\n          onRefresh={() => {\n            this.state.refreshing = true;\n            setTimeout(() => {\n              this.state.data = genData(this.state.data);\n              this.state.refreshing = false;\n            }, 1000);\n          }}\n      >\n        {this.state.data.map(i => (\n            <div key={i} style={{ textAlign: 'center', padding: '20px' }}>\n              {this.state.down ? 'pull down' : 'pull up'} {i}\n            </div>\n        ))}\n      </PullRefresh>\n    </div>);\n  }\n});\n",h=e("b738"),p=e.n(h),f=e("4f8a"),b=Object(d["defineComponent"])({components:{CodeBox:f["a"]},setup:function(){return{code:u,md:p.a}}});b.render=l;var m=b,v=e("ace3"),g=e("8273"),O=e.n(g),j=e("18fd"),w=e.n(j),x=Object(d["defineComponent"])({components:{TitleDoc:O.a,PropsDoc:w.a,MPullRefresh:v["a"],demo1:m},setup:function(){return{}}});e("d8aa");x.render=c,x.__scopeId="data-v-5cd1a8a5";n["default"]=x},b738:function(t,n){t.exports="<p>基本用法</p>\n"},d8aa:function(t,n,e){"use strict";e("fdb2")},fdb2:function(t,n,e){}}]);
//# sourceMappingURL=chunk-ab982eea.703c498a.js.map