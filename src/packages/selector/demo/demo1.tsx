import {defineComponent, ref, watch} from 'vue';
import {List, Selector, Space} from '../../';
import {fieldNamesOptions, options} from './options';

export default defineComponent({
  setup() {
    const value1 = ref('2');
    watch(() => value1.value, v => {
      console.log(v);
    });
    return {value1};
  },
  render() {
    return (
      <>
        <List.Item title="单选">
          <Selector
            v-model={[this.value1, 'value']}
            options={options}
            defaultValue={'1'}
          />
        </List.Item>

        <List.Item title="多选">
          <Selector
            options={options}
            defaultValue={['2', '3']}
            multiple
            onChange={(arr, extend) => console.log(arr, extend)}
          />
        </List.Item>

        <List.Item title="两列布局">
          <Selector
            columns={2}
            options={options}
            defaultValue={['2', '3']}
            multiple
          />
        </List.Item>

        <List.Item title="三列布局">
          <Selector
            columns={3}
            options={options}
            defaultValue={['2', '3']}
            multiple
          />
        </List.Item>

        <List.Item title="禁用状态">
          <Space block direction="vertical">
            <Selector options={options} defaultValue={'1'} disabled/>
            <Selector
              options={[
                {
                  label: '选项一',
                  value: '1'
                },
                {
                  label: '选项二',
                  value: '2',
                  disabled: true
                },
                {
                  label: '选项三',
                  value: '3'
                }
              ]}
              defaultValue={'3'}
            />
          </Space>
        </List.Item>
        <List.Item title="自定义FieldName">
          <Selector
            options={fieldNamesOptions}
            labelProperty="labelT"
            valueProperty="valueT"
            defaultValue={['1']}
            multiple
            onChange={(arr, extend) => console.log(arr, extend)}
          />
        </List.Item>
      </>
    );
  }
});
