<template>
  <div>
    <m-grid :data="data"
            @click="itemClicked">
    </m-grid>
  </div>
</template>
<script lang="ts">
  import {defineComponent} from 'vue';
  import {useRouter} from 'vue-router';
  import Components from '../../packages/map.json';



  console.log(Components);

  export default defineComponent({
    name: 'MobileDemoHome',
    setup() {
      const data = Object.keys(Components).map(it => ({
        icon: 'check-circle',
        text: Components[it].chineseName,
        route: 'm-' + it
      }));
      const router = useRouter();
      return {
        data,
        itemClicked(item) {
          router.push({
            name: item.route
          });
        }
      };
    }
  });
</script>
<style lang="less">
</style>
