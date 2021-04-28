import {filterHTMLAttrs} from '../../utils/dom';
import classnames from 'classnames';
import {defineComponent, PropType} from 'vue';

export default defineComponent({
  inheritAttrs: false,
  name: 'FlexItem',
  props: {
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    prefixCls: {
      type: String as PropType<string>,
      default: 'am-flexbox'
    }
  },
  render() {
    const {prefixCls, ...restProps} = this.$props;
    const wrapCls = classnames(`${prefixCls}-item`, this.$attrs.class);
    const props = {
      ...restProps,
      ...this.$attrs,
      onClick: (e) => {
        e.stopPropagation();
        this.$emit('click', e);
      }
    };
    return (
      <div class={wrapCls}
           {...filterHTMLAttrs(props)}>
        {this.$slots.default?.()}
      </div>
    );
  }
});
