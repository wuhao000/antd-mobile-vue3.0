<template>
  <div class="svg-container"
       style="font-size:10px;"
       v-html="html"
  ></div>
</template>
<script lang="ts">
  import {defineComponent} from 'vue';

  export default defineComponent({
    name: 'SrcHtml',
    props: {html: String, onClick: {}}
  });
</script>
<style lang="less">
  .svg-container {
    text-align: center;
    vertical-align: center;
    padding-top: 17px;
    border: 1px solid #ddd;
    border-radius: 3px;
    background-color: white;

    svg {
      width: 40px;
    }
  }
</style>
