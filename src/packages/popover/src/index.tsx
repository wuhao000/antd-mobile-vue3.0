import {Popover} from 'ant-design-vue';
import classNames from 'classnames';
import {defineComponent, PropType, ref, watch} from 'vue';


export default defineComponent({
  name: 'MPopover',
  props: {
    /**
     * 是否显示气泡（v-model）
     */
    visible: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    prefixCls: {
      type: String as PropType<string>,
      default: 'am-popover'
    },
    /**
     * 是否显示遮罩
     */
    mask: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    /**
     * 是否允许点击遮罩层关闭
     */
    maskClosable: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    placement: {
      type: String
    }
  },
  item: null,
  install: null,
  setup(props, {emit}) {
    const currentValue = ref(props.visible);
    watch(() => props.visible, (value: boolean) => {
      currentValue.value = value;
    });
    watch(() => currentValue.value, (currentValue: boolean) => {
      emit('update:visible', currentValue);
      emit('change', currentValue);
    });
    return {currentValue};
  },
  render() {
    const maskClass = classNames(`${this.prefixCls}-mask`, {
      [`${this.prefixCls}-mask-hidden`]: !this.currentValue
    });
    const slots = {
      content: this.$slots.content,
      default: () => {
        return <>
          {this.$slots.default?.()}
          {this.mask ? <div onClick={e => {
            if (!this.maskClosable) {
              e.stopPropagation();
              e.preventDefault();
            }
          }} class={maskClass}/> : null}
          </>;
      }
    };
    const popoverProps: any = {
      ...this.$attrs,
      prefixCls: this.prefixCls,
      'v-model': [this.currentValue, 'visible'],
      trigger: ['click']
    };
    return <Popover {...popoverProps}
                    v-slots={slots}/>;
  }
});
