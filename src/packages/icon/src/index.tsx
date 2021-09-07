import classNames from 'classnames';
import {defineComponent, isVNode, onMounted} from 'vue';
import loadSprite from './load-sprite';

const Icon = defineComponent({
  inheritAttrs: false,
  name: 'MIcon',
  props: {
    prefixCls: {
      type: String, default: 'am-icon'
    },
    size: {type: [String, Number], default: 'md'},
    type: {type: [String, Object], required: true},
    color: String
  },
  setup() {
    onMounted(() => {
      loadSprite();
    });
    return {};
  },
  render() {
    const {type, prefixCls, size, ...restProps} = this.$props;
    const cls = classNames(
      'am-icon',
      (typeof type === 'string') ? `am-icon-${type}` : undefined,
      `am-icon-${size}`,
      this.$attrs.class
    );
    const style: any = {};
    if (this.color) {
      style.color = this.color;
    }
    if (typeof this.size === 'number') {
      style.width = this.size + 'px';
      style.height = this.size + 'px';
    }
    if (typeof type === 'function' || isVNode(type)) {
      const IconComponent = type as any;
      return <IconComponent class={cls} style={style}/>;
    }
    return (
      <svg class={cls} style={style}
           {...{...restProps, ...this.$attrs}}>
        <use xlinkHref={`#${type}`}/>
      </svg>
    );
  }
});

export default Icon;
