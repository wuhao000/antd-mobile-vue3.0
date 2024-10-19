<template>
  <div class="home markdown-body"
       v-html="changeLog" />
</template>
<script lang="ts">
  import {defineComponent} from 'vue';
  import { html as changeLog } from '../documents/change-log/index.md';
  import '../styles/github-markdown.less';

  export default defineComponent({
    name: 'Home',
    setup() {
      return {
        changeLog
      };
    }
  });
</script>

