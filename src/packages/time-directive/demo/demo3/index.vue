<template>
  <div class="demo">
    <div v-time.pretty="time1"
         class="m-t-b">
    </div>
    <div v-time.pretty="time2"
         class="m-t-b">
    </div>
    <div v-time.pretty="time3"
         class="m-t-b">
    </div>
  </div>
</template>
<script lang="ts">
  import {defineComponent, ref} from 'vue';

  export default defineComponent({
    name: 'Demo1',
    setup(props, {emit, slots}) {
      const time1 = ref(new Date().getTime() - 60 * 12 * 1000);
      const time2 = ref(new Date().getTime() - 60 * 65 * 1000);
      const time3 = ref(new Date().getTime() - 60 * 60 * 1000 * 24 * 365);


      return {
        time1,
        time2,
        time3
      };
    }
  });
</script>
