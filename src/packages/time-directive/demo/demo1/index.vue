<template>
  <div class="demo">
    <span v-time="time"></span>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { inject, provide, ref, Ref, reactive, nextTick, PropType, defineComponent } from 'vue';

  export default defineComponent({
    name: 'Demo1',
    setup(props, {emit, slots}) {
      const time = ref(new Date());


      return {
        time
      };
    }
  });
</script>
