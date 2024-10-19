import { defineComponent, PropType } from 'vue';
import RmcDrawer from '../../vmc-drawer';

const Drawer = defineComponent({
  install: null,
  name: 'MDrawer',
  props: {
    /**
     * 抽屉内容容器样式
     */
    sidebarStyle: {
      type: Object as PropType<any>
    },
    contentStyle: {
      type: Object as PropType<any>
    },
    overlayStyle: {
      type: Object as PropType<any>
    },
    dragHandleStyle: {
      type: Object as PropType<any>
    },
    docked: {
      type: Boolean as PropType<boolean>
    },
    transitions: {
      type: Boolean as PropType<boolean>
    },
    touch: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    dragToggleDistance: {
      type: Number as PropType<number>
    },
    prefixCls: {
      type: String as PropType<string>,
      default: 'am-drawer'
    },
    sidebar: {
      type: Object
    },
    open: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    position: {
      type: String as PropType<'left' | 'right' | 'top' | 'bottom'>,
      default: 'left'
    }
  },
  render() {
    const props = {
      ...this.$props,
      ...this.$attrs,
      sidebar: this.$slots.sidebar?.() ?? this.sidebar,
      open: this.open,
      onOpen: value => {
        this.$emit('update:open', value);
      }
    };
    return <RmcDrawer {...props}>
      {this.$slots.default?.()}
    </RmcDrawer>;
  }
});

export default Drawer;
