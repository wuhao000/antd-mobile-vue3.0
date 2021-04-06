(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-149d9750"],{"0a77":function(n,t,e){"use strict";e("6b58")},4790:function(n,t){n.exports='<h1 id="选择器--m-picker">选择器  m-picker</h1>\n'},"4c29":function(n,t){n.exports="<p>基本用法</p>\n"},"517a":function(n,t){n.exports="<table>\n<thead>\n<tr>\n<th>属性</th>\n<th>说明</th>\n<th>类型</th>\n<th>默认值</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>cascade</td>\n<td></td>\n<td>boolean</td>\n<td>true</td>\n</tr>\n<tr>\n<td>cols</td>\n<td></td>\n<td>number</td>\n<td>3</td>\n</tr>\n<tr>\n<td>data</td>\n<td></td>\n<td>PickerData[] | PickerData[][]</td>\n<td></td>\n</tr>\n<tr>\n<td>cancelText</td>\n<td></td>\n<td>string</td>\n<td></td>\n</tr>\n<tr>\n<td>extra</td>\n<td></td>\n<td>string</td>\n<td></td>\n</tr>\n<tr>\n<td>format</td>\n<td></td>\n<td>(values: Array&lt;VNode | string&gt;) =&gt; string | VNode[]</td>\n<td></td>\n</tr>\n<tr>\n<td>indicatorStyle</td>\n<td></td>\n<td>any</td>\n<td></td>\n</tr>\n<tr>\n<td>itemStyle</td>\n<td></td>\n<td>any</td>\n<td></td>\n</tr>\n<tr>\n<td>okText</td>\n<td></td>\n<td>string</td>\n<td></td>\n</tr>\n<tr>\n<td>onChange</td>\n<td></td>\n<td>(date?: CascaderValue) =&gt; void</td>\n<td></td>\n</tr>\n<tr>\n<td>pickerPrefixCls</td>\n<td></td>\n<td>string</td>\n<td></td>\n</tr>\n<tr>\n<td>placeholder</td>\n<td></td>\n<td>string</td>\n<td></td>\n</tr>\n<tr>\n<td>popupPrefixCls</td>\n<td></td>\n<td>string</td>\n<td></td>\n</tr>\n<tr>\n<td>prefixCls</td>\n<td></td>\n<td>string</td>\n<td></td>\n</tr>\n<tr>\n<td>title</td>\n<td></td>\n<td>string</td>\n<td></td>\n</tr>\n<tr>\n<td>triggerType</td>\n<td></td>\n<td>string</td>\n<td></td>\n</tr>\n<tr>\n<td>value</td>\n<td></td>\n<td>Array&lt;string | number&gt;</td>\n<td></td>\n</tr>\n</tbody></table>\n"},"6b58":function(n,t,e){},b990:function(n,t,e){"use strict";e.r(t);var a=e("8bbf"),r=Object(a["withScopeId"])("data-v-5bf18087");Object(a["pushScopeId"])("data-v-5bf18087");var i={id:"basic"},d=Object(a["createVNode"])("div",{class:"markdown-body m-b",id:"demo"},[Object(a["createVNode"])("span"),Object(a["createVNode"])("h2",null,"示例代码")],-1),l=Object(a["createVNode"])("div",{class:"markdown-body",id:"props"},[Object(a["createVNode"])("span"),Object(a["createVNode"])("h2",null,"属性说明")],-1);Object(a["popScopeId"])();var o=r((function(n,t,e,r,o,s){var c=Object(a["resolveComponent"])("title-doc"),p=Object(a["resolveComponent"])("demo1"),m=Object(a["resolveComponent"])("props-doc");return Object(a["openBlock"])(),Object(a["createBlock"])("div",null,[Object(a["createVNode"])("div",i,[Object(a["createVNode"])(c)]),d,Object(a["createVNode"])(p,{id:"demo1"}),l,Object(a["createVNode"])(m)])})),s={class:"demo"};function c(n,t,e,r,i,d){var l=Object(a["resolveComponent"])("code-box");return Object(a["openBlock"])(),Object(a["createBlock"])("div",s,[Object(a["createVNode"])(l,{code:n.code,markdown:n.md},null,8,["code","markdown"])])}var p="<template>\n  <div>\n    <m-picker v-model:value=\"value1\"\n              :data=\"district\"\n              extra=\"请选择(可选)\"\n              title=\"Areas\">\n      <m-list-item arrow=\"horizontal\">Multiple & cascader</m-list-item>\n    </m-picker>\n    <m-picker :cascade=\"false\"\n              :data=\"seasons\"\n              extra=\"请选择(可选)\"\n              title=\"选择季节\">\n      <m-list-item arrow=\"horizontal\">Multiple</m-list-item>\n    </m-picker>\n    <m-picker v-model:value=\"value\"\n              :data=\"data\"\n              placeholder=\"请选择\"\n              title=\"测试\">\n      <m-list-item>测试</m-list-item>\n    </m-picker>\n    <m-picker v-model:value=\"value2\"\n              :cols=\"1\"\n              :data=\"data2\"\n              placeholder=\"请选择\"\n              title=\"测试\">\n      <m-list-item>选择颜色</m-list-item>\n    </m-picker>\n  </div>\n</template>\n<script lang=\"tsx\">\n  import {district} from 'antd-mobile-demo-data';\n  import {defineComponent, ref} from 'vue';\n  /*\nimport { Picker, List, WhiteSpace } from 'antd-mobile';\nimport { createForm } from 'rc-form';\nimport arrayTreeFilter from 'array-tree-filter';\n\n\n// 如果不是使用 List.Item 作为 children\nconst CustomChildren = props => (\n<div\n  onClick={props.onClick}\n  style={{ backgroundColor: '#fff', paddingLeft: 15 }}\n>\n  <div className=\"test\" style={{ display: 'flex', height: '45px', lineHeight: '45px' }}>\n    <div style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{props.children}</div>\n    <div style={{ textAlign: 'right', color: '#888', marginRight: 15 }}>{props.extra}</div>\n  </div>\n</div>\n);\n\nconst colorStyle = {\ndisplay: 'inline-block',\nverticalAlign: 'middle',\nwidth: '16px',\nheight: '16px',\nmarginRight: '10px',\n};\n\nconst colors = [\n{\n  label:\n  (<div>\n    <span\n      style={{ ...colorStyle, backgroundColor: '#FF0000' }}\n    />\n    <span>红色</span>\n  </div>),\n  value: '#FF0000',\n},\n{\n  label:\n  (<div>\n    <span\n      style={{ ...colorStyle, backgroundColor: '#00FF00' }}\n    />\n    <span>绿色</span>\n  </div>),\n  value: '#00FF00',\n},\n{\n  label:\n  (<div>\n    <span\n      style={{ ...colorStyle, backgroundColor: '#0000FF' }}\n    />\n    <span>蓝色</span>\n  </div>),\n  value: '#0000FF',\n},\n];\n\nclass Test extends React.Component {\nstate = {\n  data: [],\n  cols: 1,\n  pickerValue: [],\n  asyncValue: [],\n  sValue: ['2013', '春'],\n  visible: false,\n  colorValue: ['#00FF00'],\n};\nonClick = () => {\n  setTimeout(() => {\n    this.setState({\n      data: provinceLite,\n    });\n  }, 120);\n};\nonPickerChange = (val) => {\n  console.log(val);\n  let colNum = 1;\n  const d = [...this.state.data];\n  const asyncValue = [...val];\n  if (val[0] === 'zj') {\n    d.forEach((i) => {\n      if (i.value === 'zj') {\n        colNum = 2;\n        if (!i.children) {\n          i.children = [{\n            value: 'zj-nb',\n            label: '宁波',\n          }, {\n            value: 'zj-hz',\n            label: '杭州',\n          }];\n          asyncValue.push('zj-nb');\n        } else if (val[1] === 'zj-hz') {\n          i.children.forEach((j) => {\n            if (j.value === 'zj-hz') {\n              j.children = [{\n                value: 'zj-hz-xh',\n                label: '西湖区',\n              }];\n              asyncValue.push('zj-hz-xh');\n            }\n          });\n          colNum = 3;\n        }\n      }\n    });\n  } else {\n    colNum = 1;\n  }\n  this.setState({\n    data: d,\n    cols: colNum,\n    asyncValue,\n  });\n};\ngetSel() {\n  const value = this.state.pickerValue;\n  if (!value) {\n    return '';\n  }\n  const treeChildren = arrayTreeFilter(district, (c, level) => c.value === value[level]);\n  return treeChildren.map(v => v.label).join(',');\n}\n// setVal() {\n//   this.props.form.setFieldsValue({\n//     district: ['340000', '340800', '340822'],\n//   });\n// },\n\nonChangeColor = (color) => {\n  this.setState({\n    colorValue: color,\n  });\n};\n\nrender() {\n  const { getFieldProps } = this.props.form;\n  return (<div>\n    <WhiteSpace size=\"lg\" />\n    <List style={{ backgroundColor: 'white' }} className=\"picker-list\">\n\n      <Picker data={district} cols={1} {...getFieldProps('district3')} className=\"forss\">\n        <List.Item arrow=\"horizontal\">Single</List.Item>\n      </Picker>\n      <Picker\n        data={this.state.data}\n        cols={this.state.cols}\n        value={this.state.asyncValue}\n        onPickerChange={this.onPickerChange}\n        onOk={v => console.log(v)}\n      >\n        <List.Item arrow=\"horizontal\" onClick={this.onClick}>Multiple & async</List.Item>\n      </Picker>\n      <Picker\n        title=\"选择地区\"\n        extra=\"请选择(可选)\"\n        data={district}\n        value={this.state.pickerValue}\n        onChange={v => this.setState({ pickerValue: v })}\n        onOk={v => this.setState({ pickerValue: v })}\n      >\n        <CustomChildren>Customized children</CustomChildren>\n      </Picker>\n      <Picker\n        visible={this.state.visible}\n        data={district}\n        value={this.state.pickerValue}\n        onChange={v => this.setState({ pickerValue: v })}\n        onOk={() => this.setState({ visible: false })}\n        onDismiss={() => this.setState({ visible: false })}\n      >\n        <List.Item extra={this.getSel()} onClick={() => this.setState({ visible: true })}>\n          Visible state\n        </List.Item>\n      </Picker>\n      <Picker\n        data={colors}\n        value={this.state.colorValue}\n        cols={1}\n        onChange={this.onChangeColor}\n      >\n        <List.Item arrow=\"horizontal\">Complex Labels</List.Item>\n      </Picker>\n    </List>\n  </div>);\n}\n}\n\nconst TestWrapper = createForm()(Test);\n\nReactDOM.render(<TestWrapper />, mountNode);\n.picker-list .am-list-item .am-list-line .am-list-extra {\nflex-basis: initial;\n}\n\n.test {\nposition: relative;\nborder-bottom: 0;\n}\n\n.test:after {\ncontent: '';\nposition: absolute;\nbackground-color: #ddd;\ndisplay: block;\nz-index: 1;\ntop: auto;\nright: auto;\nbottom: 0;\nleft: 0;\nwidth: 100%;\nheight: 1PX;\n-webkit-transform-origin: 50% 100%;\n-ms-transform-origin: 50% 100%;\ntransform-origin: 50% 100%;\n-webkit-transform: scaleY(0.5);\n-ms-transform: scaleY(0.5);\ntransform: scaleY(0.5);\n}\n */\n  import getColors from './colors';\n\n  export default defineComponent({\n    name: 'Demo1',\n    setup(props, {emit, slots}) {\n      const data = ref([{\n        label: '江苏省',\n        value: 'JiangSu',\n        children: [{\n          label: '南京市',\n          value: 'NanJing'\n        }, {\n          label: '苏州',\n          value: 'SuZhou'\n        }]\n      }]);\n      const value2 = ref(null);\n      const data2 = ref(getColors());\n      const value = ref(null);\n\n      const value1 = ref(['340000', '341500', '341502']);\n      return {\n        value1,\n        data,\n        value2,\n        data2,\n        value,\n        district,\n        seasons: [\n          [\n            {\n              label: '2013',\n              value: '2013'\n            },\n            {\n              label: '2014',\n              value: '2014'\n            }\n          ],\n          [\n            {\n              label: '春',\n              value: '春'\n            },\n            {\n              label: '夏',\n              value: '夏'\n            }\n          ]\n        ]\n      };\n    }\n  });\n<\/script>\n<style lang=\"less\" scoped>\n</style>\n",m=e("4c29"),u=e.n(m),v=e("4f8a"),h=Object(a["defineComponent"])({components:{CodeBox:v["a"]},setup:function(){return{code:p,md:u.a}}});h.render=c;var b=h,f=e("e50b"),k=e("4790"),g=e.n(k),C=e("517a"),y=e.n(C),j=Object(a["defineComponent"])({components:{TitleDoc:g.a,PropsDoc:y.a,MPicker:f["a"],demo1:b},setup:function(){return{}}});e("0a77");j.render=o,j.__scopeId="data-v-5bf18087";t["default"]=j}}]);
//# sourceMappingURL=chunk-149d9750.12bd8bfd.js.map