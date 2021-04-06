<template>
  <a-layout>
    <m-list>
      <m-radio-popup-list v-model="value"
                          :options="options"
                          title="单选"></m-radio-popup-list>
      <m-radio-popup-list v-model="value2"
                          :options="options2"
                          title="单选"></m-radio-popup-list>
      <m-radio-item>单个</m-radio-item>
    </m-list>
  </a-layout>
</template>
<script lang="ts">
  import {computed, defineComponent, ref} from 'vue';

  export default defineComponent({
    name: 'Components',
    setup(props, {emit, slots}) {
      const value = ref(null);
      const value2 = ref(null);

      const options = computed(() => {
        const options = [];
        for (let i = 0; i < 100; i++) {
          options.push({label: '选项' + i, value: i});
        }
        return options;
      });
      const options2 = computed(() => {
        const options = [];
        for (let i = 0; i < 5; i++) {
          options.push({label: '选项' + i, value: i});
        }
        return options;
      });


      return {
        value,
        value2,
        options,
        options2
      };
    }
  });
</script>
<style lang="less" type="text/less">
</style>
