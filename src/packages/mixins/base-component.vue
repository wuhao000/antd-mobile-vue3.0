<template>
  <component :is="getInputComponent()"
             v-bind="props"
             v-on="listeners"
             :class="cssClass"
             :style="cssStyle">
    <slot v-for="slot in slotNames"
          v-if="slot !== 'default'"
          :slot="slot"
          :name="slot"/>
    <slot/>
  </component>
</template>
<script lang="ts">
  import { computed, inject, provide, ref, Ref, reactive, nextTick, PropType, defineComponent } from 'vue';import { Options, Vue } from 'vue-class-component';
  export default defineComponent({
    name: 'BaseComponent',
    setup(props, {emit, slots}) {


      const cssClass = computed(() => {
        return {};
      });
      const cssStyle = computed(() => {
        return {};
      });
      const listeners = computed(() => {
        return {};
      });
      const props = computed(() => {
        return {
          ...getSlotProps(),
          ...this.$attrs,
          ...props,
          ...getProps()
        };
      });
      const slotNames = computed(() => {
        return Object.keys(this.$slots);
      });
      const getInputComponent = () => {
        return {};
      };
      const getProps = () => {
        return {};
      };
      const getSlotProps = () => {
        const props: any = {};
        Object.keys(this.$slots).forEach((slotKey: string) => {
          if (slotKey !== 'default') {
            props[slotKey] = this.$slots[slotKey];
          }
        });
        return props;
      };


      return {
        cssClass,
        cssStyle,
        listeners,
        props,
        slotNames,
        getInputComponent,
        getProps,
        getSlotProps
      };
    }
  });
</script>
