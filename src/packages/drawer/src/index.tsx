import { CSSProperties, defineComponent, PropType } from 'vue';
import RmcDrawer from '../../vmc-drawer';

const Drawer = defineComponent({
  install: null,
  name: 'MDrawer',
  props: {
    /**
     * 抽屉内容容器样式
     */
    sidebarStyle: {
      type: Object as PropType<CSSProperties>
    },
    contentStyle: {
      type: Object as PropType<CSSProperties>
    },
    overlayStyle: {
      type: Object as PropType<CSSProperties>
    },
    dragHandleStyle: {
      type: Object as PropType<CSSProperties>
    },
    docked: {
      type: Boolean
    },
    transitions: {
      type: Boolean
    },
    touch: {
      type: Boolean,
      default: true
    },
    dragToggleDistance: {
      type: Number
    },
    prefixCls: {
      type: String,
      default: 'am-drawer'
    },
    sidebar: {
      type: Object
    },
    open: {
      type: Boolean,
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
