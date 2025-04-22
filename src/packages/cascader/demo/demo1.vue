<template>
  <m-cascader
    v-model:value="value"
    title="级联选择器"
    searchable
    popup-height="50%"
    placeholder="请选择"
    :options="options"
  />
</template>
<script setup lang="ts">
import MCascader from "../index";
import {ref} from "vue";

const value = ref([]);

const options = [
  {
    value: 'shaanxi', label: '陕西',
    children: [
      {value: 'xian', label: '西安', children: [{value: 'weiyang', label: '未央区'}]},
      {value: 'yulin', label: '榆林'},
    ]
  },
  {value: 'jiangsu', label: '江苏', children: [{value: 'nanjing', label: '南京'}]},
  {value: 'beijing', label: '北京'}
]

</script>
