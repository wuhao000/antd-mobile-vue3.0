import { inject, provide, ref, Ref, reactive, nextTick, PropType, defineComponent } from 'vue';
<template>
  <div class="markdown-body"
       v-html="source">
  </div>
</template>
<script lang="ts">
  import {defineComponent} from 'vue';

  export default defineComponent({
    name: 'Markdown',
    props: {
      source: {type: String}
    }
  });
</script>
