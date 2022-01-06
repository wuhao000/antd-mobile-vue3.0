import classNames from 'classnames';
import {defineComponent, isVNode, PropType} from 'vue';
import Badge from '../../badge';
import Icon from '../../icon';

const Tab = defineComponent({
  inheritAttrs: false,
  name: 'Tab',
  props: {
    dot: {
      type: Boolean as PropType<boolean>
    },
    badge: {
      type: [String, Number] as PropType<string | number>
    },
    selected: {
      type: Boolean as PropType<boolean>
    },
    selectedIcon: {
      type: Object as PropType<any>
    },
    icon: {
      type: Object as PropType<any>
    },
    title: {
      type: String as PropType<string>
    },
    prefixCls: {
      type: String as PropType<string>,
      default: 'am-tab-item'
    },
    unselectedTintColor: {
      type: String as PropType<string>
    },
    tintColor: {
      type: String as PropType<string>
    },
    dataAttrs: {}
  },
  render() {
    const {
      prefixCls,
    } = this.$props;
    return (
      <div
        {...this.dataAttrs}
        {...this.$attrs}
        class={classNames(prefixCls)}>
        {this.$slots?.default?.()}
      </div>
    );
  }
});

export default Tab as any;
