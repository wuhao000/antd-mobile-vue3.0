<template>
  <div class="home">
    <read-me></read-me>
  </div>
</template>
<script lang="ts">
  import {defineComponent} from 'vue';
  import '../styles/github-markdown.less';
  import ReadMe from './../../README.md';

  export default defineComponent({
    name: 'Home',
    components: {ReadMe},
    setup(props, {emit, slots}) {
      return {};
    }
  });
</script>

