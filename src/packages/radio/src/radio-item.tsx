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
    readOnly: Boolean,
    value: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  emits: ['change', 'click'],
  setup(props, {emit}) {
    const onClick = (e) => {
      if (!props.disabled && !props.readOnly) {
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
      readOnly,
      radioProps,
      ...otherProps
    } = this.$props;
    const {prefixCls} = otherProps;
    const wrapCls = classnames(`${prefixCls}-item`, {
      [`${prefixCls}-item-disabled`]: disabled === true,
      [`${prefixCls}-item-selected`]: this.value === true,
      [`${prefixCls}-item-readonly`]: readOnly === true
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
        class={wrapCls}>
        <div class={prefixCls + '-icon'}>
          <svg viewBox="0 0 40 40">
            <path
              d="M20,9 C26.0752953,9 31,13.9247047 31,20 C31,26.0752953 26.0752953,31 20,31 C13.9247047,31 9,26.0752953 9,20 C9,13.9247047 13.9247047,9 20,9 Z"
              fill="currentColor"></path>
          </svg>
        </div>
        {this.$slots.default?.()}
      </List.Item>
    );
  }
});

