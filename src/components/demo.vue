<template>
  <router-view/>
</template>
<script lang="ts">
  import {computed, defineComponent, ref} from 'vue';

  export default defineComponent({
    name: 'Components',
    setup(props, {emit, slots}) {
      const refreshing = ref(false);

      const component = computed(() => {
        return this.$route.query && this.$route.query['component'] as string;
      });
      const refresh = () => {
        refreshing.value = true;
        setTimeout(() => {
          refreshing.value = false;
        }, 2000);
      };


      return {
        refreshing,
        component,
        refresh
      };
    }
  });
</script>
<style lang="less" type="text/less">
  #app-content {
    padding: 0;
  }

  body, html {
    font-family: PingFang SC, Helvetica Neue, Hiragino Sans GB, Helvetica, Microsoft YaHei, Arial
  }

  .demo-preview-item {
    background: #f5f5f9;
  }
</style>
