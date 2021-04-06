<template>
  <div>
    <div style="height: 45px;">
      <m-slider v-model="value"
                :max="30"
                :min="0"
                :style="{marginLeft : '30px',  marginRight : '30px'}"
                @change="onChange"/>
    </div>
    <m-list>
      <m-slider-item :max="30"
                     :min="0"
                     :value="10"></m-slider-item>
      <m-slider-item :max="100"
                     :value="20"></m-slider-item>
    </m-list>
  </div>
</template>
<script lang="ts">
  import {defineComponent, ref} from 'vue';

  export default defineComponent({
    name: 'Demo1',
    setup(props, {emit, slots}) {
      const value = ref(1);


      const onChange = (value) => {
        console.log('value changed: ' + value);
      };


      return {
        value,
        onChange
      };
    }
  });
</script>
<style lang="less" scoped>
</style>
