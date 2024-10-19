<template>
  <div class="home">
    <div
      class="markdown-body"
      v-html="readMe" />
  </div>
</template>
<script lang="ts">
  import {defineComponent} from 'vue';
  import '../styles/github-markdown.less';
  import { html as readMe } from './../../README.md';

  export default defineComponent({
    name: 'Home',
    setup() {
      return {
        readMe
      };
    }
  });
</script>

