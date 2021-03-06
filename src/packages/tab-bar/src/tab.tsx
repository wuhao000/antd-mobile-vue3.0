import classNames from 'classnames';
import {defineComponent, isVNode, PropType} from 'vue';
import Badge from '../../badge';
import Icon from '../../icon';

const Tab = defineComponent({
  inheritAttrs: false,
  name: 'Tab',
  props: {
    dot: {
      type: Boolean as PropType<boolean>
    },
    badge: {
      type: [String, Number] as PropType<string | number>
    },
    selected: {
      type: Boolean as PropType<boolean>
    },
    selectedIcon: {
      type: Object as PropType<any>
    },
    icon: {
      type: Object as PropType<any>
    },
    title: {
      type: String as PropType<string>
    },
    prefixCls: {
      type: String as PropType<string>,
      default: 'am-tab-item'
    },
    unselectedTintColor: {
      type: String as PropType<string>
    },
    tintColor: {
      type: String as PropType<string>
    },
    dataAttrs: {}
  },
  setup(props, {emit, slots}) {
    const renderIcon = () => {
      const {
        dot,
        badge,
        selected,
        selectedIcon,
        icon,
        title,
        prefixCls
      } = props;
      const realIcon: any = selected ? selectedIcon : icon;
      const iconDom = realIcon ? (
        isVNode(realIcon) ? realIcon : <Icon
          class={`${prefixCls}-image`}
          type={realIcon}
        />
      ) : null;
      if (badge) {
        return (
          <Badge text={badge} class={`${prefixCls}-badge tab-badge`}>
            {' '}
            {iconDom}{' '}
          </Badge>
        );
      }
      if (dot) {
        return (
          <Badge dot class={`${prefixCls}-badge tab-dot`}>
            {iconDom}
          </Badge>
        );
      }
      return iconDom;
    };
    return {
      renderIcon
    };
  },
  render() {
    const {
      title,
      prefixCls,
      selected,
      unselectedTintColor,
      tintColor
    } = this.$props;
    const iconColor = selected ? tintColor : unselectedTintColor;
    return (
      <div
        {...this.dataAttrs}
        {...this.$attrs}
        class={classNames(prefixCls)}>
        <div class={`${prefixCls}-icon`} style={{color: iconColor}}>
          {this.renderIcon()}
        </div>
        <p class={`${prefixCls}-title`}
           style={{color: selected ? tintColor : unselectedTintColor}}
        >
          {title}
        </p>
      </div>
    );
  }
});

export default Tab as any;
