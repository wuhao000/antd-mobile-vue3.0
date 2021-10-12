import classNames from 'classnames';
import {defineComponent, onMounted, PropType, provide, reactive, VNode, watch} from 'vue';
import {filterHTMLAttrs} from '../../utils/dom';
import {unwrapFragment} from '../../utils/vue';

export default defineComponent({
  name: 'MSteps',
  props: {
    icon: {
      type: [String, Object] as PropType<string | object>
    },
    prefixCls: {
      type: String as PropType<string>,
      default: 'am-steps'
    },
    iconPrefix: {
      type: String as PropType<string>,
      default: 'ant'
    },
    direction: {
      type: String as PropType<string>,
      default: 'vertical'
    },
    labelPlacement: {
      type: String as PropType<string>,
      default: 'vertical'
    },
    status: {
      type: String as PropType<'wait' | 'process' | 'finish' | 'error'>,
      default: 'process'
    },
    size: {
      type: String as PropType<'small' | 'default'>,
      default: 'small'
    },
    progressDot: {
      type: Boolean as PropType<boolean | any>,
      default: false
    },
    current: {
      type: Number as PropType<number>,
      default: 0
    }
  },
  render() {
    const {
      prefixCls, direction,
      labelPlacement, iconPrefix, status, size, current, progressDot
    } = this.$props;
    const adjustedLabelPlacement = !!progressDot ? 'vertical' : labelPlacement;
    const classString = classNames(prefixCls, `${prefixCls}-${direction}`, {
      [`${prefixCls}-${size}`]: size,
      [`${prefixCls}-label-${adjustedLabelPlacement}`]: direction === 'horizontal',
      [`${prefixCls}-dot`]: !!progressDot
    });
    const children = unwrapFragment(this.$slots.default?.())
    if (!children) {
      return (
        <div
          {...filterHTMLAttrs(this.$attrs)}
          class={classString}/>
      );
    }
    const content = children.map((child: VNode, index) => {
      if (!child) {
        return null;
      }
      const childProps = {
        stepNumber: index + 1,
        prefixCls,
        iconPrefix,
        icon: child.props?.icon || '',
        wrapperStyle: {},
        progressDot,
        status: child.props?.status || '',
        class: ''
      };
      let icon: any = childProps.icon;
      if (!icon) {
        if (index < current) {
          // 对应 state: finish
          icon = 'check-circle-o';
        } else if (index > current) {
          // 对应 state: wait
          icon = 'ellipsis';
          childProps.class = 'ellipsis-item';
        }
        if ((status === 'error' && index === current) || child.props?.status === 'error') {
          icon = 'cross-circle-o';
        }
      }
      if (icon) {
        childProps.icon = icon;
      }
      // fix tail color
      if (status === 'error' && index === current! - 1) {
        childProps.class = `${prefixCls}-next-error`;
      }
      if (!child.props?.status) {
        if (index === current) {
          childProps.status = status;
        } else if (index < current!) {
          childProps.status = 'finish';
        } else {
          childProps.status = 'wait';
        }
      }
      if (child.props) {
        Object.keys(childProps).forEach(key => {
          child.props[key] = childProps[key];
        });
      } else {
        child.props = childProps;
      }
      return child;
    });
    return (
      <div
        {...filterHTMLAttrs(this.$attrs)}
        class={classString}>
        {content}
      </div>
    );
  }
});
