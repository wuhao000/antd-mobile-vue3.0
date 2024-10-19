<template>
  <div class="home">
    <div
      class="markdown-body"
      v-html="developDoc" />
    <div
      class="markdown-body"
      v-html="readMe" />
  </div>
</template>
<script lang="ts">
  import {defineComponent, onMounted, reactive} from 'vue';
  import { html as readMe } from '../documents/change-log/README.md';
  import { html as developDoc } from '../documents/develop.md';
  import '../styles/github-markdown.less';

  export default defineComponent({
    name: 'Home',
    setup(props, {emit, slots}) {
      const form = reactive({
        value: null
      });
      onMounted(() => {
        form.value = '2';
      });
      return {
        form,
        readMe,
        developDoc
      };
    }
  });
</script>

