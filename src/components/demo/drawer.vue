<template>
  <a-layout>
    <m-drawer v-model="show">
      <m-button @click="show = !show">测试</m-button>
      <m-list slot="content"
              class="bg-white"
              style="height: 100%">
        <m-list-item>测试1</m-list-item>
        <m-list-item>测试2</m-list-item>
        <m-list-item>测试3</m-list-item>
      </m-list>
    </m-drawer>
  </a-layout>
</template>
<script lang="ts">
  import {defineComponent, ref} from 'vue';

  export default defineComponent({
    name: 'Components',
    setup(props, {emit, slots}) {
      const show = ref(false);


      return {
        show
      };
    }
  });
</script>
<style lang="less" type="text/less">
</style>
