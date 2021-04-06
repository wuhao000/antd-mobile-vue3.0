<template>
  <div class="home">
    <develop-doc/>
    <read-me/>
  </div>
</template>
<script lang="ts">
  import {defineComponent, onMounted, reactive} from 'vue';
  import ReadMe from '../documents/change-log/README.md';
  import DevelopDoc from '../documents/develop.md';
  import '../styles/github-markdown.less';

  export default defineComponent({
    name: 'Home',
    components: {
      ReadMe, DevelopDoc
    },
    setup(props, {emit, slots}) {
      const form = reactive({
        value: null
      });
      onMounted(() => {
        form.value = '2';
      });
      return {
        form
      };
    }
  });
</script>

