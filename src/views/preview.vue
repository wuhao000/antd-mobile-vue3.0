<template>
  <div>
    <slot/>
    <slot name="code"/>
  </div>
</template>
<script lang="ts">
  import {defineComponent} from 'vue';

  export default defineComponent({
    props: {
      lang: String,
      theme: String
    },
    setup(props) {
      console.log('abc', props.lang, props.theme)
      return {};
    }
  });
</script>
