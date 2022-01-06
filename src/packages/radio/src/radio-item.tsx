import classnames from 'classnames';
import {defineComponent, PropType} from 'vue';
import List from '../../list';
import Radio from './radio';
import {filterHTMLAttrs} from "../../utils/dom";

export default defineComponent({
  name: 'MRadioItem',
  inheritAttrs: false,
  props: {
    prefixCls: {
      default: 'am-radio'
    },
    listPrefixCls: {
      default: 'am-list-item'
    },
    radioProps: {
      default: () => {
        return {};
      }
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    value: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  emits: ['change', 'click'],
  setup(props, {emit}) {
    const onClick = (e) => {
      if (!props.disabled) {
        emit('click', e);
        emit('change', !props.value);
      }
    };
    return {
      onClick
    };
  },
  render() {
    const {
      listPrefixCls,
      disabled,
      radioProps,
      ...otherProps
    } = this.$props;
    const {prefixCls} = otherProps;
    const wrapCls = classnames(`${prefixCls}-item`, {
      [`${prefixCls}-item-disabled`]: disabled === true,
      [`${prefixCls}-item-selected`]: this.value === true
    });

    const extraProps: any = {};
    ['name', 'disabled'].forEach(i => {
      if (i in this.$props) {
        extraProps[i] = (this.$props as any)[i];
      }
    });
    const extra = <Radio
      {
        ...{
          ...radioProps,
          ...extraProps
        }
      }
      value={this.value}
    />;
    return (
      <List.Item
        {
          ...{...otherProps, ...filterHTMLAttrs(this.$attrs)}
        }
        touchFeedback={!this.disabled && !this.value}
        onClick={this.onClick}
        prefixCls={listPrefixCls}
        class={wrapCls}
        suffix={extra}>
        {this.$slots.default?.()}
      </List.Item>
    );
  }
});

