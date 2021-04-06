<template>
  <router-view></router-view>
</template>
<script lang="ts">
  import {defineComponent} from 'vue';

  export default defineComponent({
    name: 'Components',
    setup(props, {emit, slots}) {
      return {};
    }
  });
</script>
<style lang="less" type="text/less">
</style>
