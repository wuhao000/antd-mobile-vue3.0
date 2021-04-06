<template>
  <div>
    <m-button @click="switchAnimation('slideInDown')">切换动画</m-button>
    <ul :class="{[animation] : showAnimation}"
        :style="style"
        class="animated">
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
    </ul>
  </div>
</template>
<script lang="ts">
  import {computed, defineComponent, ref} from 'vue';

  export default defineComponent({
    name: 'Demo1',
    setup(props, {emit, slots}) {
      const animation = ref('');
      const showAnimation = ref(false);

      const style = computed(() => {
        return {
          background: 'darkseagreen',
          display: showAnimation.value ? 'block' : 'none',
          position: 'fixed',
          width: '100%',
          top: '50px'
        };
      });
      const switchAnimation = (animation) => {
        animation.value = animation;
        showAnimation.value = !showAnimation.value;
      };


      return {
        animation,
        showAnimation,
        style,
        switchAnimation
      };
    }
  });
</script>
<style lang="less" scoped>
  .animated {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }

  .slideInUp {
    -webkit-animation-name: slideInUp;
    animation-name: slideInUp;
  }

  @-webkit-keyframes slideInUp {
    from {
      -webkit-transform: translate3d(0, 100%, 0);
      transform: translate3d(0, 100%, 0);
      visibility: visible;
    }

    to {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes slideInDown {
    from {
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
      visibility: visible;
    }

    to {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
  }

  .slideInDown {
    -webkit-animation-name: slideInDown;
    animation-name: slideInDown;
  }
</style>
