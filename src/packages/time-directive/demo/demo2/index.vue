<template>
  <div class="demo">
    <span format="YYYY年MM月DD日 HH时mm分"
          v-time="time"></span>
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
