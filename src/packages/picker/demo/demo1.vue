<template>
  <div>
    <m-picker v-model:value="value1"
              :data="district"
              extra="请选择(可选)"
              title="Areas">
      <m-list-item arrow="horizontal">Multiple & cascader</m-list-item>
    </m-picker>
    <m-picker :cascade="false"
              :data="seasons"
              extra="请选择(可选)"
              title="选择季节">
      <m-list-item arrow="horizontal">Multiple</m-list-item>
    </m-picker>
    <m-picker v-model:value="value"
              :data="data"
              placeholder="请选择"
              title="测试">
      <m-list-item>测试</m-list-item>
    </m-picker>
    <m-picker v-model:value="value2"
              :cols="1"
              :data="data2"
              placeholder="请选择"
              title="测试">
      <m-list-item>选择颜色</m-list-item>
    </m-picker>
  </div>
</template>
<script lang="tsx">
  import {district} from 'antd-mobile-demo-data';
  import {defineComponent, ref} from 'vue';
  /*
import { Picker, List, WhiteSpace } from 'antd-mobile';
import { createForm } from 'rc-form';
import arrayTreeFilter from 'array-tree-filter';


// 如果不是使用 List.Item 作为 children
const CustomChildren = props => (
<div
  onClick={props.onClick}
  style={{ backgroundColor: '#fff', paddingLeft: 15 }}
>
  <div className="test" style={{ display: 'flex', height: '45px', lineHeight: '45px' }}>
    <div style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{props.children}</div>
    <div style={{ textAlign: 'right', color: '#888', marginRight: 15 }}>{props.extra}</div>
  </div>
</div>
);

const colorStyle = {
display: 'inline-block',
verticalAlign: 'middle',
width: '16px',
height: '16px',
marginRight: '10px',
};

const colors = [
{
  label:
  (<div>
    <span
      style={{ ...colorStyle, backgroundColor: '#FF0000' }}
    />
    <span>红色</span>
  </div>),
  value: '#FF0000',
},
{
  label:
  (<div>
    <span
      style={{ ...colorStyle, backgroundColor: '#00FF00' }}
    />
    <span>绿色</span>
  </div>),
  value: '#00FF00',
},
{
  label:
  (<div>
    <span
      style={{ ...colorStyle, backgroundColor: '#0000FF' }}
    />
    <span>蓝色</span>
  </div>),
  value: '#0000FF',
},
];

class Test extends React.Component {
state = {
  data: [],
  cols: 1,
  pickerValue: [],
  asyncValue: [],
  sValue: ['2013', '春'],
  visible: false,
  colorValue: ['#00FF00'],
};
onClick = () => {
  setTimeout(() => {
    this.setState({
      data: provinceLite,
    });
  }, 120);
};
onPickerChange = (val) => {
  console.log(val);
  let colNum = 1;
  const d = [...this.state.data];
  const asyncValue = [...val];
  if (val[0] === 'zj') {
    d.forEach((i) => {
      if (i.value === 'zj') {
        colNum = 2;
        if (!i.children) {
          i.children = [{
            value: 'zj-nb',
            label: '宁波',
          }, {
            value: 'zj-hz',
            label: '杭州',
          }];
          asyncValue.push('zj-nb');
        } else if (val[1] === 'zj-hz') {
          i.children.forEach((j) => {
            if (j.value === 'zj-hz') {
              j.children = [{
                value: 'zj-hz-xh',
                label: '西湖区',
              }];
              asyncValue.push('zj-hz-xh');
            }
          });
          colNum = 3;
        }
      }
    });
  } else {
    colNum = 1;
  }
  this.setState({
    data: d,
    cols: colNum,
    asyncValue,
  });
};
getSel() {
  const value = this.state.pickerValue;
  if (!value) {
    return '';
  }
  const treeChildren = arrayTreeFilter(district, (c, level) => c.value === value[level]);
  return treeChildren.map(v => v.label).join(',');
}
// setVal() {
//   this.props.form.setFieldsValue({
//     district: ['340000', '340800', '340822'],
//   });
// },

onChangeColor = (color) => {
  this.setState({
    colorValue: color,
  });
};

render() {
  const { getFieldProps } = this.props.form;
  return (<div>
    <WhiteSpace size="lg" />
    <List style={{ backgroundColor: 'white' }} className="picker-list">

      <Picker data={district} cols={1} {...getFieldProps('district3')} className="forss">
        <List.Item arrow="horizontal">Single</List.Item>
      </Picker>
      <Picker
        data={this.state.data}
        cols={this.state.cols}
        value={this.state.asyncValue}
        onPickerChange={this.onPickerChange}
        onOk={v => console.log(v)}
      >
        <List.Item arrow="horizontal" onClick={this.onClick}>Multiple & async</List.Item>
      </Picker>
      <Picker
        title="选择地区"
        extra="请选择(可选)"
        data={district}
        value={this.state.pickerValue}
        onChange={v => this.setState({ pickerValue: v })}
        onOk={v => this.setState({ pickerValue: v })}
      >
        <CustomChildren>Customized children</CustomChildren>
      </Picker>
      <Picker
        visible={this.state.visible}
        data={district}
        value={this.state.pickerValue}
        onChange={v => this.setState({ pickerValue: v })}
        onOk={() => this.setState({ visible: false })}
        onDismiss={() => this.setState({ visible: false })}
      >
        <List.Item extra={this.getSel()} onClick={() => this.setState({ visible: true })}>
          Visible state
        </List.Item>
      </Picker>
      <Picker
        data={colors}
        value={this.state.colorValue}
        cols={1}
        onChange={this.onChangeColor}
      >
        <List.Item arrow="horizontal">Complex Labels</List.Item>
      </Picker>
    </List>
  </div>);
}
}

const TestWrapper = createForm()(Test);

ReactDOM.render(<TestWrapper />, mountNode);
.picker-list .am-list-item .am-list-line .am-list-extra {
flex-basis: initial;
}

.test {
position: relative;
border-bottom: 0;
}

.test:after {
content: '';
position: absolute;
background-color: #ddd;
display: block;
z-index: 1;
top: auto;
right: auto;
bottom: 0;
left: 0;
width: 100%;
height: 1PX;
-webkit-transform-origin: 50% 100%;
-ms-transform-origin: 50% 100%;
transform-origin: 50% 100%;
-webkit-transform: scaleY(0.5);
-ms-transform: scaleY(0.5);
transform: scaleY(0.5);
}
 */
  import getColors from './colors';

  export default defineComponent({
    name: 'Demo1',
    setup(props, {emit, slots}) {
      const data = ref([{
        label: '江苏省',
        value: 'JiangSu',
        children: [{
          label: '南京市',
          value: 'NanJing'
        }, {
          label: '苏州',
          value: 'SuZhou'
        }]
      }]);
      const value2 = ref(null);
      const data2 = ref(getColors());
      const value = ref(null);

      const value1 = ref(['340000', '341500', '341502']);
      return {
        value1,
        data,
        value2,
        data2,
        value,
        district,
        seasons: [
          [
            {
              label: '2013',
              value: '2013'
            },
            {
              label: '2014',
              value: '2014'
            }
          ],
          [
            {
              label: '春',
              value: '春'
            },
            {
              label: '夏',
              value: '夏'
            }
          ]
        ]
      };
    }
  });
</script>
<style lang="less" scoped>
</style>
