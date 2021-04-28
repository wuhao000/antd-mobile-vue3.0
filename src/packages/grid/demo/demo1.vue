<template>
  <div>
    <m-grid :cols="3"
            :data="data2"
            carousel
            @click="itemClicked"></m-grid>
    <m-white-space/>
    <m-grid :cols="3"
            :data="data2"
            @click="itemClicked"></m-grid>
  </div>
</template>
<script lang="ts">
  import {computed, defineComponent, ref} from 'vue';

  export default defineComponent({
    name: 'Demo1',
    setup() {
      const data = ref([
        {icon: {mobile: true, type: 'check-circle', size: 'md'}, text: ''},
        {icon: 'check-circle', text: 'abc'},
        {icon: 'check-circle', text: 'abc'},
        {icon: 'check-circle', text: 'abc'},
        {icon: 'check-circle', text: 'abc'},
        {icon: 'check-circle', text: 'abc'},
        {icon: 'check-circle', text: 'abc'}
      ]);

      const data2 = computed(() => {
        const array = [];
        for (let i = 0; i < 20; i++) {
          array.push({icon: {color: 'green', mobile: false, type: 'check-circle', size: 'md'}, text: '项目' + (i + 1)});
        }
        return array;
      });
      const itemClicked = (v, b, c) => {
        console.log('item clicked: ', v, b, c);
      };
      return {
        data,
        data2,
        itemClicked
      };
    }
  });
</script>
