(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-414fe994"],{"0c58":function(n,t){n.exports='<h4 id="无动画">无动画</h4>\n'},"0d12":function(n,t){n.exports='<h4 id="垂直样式">垂直样式</h4>\n'},"15bf":function(n,t,e){"use strict";e.r(t);var d=e("8bbf"),o=Object(d["withScopeId"])("data-v-7fdd0bc4");Object(d["pushScopeId"])("data-v-7fdd0bc4");var r={id:"basic"},a=Object(d["createVNode"])("div",{class:"markdown-body m-b",id:"demo"},[Object(d["createVNode"])("span"),Object(d["createVNode"])("h2",null,"示例代码")],-1),i=Object(d["createVNode"])("div",{class:"markdown-body",id:"props"},[Object(d["createVNode"])("span"),Object(d["createVNode"])("h2",null,"属性说明")],-1);Object(d["popScopeId"])();var c=o((function(n,t,e,o,c,s){var b=Object(d["resolveComponent"])("title-doc"),l=Object(d["resolveComponent"])("demo1"),f=Object(d["resolveComponent"])("demo2"),p=Object(d["resolveComponent"])("demo3"),m=Object(d["resolveComponent"])("demo4"),u=Object(d["resolveComponent"])("demo5"),v=Object(d["resolveComponent"])("demo6"),y=Object(d["resolveComponent"])("props-doc");return Object(d["openBlock"])(),Object(d["createBlock"])("div",null,[Object(d["createVNode"])("div",r,[Object(d["createVNode"])(b)]),a,Object(d["createVNode"])(l,{id:"demo1"}),Object(d["createVNode"])(f,{id:"demo2"}),Object(d["createVNode"])(p,{id:"demo3"}),Object(d["createVNode"])(m,{id:"demo4"}),Object(d["createVNode"])(u,{id:"demo5"}),Object(d["createVNode"])(v,{id:"demo6"}),i,Object(d["createVNode"])(y)])})),s={class:"demo"};function b(n,t,e,o,r,a){var i=Object(d["resolveComponent"])("code-box");return Object(d["openBlock"])(),Object(d["createBlock"])("div",s,[Object(d["createVNode"])(i,{code:n.code,markdown:n.md},null,8,["code","markdown"])])}var l="import {computed, defineComponent} from 'vue';\n\nconst tabs2 = [\n  {title: 'First Tab', sub: '1'},\n  {title: 'Second Tab', sub: '2'},\n  {title: 'Third Tab', sub: '3'}\n];\n\nexport default defineComponent({\n  name: 'TabBarExample',\n  props: {},\n  setup() {\n    const tabs = computed(() => {\n      return [\n        {title: <m-badge text=\"3\">First Tab</m-badge>},\n        {title: <m-badge text=\"ä»Šæ—¥(20)\">Second Tab</m-badge>},\n        {title: <m-badge dot={true}>Third Tab</m-badge>}\n      ];\n    });\n    return {tabs};\n  },\n  render() {\n    return <div>\n      <m-tabs tabs={this.tabs}\n              initialPage={1}\n              onChange={(tab, index) => {\n                console.log('onChange', index, tab);\n              }}\n              onTabClick={(tab, index) => {\n                console.log('onTabClick', index, tab);\n              }}\n      >\n        <div style={{\n          display: 'flex',\n          alignItems: 'center',\n          justifyContent: 'center',\n          height: '150px',\n          backgroundColor: '#fff'\n        }}>\n          Content of first tab\n        </div>\n        <div style={{\n          display: 'flex',\n          alignItems: 'center',\n          justifyContent: 'center',\n          height: '150px',\n          backgroundColor: '#fff'\n        }}>\n          Content of second tab\n        </div>\n        <div style={{\n          display: 'flex',\n          alignItems: 'center',\n          justifyContent: 'center',\n          height: '150px',\n          backgroundColor: '#fff'\n        }}>\n          Content of third tab\n        </div>\n      </m-tabs>\n      <m-white-space/>\n      <m-tabs tabs={tabs2}\n              initialPage={1}\n              tabBarPosition=\"bottom\"\n              renderTab={tab => <span>{tab.title}</span>}\n      >\n        <div style={{\n          display: 'flex',\n          alignItems: 'center',\n          justifyContent: 'center',\n          height: '150px',\n          backgroundColor: '#fff'\n        }}>\n          Content of first tab\n        </div>\n        <div style={{\n          display: 'flex',\n          alignItems: 'center',\n          justifyContent: 'center',\n          height: '150px',\n          backgroundColor: '#fff'\n        }}>\n          Content of second tab\n        </div>\n        <div style={{\n          display: 'flex',\n          alignItems: 'center',\n          justifyContent: 'center',\n          height: '150px',\n          backgroundColor: '#fff'\n        }}>\n          Content of third tab\n        </div>\n      </m-tabs>\n      <m-white-space/>\n    </div>;\n  }\n});\n",f=e("b6d8"),p=e.n(f),m=e("4f8a"),u=Object(d["defineComponent"])({components:{CodeBox:m["a"]},setup:function(){return{code:l,md:p.a}}});u.render=b;var v=u,y={class:"demo"};function C(n,t,e,o,r,a){var i=Object(d["resolveComponent"])("code-box");return Object(d["openBlock"])(),Object(d["createBlock"])("div",y,[Object(d["createVNode"])(i,{code:n.code,markdown:n.md},null,8,["code","markdown"])])}var h="import {defineComponent} from 'vue';\nimport {Sticky, StickyContainer} from '../../sticky';\nimport Tabs from '../src';\n\nconst tabs = [\n  {title: 'First Tab', key: 't1'},\n  {title: 'Second Tab', key: 't2'},\n  {title: 'Third Tab', key: 't3'}\n];\n\nexport default defineComponent({\n  name: 'TabsExample',\n  props: {},\n  setup() {\n    const renderTabBar = (props) => {\n      return <Sticky>\n        <div style={{zIndex: 1}}><Tabs.DefaultTabBar {...props}/></div>\n      </Sticky>;\n    };\n    return {renderTabBar};\n  },\n  render() {\n    return <div>\n      <m-white-space/>\n      <StickyContainer>\n        <m-tabs tabs={tabs}\n                initialPage=\"t2\"\n                renderTabBar={this.renderTabBar}>\n          <div key=\"t1\" style={{\n            display: 'flex',\n            alignItems: 'center',\n            justifyContent: 'center',\n            height: '250px',\n            backgroundColor: '#fff'\n          }}>\n            Content of first tab\n          </div>\n          <div key=\"t2\" style={{\n            display: 'flex',\n            alignItems: 'center',\n            justifyContent: 'center',\n            height: '250px',\n            backgroundColor: '#fff'\n          }}>\n            Content of second tab\n          </div>\n          <div key=\"t3\" style={{\n            display: 'flex',\n            alignItems: 'center',\n            justifyContent: 'center',\n            height: '250px',\n            backgroundColor: '#fff'\n          }}>\n            Content of third tab\n          </div>\n        </m-tabs>\n      </StickyContainer>\n      <m-white-space/>\n    </div>;\n  }\n});\n",k=e("e2d0"),g=e.n(k),x=Object(d["defineComponent"])({components:{CodeBox:m["a"]},setup:function(){return{code:h,md:g.a}}});x.render=C;var j=x,T={class:"demo"};function O(n,t,e,o,r,a){var i=Object(d["resolveComponent"])("code-box");return Object(d["openBlock"])(),Object(d["createBlock"])("div",T,[Object(d["createVNode"])(i,{code:n.code,markdown:n.md},null,8,["code","markdown"])])}var B="import {defineComponent} from 'vue';\n\n\nconst tabs = [\n  {title: 'First Tab', key: 't1'},\n  {title: 'Second Tab', key: 't2'},\n  {title: 'Third Tab', key: 't3'}\n];\n\nexport default defineComponent({\n  name: 'TabBarExample',\n  render() {\n    return <div>\n      <m-white-space/>\n      <m-tabs tabs={tabs} initialPage={2} animated={false} useOnPan={false}>\n        <div key=\"t1\" style={{\n          display: 'flex',\n          alignItems: 'center',\n          justifyContent: 'center',\n          height: '250px',\n          backgroundColor: '#fff'\n        }}>\n          Content of first tab\n        </div>\n        <div key=\"t2\" style={{\n          display: 'flex',\n          alignItems: 'center',\n          justifyContent: 'center',\n          height: '250px',\n          backgroundColor: '#fff'\n        }}>\n          Content of second tab\n        </div>\n        <div key=\"t3\" style={{\n          display: 'flex',\n          alignItems: 'center',\n          justifyContent: 'center',\n          height: '250px',\n          backgroundColor: '#fff'\n        }}>\n          Content of third tab\n        </div>\n      </m-tabs>\n      <m-white-space/>\n    </div>;\n  }\n});\n",w=e("0c58"),I=e.n(w),N=Object(d["defineComponent"])({components:{CodeBox:m["a"]},setup:function(){return{code:B,md:I.a}}});N.render=O;var V=N,S={class:"demo"};function P(n,t,e,o,r,a){var i=Object(d["resolveComponent"])("code-box");return Object(d["openBlock"])(),Object(d["createBlock"])("div",S,[Object(d["createVNode"])(i,{code:n.code,markdown:n.md},null,8,["code","markdown"])])}var D="const tabs = [\n  {title: 'First Tab', key: 't1'},\n  {title: 'Second Tab', key: 't2'},\n  {title: 'Third Tab', key: 't3'}\n];\n\nexport default {\n  render() {\n    return <div>\n      <m-white-space/>\n      <div style={{height: '200px'}}>\n        <m-tabs tabs={tabs}\n                initialPage={'t2'}>\n          <div key=\"t1\" style={{\n            display: 'flex',\n            alignItems: 'center',\n            justifyContent: 'center',\n            height: '250px',\n            backgroundColor: '#fff'\n          }}>\n            Content of first tab\n          </div>\n          <div key=\"t2\" style={{\n            display: 'flex',\n            alignItems: 'center',\n            justifyContent: 'center',\n            height: '250px',\n            backgroundColor: '#fff'\n          }}>\n            Content of second tab\n          </div>\n          <div key=\"t3\" style={{\n            display: 'flex',\n            alignItems: 'center',\n            justifyContent: 'center',\n            height: '250px',\n            backgroundColor: '#fff'\n          }}>\n            Content of third tab\n          </div>\n        </m-tabs>\n      </div>\n    </div>;\n  }\n};\n",F=e("38e3"),E=e.n(F),z=Object(d["defineComponent"])({components:{CodeBox:m["a"]},setup:function(){return{code:D,md:E.a}}});z.render=P;var J=z,M={class:"demo"};function _(n,t,e,o,r,a){var i=Object(d["resolveComponent"])("code-box");return Object(d["openBlock"])(),Object(d["createBlock"])("div",M,[Object(d["createVNode"])(i,{code:n.code,markdown:n.md},null,8,["code","markdown"])])}var A="const tabs = [\n  {title: '1 Tab', key: 't1'},\n  {title: '2 Tab', key: 't2'},\n  {title: '3 Tab', key: 't3'}\n];\n\nexport default {\n  render() {\n    return <div style={{height: '200px'}}>\n      <m-white-space/>\n      <m-tabs tabs={tabs}\n              initialPage={'t2'}\n              tabBarPosition=\"left\"\n              tabDirection=\"vertical\"\n      >\n        <div key=\"t1\" style={{\n          display: 'flex',\n          alignItems: 'center',\n          justifyContent: 'center',\n          height: '250px',\n          backgroundColor: '#fff'\n        }}>\n          Content of first tab\n        </div>\n        <div key=\"t2\" style={{\n          display: 'flex',\n          alignItems: 'center',\n          justifyContent: 'center',\n          height: '250px',\n          backgroundColor: '#fff'\n        }}>\n          Content of second tab\n        </div>\n        <div key=\"t3\" style={{\n          display: 'flex',\n          alignItems: 'center',\n          justifyContent: 'center',\n          height: '250px',\n          backgroundColor: '#fff'\n        }}>\n          Content of third tab\n        </div>\n      </m-tabs>\n      <m-white-space/>\n    </div>;\n  }\n};\n",L=e("0d12"),U=e.n(L),q=Object(d["defineComponent"])({components:{CodeBox:m["a"]},setup:function(){return{code:A,md:U.a}}});q.render=_;var G=q,H={class:"demo"};function K(n,t,e,o,r,a){var i=Object(d["resolveComponent"])("code-box");return Object(d["openBlock"])(),Object(d["createBlock"])("div",H,[Object(d["createVNode"])(i,{code:n.code,markdown:n.md},null,8,["code","markdown"])])}var Q="import {defineComponent} from 'vue';\nimport Tabs from '../src';\n\nexport default defineComponent({\n  name: 'TabsExample',\n  props: {},\n  setup() {\n    const renderContent = (tab) => {\n      return (<div key={tab.key} style={{\n        display: 'flex',\n        alignItems: 'center',\n        justifyContent: 'center',\n        height: '150px',\n        backgroundColor: '#fff'\n      }}>\n        <p>Content of {tab.title}</p>\n      </div>);\n    };\n    return {\n      renderContent\n    };\n  },\n  render() {\n    const tabs = [\n      {title: '1st Tab', key: '1'},\n      {title: '2nd Tab', key: '2'},\n      {title: '3rd Tab', key: '3'},\n      {title: '4th Tab', key: '4'},\n      {title: '5th Tab', key: '5'},\n      {title: '6th Tab', key: '6'},\n      {title: '7th Tab', key: '7'},\n      {title: '8th Tab', key: '8'},\n      {title: '9th Tab', key: '9'}\n    ];\n\n    return (\n      <div>\n        <m-white-space/>\n        <m-tabs tabs={tabs} renderTabBar={props => <Tabs.DefaultTabBar\n          {...props} page={3}/>}>\n          {\n            tabs.map(tab => this.renderContent(tab))\n          }\n        </m-tabs>\n        <m-white-space/>\n      </div>\n    );\n  }\n});\n",R=e("c1c2"),W=e.n(R),X=Object(d["defineComponent"])({components:{CodeBox:m["a"]},setup:function(){return{code:Q,md:W.a}}});X.render=K;var Y=X,Z=e("300c"),$=e("27ae"),nn=e.n($),tn=e("816c"),en=e.n(tn),dn=Object(d["defineComponent"])({components:{TitleDoc:nn.a,PropsDoc:en.a,MTabs:Z["a"],demo1:v,demo2:j,demo3:V,demo4:J,demo5:G,demo6:Y},setup:function(){return{}}});e("b419");dn.render=c,dn.__scopeId="data-v-7fdd0bc4";t["default"]=dn},"27ae":function(n,t){n.exports='<h1 id="标签页--m-tabs">标签页  m-tabs</h1>\n'},"38e3":function(n,t){n.exports='<h4 id="固定高度">固定高度</h4>\n'},4521:function(n,t,e){},"816c":function(n,t){n.exports="<table>\n<thead>\n<tr>\n<th>属性</th>\n<th>说明</th>\n<th>类型</th>\n<th>默认值</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>activeCardColor</td>\n<td>激活的卡片背景色（未激活卡片的边框色与之相同）</td>\n<td>string</td>\n<td></td>\n</tr>\n<tr>\n<td>animated</td>\n<td>切换标签时是否有动画</td>\n<td>boolean</td>\n<td>true</td>\n</tr>\n<tr>\n<td>card</td>\n<td>使用卡片样式</td>\n<td>boolean</td>\n<td></td>\n</tr>\n<tr>\n<td>destroyInactiveTab</td>\n<td>是否销毁未激活的标签页</td>\n<td>boolean</td>\n<td>false</td>\n</tr>\n<tr>\n<td>distanceToChangeTab</td>\n<td>切换卡片的滑动距离，0-1之间</td>\n<td>number</td>\n<td>0</td>\n</tr>\n<tr>\n<td>page</td>\n<td></td>\n<td>number | string</td>\n<td></td>\n</tr>\n<tr>\n<td>prefixCls</td>\n<td>class前缀</td>\n<td>string</td>\n<td></td>\n</tr>\n<tr>\n<td>prerenderingSiblingsNumber</td>\n<td>与当前激活标签相邻的提前渲染的标签数量</td>\n<td>number</td>\n<td>1</td>\n</tr>\n<tr>\n<td>renderTabBar</td>\n<td></td>\n<td>(props: any) =&gt; VNode</td>\n<td></td>\n</tr>\n<tr>\n<td>swipeable</td>\n<td>是否支持手势</td>\n<td>boolean</td>\n<td>true</td>\n</tr>\n<tr>\n<td>tabBarActiveTextColor</td>\n<td>激活的标签页文字颜色</td>\n<td>string</td>\n<td></td>\n</tr>\n<tr>\n<td>tabBarBackgroundColor</td>\n<td>标签页背景颜色</td>\n<td>string</td>\n<td></td>\n</tr>\n<tr>\n<td>tabBarInactiveTextColor</td>\n<td>未激活的标签页文字颜色</td>\n<td>string</td>\n<td></td>\n</tr>\n<tr>\n<td>tabBarPosition</td>\n<td>TabBar&#39;s position</td>\n<td>default: top</td>\n<td>&#39;top&#39; | &#39;bottom&#39; | &#39;left&#39; | &#39;right&#39;</td>\n</tr>\n<tr>\n<td>tabBarTextStyle</td>\n<td>标签栏文字样式</td>\n<td>any</td>\n<td></td>\n</tr>\n<tr>\n<td>tabBarUnderlineStyle</td>\n<td>标签下划线样式</td>\n<td>any</td>\n<td></td>\n</tr>\n<tr>\n<td>tabDirection</td>\n<td>标签页方向</td>\n<td>&#39;horizontal&#39; | &#39;vertical&#39;</td>\n<td></td>\n</tr>\n<tr>\n<td>tabs</td>\n<td>标签数据</td>\n<td>Models.TabData[]</td>\n<td></td>\n</tr>\n<tr>\n<td>useLeftInsteadTransform</td>\n<td>use left instead of transform</td>\n<td>default: false</td>\n<td>boolean</td>\n</tr>\n<tr>\n<td>useOnPan</td>\n<td></td>\n<td>boolean</td>\n<td>true</td>\n</tr>\n<tr>\n<td>usePaged</td>\n<td></td>\n<td>boolean</td>\n<td>true</td>\n</tr>\n<tr>\n<td>value</td>\n<td>当前激活的卡片的索引</td>\n<td>number | string</td>\n<td>0</td>\n</tr>\n</tbody></table>\n"},b419:function(n,t,e){"use strict";e("4521")},b6d8:function(n,t){n.exports='<h4 id="基本">基本</h4>\n'},c1c2:function(n,t){n.exports='<h4 id="自定义个数，超出界面宽度，多于5个标签">自定义个数，超出界面宽度，多于5个标签</h4>\n'},e2d0:function(n,t){n.exports='<h4 id="标签栏固定">标签栏固定</h4>\n'}}]);
//# sourceMappingURL=chunk-414fe994.5d897f32.js.map