<template>
  <div>
    {{ value }}
    <m-search-bar v-model="value"/>
  </div>
</template>
<script lang="ts">
  import {defineComponent, Ref, ref} from 'vue';

  export default defineComponent({
    name: 'Demo1',
    setup(props, {emit, slots}) {
      const value: Ref<string> = ref('');
      return {
        value
      };
    }
  });
</script>
<style lang="less" scoped>
</style>
