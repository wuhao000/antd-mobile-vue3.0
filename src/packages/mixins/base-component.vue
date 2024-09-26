<template>
  <component :is="getInputComponent()"
             v-bind="p"
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
    setup(props, {emit, attrs, slots}) {
      const cssClass = computed(() => {
        return {};
      });
      const cssStyle = computed(() => {
        return {};
      });
      const p = computed(() => {
        return {
          ...getSlotProps(),
          ...attrs,
          ...props,
          ...getProps()
        };
      });
      const slotNames = computed(() => {
        return Object.keys(slots);
      });
      const getInputComponent = () => {
        return {};
      };
      const getProps = () => {
        return {};
      };
      const getSlotProps = () => {
        const props: any = {};
        Object.keys(slots).forEach((slotKey: string) => {
          if (slotKey !== 'default') {
            props[slotKey] = slots[slotKey];
          }
        });
        return props;
      };


      return {
        cssClass,
        cssStyle,
        p,
        slotNames,
        getInputComponent,
        getProps,
        getSlotProps
      };
    }
  });
</script>
