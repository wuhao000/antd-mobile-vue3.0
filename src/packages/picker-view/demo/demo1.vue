<template>
  <div>
    <m-picker-view v-model:value="value1"
                   :data="district"
                   extra="请选择(可选)"
                   title="Areas"/>
    <m-picker-view :cascade="false"
                   :data="seasons"
                   extra="请选择(可选)"
                   title="选择季节"/>
    <m-picker-view v-model:value="value"
                   :data="data"
                   placeholder="请选择"
                   title="测试"/>
    <m-picker-view v-model:value="value2"
                   :cols="1"
                   :data="data2"
                   placeholder="请选择"
                   title="测试"/>
  </div>
</template>
<script lang="tsx">
  import {district} from 'antd-mobile-demo-data';
  import {defineComponent, ref} from 'vue';
  import MPickerView from '../index';
  import getColors from './colors';

  export default defineComponent({
    name: 'Demo1',
    components: {MPickerView},
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
