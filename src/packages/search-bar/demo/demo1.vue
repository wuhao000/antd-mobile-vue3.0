<template>
  <div>
    <m-search-bar v-model:value="value"/>
    <m-white-space/>
    <m-search-bar placeholder='请输入内容'
                  show-cancel-button/>
  </div>
</template>
<script lang="ts">
import {defineComponent, Ref, ref} from 'vue';
import MWhiteSpace from '../../white-space/src';
import SearchBar from '../index';

export default defineComponent({
  name: 'Demo1',
  components: {
    MWhiteSpace,
    MSearchBar: SearchBar
  },
  setup(props, {emit, slots}) {
    const value: Ref<string> = ref('');
    return {
      value
    };
  }
});
</script>
<style lang="less" scoped>
</style>
