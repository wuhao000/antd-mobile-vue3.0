import CascaderView from '../';
import DemoBlock from '../../../components/demo-wrapper';
import {defineComponent, ref} from 'vue';

import {options, sameValueOptions} from './data';

export default defineComponent({
  setup() {
    const value = ref<string[]>([]);
    return {
      value,
      setValue: (v) => {
        value.value = v;
      }
    };
  },
  render() {
    return (
        <>
      <DemoBlock title="基础用法" padding="0">
        <CascaderView options={options}/>
      </DemoBlock>

      <DemoBlock title="多选模式" padding="0">
        <CascaderView
            options={options}
            value={this.value}
            multiple={true}
            onChange={(val) => {
              this.setValue(val);
              console.log('onChange', val);
            }}
        />
      </DemoBlock>

      <DemoBlock title="自定义高度" padding="0">
        <CascaderView options={options} style={{'--height': '320px'}}/>
      </DemoBlock>

      <DemoBlock title="不同层级中存在 value 重复的选项" padding="0">
        <CascaderView
            options={sameValueOptions}
            onChange={(val, ext) => {
              console.log(val, ext.items);
            }}
        />
      </DemoBlock>
    </>
    );
  }
});
