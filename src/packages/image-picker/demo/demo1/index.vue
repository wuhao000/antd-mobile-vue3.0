<template>
  <div>
    <m-image-picker v-model="files"/>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import ImagePicker from '../../index';
  import { inject, provide, ref, Ref, reactive, nextTick, PropType, defineComponent } from 'vue';

  export default defineComponent({
    name: 'Demo1',
    setup(props, {emit, slots}) {
      const files = ref([]);


      const onChange = (files) => {
        files.value = files;
      }


      return {
        files,
        onChange
      };
    }
  });

</script>
<style scoped lang="less">
</style>
