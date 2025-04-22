import classNames from 'classnames';
import {defineComponent, isVNode, PropType} from 'vue';
import Badge from '../../badge';
import Icon from '../../icon';

const Tab = defineComponent({
  inheritAttrs: false,
  name: 'Tab',
  props: {
    dot: {
      type: Boolean
    },
    badge: {
      type: [String, Number] as PropType<string | number>
    },
    selected: {
      type: Boolean
    },
    selectedIcon: {
      type: Object as PropType<any>
    },
    icon: {
      type: Object as PropType<any>
    },
    title: {
      type: String
    },
    prefixCls: {
      type: String,
      default: 'am-tab-item'
    },
    unselectedTintColor: {
      type: String
    },
    tintColor: {
      type: String
    },
    dataAttrs: {
      type: Object
    }
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
