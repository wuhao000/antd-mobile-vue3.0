<template>
  <div>
    <m-range-item v-model:value="value"
                  :max="100"
                  :min="0"
                  title="基本"/>
    <m-range-item :value="[20, 60]"
                  :max="100"
                  :min="0"
                  disabled
                  title="禁用"/>
    <m-range-item :value="[10, 40]"
                  :max="100"
                  :track-style="[{ backgroundColor: 'red' }, { backgroundColor: 'green' }]"
                  :handle-style="[{ backgroundColor: 'yellow' }, { backgroundColor: 'gray' }]"
                  :min="0"
                  title="自定义样式"/>
  </div>
</template>
<script lang="ts">
import {Slider} from 'ant-design-vue';
import {defineComponent, ref} from 'vue';
import Range from '../index';

export default defineComponent({
  name: 'Demo1',
  components: {
    ASlider: Slider,
    [Range.Item.name]: Range.Item
  },
  setup(props, {emit, slots}) {
    const value = ref([1, 2]);
    return {
      value
    };
  }
});
</script>
