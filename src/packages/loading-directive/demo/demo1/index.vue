<template>
  <div>
    <div v-loading="loading">
      aaaaaaaaaaaaaaa
      <a-button @click="load">加载</a-button>
    </div>
    <div v-loading="loading2">
      aaaaaaaaaaaaaaa
      <a-button @click="load">加载</a-button>
    </div>
  </div>
</template>
<script lang="ts">
  import {defineComponent, ref} from 'vue';

  export default defineComponent({
    name: 'Demo1',
    setup(props, {emit, slots}) {
      const loading = ref(false);
      const loading2 = ref(false);


      const load = () => {
        loading.value = true;
        loading2.value = true;
        setTimeout(() => {
          loading.value = false;
        }, 2100);
        setTimeout(() => {
          loading2.value = false;
        }, 2099);
      };


      return {
        loading,
        loading2,
        load
      };
    }
  });
</script>
<style lang="less" scoped>
</style>
