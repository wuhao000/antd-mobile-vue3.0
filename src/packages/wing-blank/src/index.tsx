import classnames from 'classnames';
import {defineComponent, PropType} from 'vue';

export default defineComponent({
  name: 'MWingBlank',
  props: {
    prefixCls: {
      type: String as PropType<string>,
      default: 'am-wingblank'
    },
    size: {
      default: 'lg'
    }
  },
  install: null,
  render() {
    const {prefixCls, size} = this.$props;
    const wrapCls = classnames(prefixCls, `${prefixCls}-${size}`);
    return (
      <div class={wrapCls}>
        {this.$slots.default()}
      </div>
    );
  }
});
