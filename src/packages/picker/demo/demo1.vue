<template>
  <div>
    <div>{{value0}}</div>
    <m-picker v-model:value="value0"
              :data="data0"
              extra="请选择(可选)"
              title="Areas">
      <m-list-item arrow="horizontal">Multiple & cascader</m-list-item>
    </m-picker>
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
      const value0 = ref([]);
      return {
        value1,
        value0,
        data0: [{
          label: '1',
          value: '1',
          children: [{
            label: '1-1',
            value: '1-1'
          }, {
            label: '1-2',
            value: '1-2'
          }]
        }, {
          label: '2',
          value: '2',
          children: [{
            label: '2-1',
            value: '2-1'
          }, {
            label: '2-2',
            value: '2-2'
          }]
        }],
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
