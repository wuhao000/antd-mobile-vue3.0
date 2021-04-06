<template>
  <div class="mobile-screen">
    <slot/>
  </div>
</template>
<script lang="ts">
  import {defineComponent} from 'vue';

  export default defineComponent({
    name: 'MobileScreen'
  });
</script>
<style lang="less">
  .mobile-screen {
    height: 640px;
    width: 480px;
    overflow: auto;
  }
</style>
