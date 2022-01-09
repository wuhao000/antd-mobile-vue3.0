import classNames from 'classnames';
import {computed, defineComponent, getCurrentInstance, isVNode, PropType} from 'vue';
import Icon from '../../icon';

function isString(str) {
  return typeof str === 'string';
}

const statusIcon = {
  finish: 'check-circle',
  error: 'cross-circle-o',
  wait: 'ellipsis'
};
export default defineComponent({
  name: 'MStep',
  props: {
    prefixCls: {
      type: String as PropType<string>,
      default: 'am-steps'
    },
    wrapperStyle: {},
    itemWidth: {
      type: [Number, String] as PropType<number | string>
    },
    status: {
      type: String as PropType<'wait' | 'process' | 'finish' | 'error'>
    },
    iconPrefix: {
      type: String as PropType<string>,
      default: 'ant'
    },
    /**
     * 图标类型，仅支持的图标名称
     */
    icon: {
      type: [String, Object] as PropType<string | object>
    },
    adjustMarginRight: {
      type: [Number, String] as PropType<number | string>
    },
    stepNumber: {
      type: Number as PropType<number>
    },
    description: {
      type: String as PropType<string>
    },
    title: {
      type: String as PropType<string>
    },
    progressDot: {}
  },
  setup(props, {slots}) {
    const instance = getCurrentInstance();
    const iconSize = computed(() => {
      if (instance.parent.props.size === 'small') {
        return 18;
      } else {
        return 22;
      }
    });
    const renderIconNode = () => {
      const {
        prefixCls, progressDot, stepNumber, status, title, description, icon,
        iconPrefix
      } = props;
      if (slots.icon) {
        return <span class={`${prefixCls}-icon`}>{slots.icon?.()}</span>;
      }
      let iconNode;
      const iconClassName = classNames(`${prefixCls}-icon`, `${iconPrefix}icon`, {
        [`${iconPrefix}icon-${icon}`]: icon && isString(icon),
        [`${iconPrefix}icon-check`]: !icon && status === 'finish',
        [`${iconPrefix}icon-cross`]: !icon && status === 'error'
      });
      const iconStyle = {
        position: 'relative',
        left: '-1px'
      };
      const iconDot = <span class={`${prefixCls}-icon-dot`}/>;
      // `progressDot` enjoy the highest priority
      if (progressDot) {
        if (typeof progressDot === 'function') {
          iconNode = (
              <span class={`${prefixCls}-icon`}>
                {progressDot(iconDot, {index: stepNumber! - 1, status, title, description})}
              </span>
          );
        } else {
          iconNode = <span class={`${prefixCls}-icon`}>{iconDot}</span>;
        }
      } else if (icon && isString(icon)) {
        iconNode = <span class={`${prefixCls}-icon`}>{
          <Icon style={iconStyle}
                size={iconSize.value}
                type={icon}/>
        }</span>;
      } else if (isVNode(icon)) {
        iconNode = <span class={iconClassName}>{icon}</span>;
      } else if (status === 'finish' || status === 'error') {
        iconNode = <span class={iconClassName}/>;
      } else {
        iconNode = <span class={`${prefixCls}-icon`}>{stepNumber}</span>;
      }
      return iconNode;
    };
    const renderTitle = () => {
      if (!(slots.title || props.title)) {
        return undefined;
      }
      return <div class={`${props.prefixCls}-item-title`}>
        {
            slots.title?.() ?? props.title
        }
      </div>;
    };
    return {
      renderIconNode,
      renderTitle
    };
  },
  render() {
    const {
      prefixCls, itemWidth,
      status = 'wait', icon,
      adjustMarginRight,
      description, title
    } = this.$props;
    const classString = classNames(
        `${prefixCls}-item`,
        `${prefixCls}-item-${status}`,
        this.$attrs.class,
        {[`${prefixCls}-item-custom`]: icon}
    );
    const stepItemStyle: any = {};
    if (itemWidth) {
      stepItemStyle.width = itemWidth;
    }
    if (adjustMarginRight) {
      stepItemStyle.marginRight = adjustMarginRight;
    }
    return (
        <div
            {...this.$attrs}
            class={classString}
            style={stepItemStyle}>
          <div class={`${prefixCls}-item-tail`}/>
          <div class={`${prefixCls}-item-icon`}>
            {this.renderIconNode()}
          </div>
          <div class={`${prefixCls}-item-content`}>
            {
              this.renderTitle()
            }
            {(description || this.$slots.description) && <div class={`${prefixCls}-item-description`}>{
                this.$slots?.description?.() ?? description
            }</div>}
          </div>
        </div>
    );
  }
});
