import {defineComponent} from 'vue';

const options = [{
  label: '选项1',
  value: 0
}, {
  label: '选项2',
  value: 1
}, {
  label: '选项3',
  value: 2
}];
const options2 = [{
  label: '选项1',
  value: 0
}, {
  label: '选项2',
  value: 1,
  disabled: true
}, {
  label: '选项3',
  value: 2
}];
export default defineComponent({
  data() {
    return {
      value2: [],
      value3: [1, 3],
      options3: [{
        id: 1,
        name: <span>选项1</span>
      }, {
        id: 2,
        name: <span>选项2</span>
      }, {
        id: 3,
        name: <span>选项3</span>
      }]
    };
  },
  watch: {
    value2(v) {
      console.log(v);
    },
    value3(v) {
      console.log(v);
    }
  },
  render() {
    return <div>
      <m-checkbox-popup-list
          visible={true}
          v-model={[this.value2, 'value']}
          searchable={true}
          title="点击选择"
          options={options}/>
      <m-checkbox-popup-list
          title="点击选择（包含禁用选项）"
          options={options2}/>
      <m-checkbox-popup-list
          v-model={[this.value3, 'value']}
          title="自定义选项"
          labelProperty="name"
          valueProperty="id"
          options={this.options3}/>
    </div>;
  }
});
