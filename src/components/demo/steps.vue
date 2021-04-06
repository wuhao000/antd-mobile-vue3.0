<template>
  <div style="height:100%">
    <m-steps>
      <m-step>
        <a-icon slot="icon"
                 type="check"></a-icon>
      </m-step>
      <m-step>
        <img slot="icon"
             class="avatar avatar--icon"
             src="http://p.qpic.cn/wwhead/nMl9ssowtibVGyrmvBiaibzDkbTTtujEz586TdUkcdV2UE4N0Zq780loXUkq1Ua5lYkfI2Sluibm11I/0">
      </m-step>
    </m-steps>
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
