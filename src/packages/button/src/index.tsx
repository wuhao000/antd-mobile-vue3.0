import classnames from 'classnames';
import {defineComponent} from 'vue';
import Icon from '../../icon';
import {filterHTMLAttrs} from '../../utils/dom';
import TouchFeedback from '../../vmc-feedback';

const rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);

function isString(str: any) {
  return typeof str === 'string';
}

export default defineComponent({
  install: null,
  inheritAttrs: false,
  name: 'MButton',
  props: {
    onClick: {},
    prefixCls: {type: String, default: 'am-button'},
    role: {type: String},
    inline: {type: Boolean, default: false},
    icon: {type: [String, Object, Function]},
    activeClassName: {type: String},
    activeStyle: {
      type: [Boolean, Object],
      default: () => {
        return {};
      }
    },
    type: {type: String},
    size: {type: String, default: 'large'},
    disabled: {type: Boolean, default: false},
    loading: {type: Boolean, default: false}
  },
  setup(props, {emit, slots}) {
    const insertSpace = (child: any) => {
      if (isString(child.text) && isTwoCNChar(child.text)) {
        return <span>{child.text.split('').join(' ')}</span>;
      }
      return child;
    };
    return {
      insertSpace
    };
  },
  render() {
    const {
      prefixCls,
      type,
      size,
      inline,
      disabled,
      icon,
      loading,
      activeStyle,
      activeClassName
    } = this.$props;

    const iconType: any = loading ? 'loading' : icon;
    const wrapCls = classnames(prefixCls, {
      [`${prefixCls}-primary`]: type === 'primary',
      [`${prefixCls}-ghost`]: type === 'ghost',
      [`${prefixCls}-warning`]: type === 'warning',
      [`${prefixCls}-small`]: size === 'small',
      [`${prefixCls}-inline`]: inline,
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-loading`]: loading,
      [`${prefixCls}-icon`]: !!iconType
    }, this.$attrs.class);
    const kids = this.$slots.default ? this.$slots.default().map(this.insertSpace) : '';

    const iconEl = iconType ? <Icon type={iconType}
                                    class={`${prefixCls}-icon`}
                                    size={'small' ? 'xxs' : 'md'}/> : null;
    return (
      <TouchFeedback
        activeClassName={activeClassName || (activeStyle ? `${prefixCls}-active` : undefined)}
        disabled={disabled}
        activeStyle={activeStyle}>
        <a role="button"
           {...filterHTMLAttrs(this.$attrs)}
           class={wrapCls}
           onClick={(e) => {
             if (!this.disabled) {
               this.$emit('click', e);
             }
           }}
           aria-disabled={disabled}>
          {iconEl}
          {kids}
        </a>
      </TouchFeedback>
    );
  }
});
