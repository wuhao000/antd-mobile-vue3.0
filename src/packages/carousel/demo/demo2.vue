<template>
  <m-wing-blank>
    <m-button @click="onClick">Click me to add child</m-button>
    <m-white-space/>
    <m-carousel :after-change="afterChange"
                :autoplay="false"
                :beforeChange="beforeChange"
                :selectedIndex="state.slideIndex" infinite>
      <a v-for="(val, index) in state.data"
         :key="index"
         :style="{ display : 'inline-block', width : '100%', height : state.imgHeight }">
        <img :src="`https://zos.alipayobjects.com/rmsportal/${val}.png`"
             :style="{width : '100%', verticalAlign : 'top' }"
             alt=""/>
      </a>
    </m-carousel>
  </m-wing-blank>
</template>
<script lang="ts">
import {defineComponent} from 'vue';
import {useBaseDemo} from './base';

export default defineComponent({
  name: 'CarouselDemo2',
  setup() {
    const {state, onLoad} = useBaseDemo();
    const onClick = () => {
      state.data = state.data.concat(['AiyWuByWklrrUDlFignR']);
      console.log(state.data);
    };
    return {
      onClick,
      beforeChange() {
      },
      afterChange() {
      },
      onLoad, state
    };
  }
});
</script>
