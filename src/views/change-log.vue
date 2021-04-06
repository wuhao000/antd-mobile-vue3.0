<template>
  <div class="home">
    <chang-log></chang-log>
  </div>
</template>
<script lang="ts">
  import {defineComponent} from 'vue';
  import ChangLog from '../documents/change-log/index.md';
  import '../styles/github-markdown.less';

  export default defineComponent({
    name: 'Home',
    components: {
      ChangLog
    },
    setup(props, {emit, slots}) {
      return {};
    }
  });
</script>

