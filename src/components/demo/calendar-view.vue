<template>
  <div>
    <m-list>
      <m-calendar-view :get-date-extra="getExtra"
                       title="日期范围选择"/>
    </m-list>
  </div>
</template>
<script lang="ts">
  import {defineComponent} from 'vue';

  export default defineComponent({
    name: 'Demo1',
    setup(props, {emit, slots}) {


      const getExtra = () => {
        return {
          selected: true,
          info: 'abc'
        };
      };


      return {
        getExtra
      };
    }
  });
</script>
<style lang="less" scoped>
</style>
