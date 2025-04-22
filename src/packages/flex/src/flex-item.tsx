import classnames from 'classnames';
import {defineComponent, PropType} from 'vue';
import {filterHTMLAttrs} from '../../utils/dom';

export default defineComponent({
  inheritAttrs: false,
  name: 'MFlexItem',
  props: {
    onClick: {},
    disabled: {
      type: Boolean,
      default: false
    },
    prefixCls: {
      type: String,
      default: 'am-flexbox'
    }
  },
  render() {
    const {prefixCls, ...restProps} = this.$props;
    const wrapCls = classnames(`${prefixCls}-item`, this.$attrs.class as string | Record<string, string>);
    const props = {
      ...restProps,
      ...this.$attrs,
      onClick: (e) => {
        e.stopPropagation();
        this.$emit('click', e);
      }
    };
    return (
      <div
        {...filterHTMLAttrs(props)}
        class={wrapCls}
        onClick={(e) => {
          this.$emit('click', e);
        }}>
        {this.$slots.default?.()}
      </div>
    );
  }
});
