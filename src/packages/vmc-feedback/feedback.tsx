import {unwrapFragment} from '../utils/vue';
import {defineComponent, onUpdated, Ref, ref, VNode} from 'vue';

export default defineComponent({
  name: 'TouchFeedback',
  props: {
    disabled: {type: Boolean, default: false},
    activeClassName: {type: String},
    activeStyle: {type: Object}
  },
  setup(props, {emit, slots}) {
    const active: Ref<boolean> = ref(false);
    const triggerEvent = (type, isActive, ev) => {
      const eventType = `on${type}`;
      const onlyChild = unwrapFragment(slots.default())[0];
      if (onlyChild[eventType]) {
        onlyChild[eventType](ev);
      }
      if (isActive !== active.value) {
        active.value = isActive;
      }
      if (['onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel',
        'onMouseDown', 'onMouseUp', 'onMouseLeave'].includes(eventType)) {
        emit(type.toLowerCase(), ev);
      }
    };
    const onTouchStart = (e) => {
      triggerEvent('TouchStart', true, e);
    };
    const onTouchMove = (e) => {
      triggerEvent('TouchMove', false, e);
    };
    const onTouchEnd = (e) => {
      triggerEvent('TouchEnd', false, e);
    };
    const onTouchCancel = (e) => {
      triggerEvent('TouchCancel', false, e);
    };
    const onMouseDown = (e) => {
      // pc simulate mobile
      triggerEvent('MouseDown', true, e);
    };
    const onMouseUp = (e) => {
      triggerEvent('MouseUp', false, e);
    };
    const onMouseLeave = (e) => {
      triggerEvent('MouseLeave', false, e);
    };
    onUpdated(() => {
      if (props.disabled && active.value) {
        active.value = false;
      }
    });

    return {
      active,
      triggerEvent,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      onTouchCancel,
      onMouseDown,
      onMouseUp,
      onMouseLeave
    };
  },
  render() {
    const {disabled, activeClassName, activeStyle} = this;
    const events = disabled ? undefined : {
      onTouchstart: this.onTouchStart,
      onTouchmove: this.onTouchMove,
      onTouchend: this.onTouchEnd,
      onTouchcancel: this.onTouchCancel,
      onMousedown: this.onMouseDown,
      onMouseup: this.onMouseUp,
      onMouseleave: this.onMouseLeave
    };
    const child: VNode = this.$slots.default()[0];
    if (!disabled && this.active) {
      const cls = child.props.class;
      if (cls) {
        const classArray = cls.split(/\s+/);
        if (!classArray.includes(activeClassName)) {
          classArray.push(activeClassName);
        }
        child.props.class = classArray.join(' ');
      } else {
        child.props.class = activeClassName;
      }
      const style = child.props.style;
      if (style) {
        child.props.style = Object.assign(style, activeStyle);
      } else {
        child.props.style = activeStyle;
      }
    } else {
      const cls = child.props.class;
      if (cls) {
        const classArray = cls.split(/\s+/);
        if (classArray.includes(activeClassName)) {
          classArray.splice(classArray.indexOf(activeClassName), 1);
        }
        child.props.class = classArray.join(' ');
      }
    }
    const on = child.props;
    child.props = on ? Object.assign(on, events) : events;
    return child;
  }
});
