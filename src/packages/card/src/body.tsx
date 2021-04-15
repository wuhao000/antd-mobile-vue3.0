import classnames from 'classnames';
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'MCardBody',
  props: {
    prefixCls: {default: 'am-card'}
  },
  render() {
    const {prefixCls} = this.$props;
    const wrapCls = classnames(`${prefixCls}-body`);
    return <div class={wrapCls}>{this.$slots.default?.()}</div>;
  }
});
