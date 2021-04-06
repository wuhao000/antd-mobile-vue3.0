<template>
  <div style="height:100%">
    <m-pull-refresh :value="refreshing"
                    activate-text="松开刷新"
                    deactivateText="取消刷新"
                    finishText="刷新完成"
                    @refresh="refresh">
      <ul>
        <li v-for="i in 100"
            :key="i">
          111
        </li>
      </ul>
    </m-pull-refresh>
  </div>
</template>
<script lang="ts">
  import {defineComponent, ref} from 'vue';

  export default defineComponent({
    name: 'Components',
    setup(props, {emit, slots}) {
      const refreshing = ref(false);


      const refresh = () => {
        refreshing.value = true;
        setTimeout(() => {
          refreshing.value = false;
        }, 2000);
      };


      return {
        refreshing,
        refresh
      };
    }
  });
</script>
<style lang="less" type="text/less">
</style>
