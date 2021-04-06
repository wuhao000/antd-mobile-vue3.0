<template>
  <div>
    <m-list>
      <m-switch-item title="abc"/>
      <m-list-item>
        <m-switch/>
      </m-list-item>
      <m-list-item>
        <m-switch platform="android"/>
      </m-list-item>
      <m-list-item>
        <m-switch color="#108ee9"/>
      </m-list-item>
      <m-list-item>
        <m-switch v-model:value="value"/>
        {{ value }}
      </m-list-item>
      <m-switch-item v-model="value"
                     title="开关"></m-switch-item>
    </m-list>
  </div>
</template>
<script lang="ts">
  import {defineComponent, ref} from 'vue';

  export default defineComponent({
    name: 'Demo1',
    setup(props, {emit, slots}) {
      const value = ref(false);


      return {
        value
      };
    }
  });
</script>
