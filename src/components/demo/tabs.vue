<template>
  <div style="height:100%">
    <m-tabs :tabs="[{title:'标签1'}, {title:'标签2'}]"
            style="height:100%;"
            tab-bar-position="top"
            tab-direction="horizontal"
            tabBarActiveTextColor="red">
      <m-pull-refresh v-model="loading">
        <div class="m-t-b"
             style="display: flex; flex: 1;flex-direction: column">
          <div v-for="i in 100"
               :key="i">
            这是第一块内容
          </div>
        </div>
      </m-pull-refresh>
      <m-pull-refresh v-model="loading">
        <div style="display: flex;flex: 1;flex-direction: column">
          <div v-for="i in 100"
               :key="i">
            这是第二块内容
          </div>
        </div>
      </m-pull-refresh>
    </m-tabs>
  </div>
</template>
<script lang="ts">
  import {defineComponent, Ref, ref, watch} from 'vue';

  export default defineComponent({
    name: 'Components',
    setup(props, {emit, slots}) {
      const loading: Ref<boolean> = ref(false);
      watch(() => loading.value, () => {
        setTimeout(() => {
          loading.value = false;
        }, 3000);
      });
      return {
        loading
      };
    }
  });
</script>
<style lang="less" type="text/less">
</style>
