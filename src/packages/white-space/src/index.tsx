import classnames from 'classnames';
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'MWhiteSpace',
  props: {
    size: {type: String, default: 'md'},
    prefixCls: {type: String, default: 'am-whitespace'}
  },
  render() {
    const wrapCls = classnames(this.prefixCls, `${this.prefixCls}-${this.size}`);

    return <div class={wrapCls}
                onClick={e => {
                  this.$emit('click', e);
                }}/>;
  }
});
