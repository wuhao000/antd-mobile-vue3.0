<template>
  <div style="margin: 10px 0;">
    <m-accordion :defaultActiveKey="0"
                 class="my-accordion"
                 @change="onChange">
      <m-accordion-panel header="Title 1">
        <m-list class="my-list">
          <m-list-item>content 1</m-list-item>
          <m-list-item>content 2</m-list-item>
          <m-list-item>content 3</m-list-item>
        </m-list>
      </m-accordion-panel>
      <m-accordion-panel class="pad"
                         header="Title 2">this is panel content2 or other
      </m-accordion-panel>
      <m-accordion-panel class="pad"
                         header="Title 3">
        text text text text text text text text text text text text text text text
      </m-accordion-panel>
    </m-accordion>
  </div>
</template>
<script lang="ts">
  import {defineComponent} from 'vue';
  import List from '../../list';
  import Accordion from '../index';

  export default defineComponent({
    name: 'MobileAccordionDemo1',
    components: {
      MAccordion: Accordion,
      MList: List,
      MListItem: List.Item
    },
    setup(props, {emit, slots}) {


      const onChange = (key) => {
        console.log(key);
      };
      return {
        onChange
      };
    }
  });
</script>
<style lang="less">
  .my-accordion .pad .am-accordion-content-box {
    padding: 10px;
  }
</style>
