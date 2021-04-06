import _extends from "@babel/runtime/helpers/extends";
import { defineComponent, onUpdated, ref } from 'vue';
export default defineComponent({
  name: 'TouchFeedback',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    activeClassName: {
      type: String
    },
    activeStyle: {
      type: Object
    }
  },
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var active = ref(false);

    var triggerEvent = function triggerEvent(type, isActive, ev) {
      var eventType = "on".concat(type);
      var children = slots.default && slots.default()[0];

      if (children[eventType]) {
        children[eventType](ev);
      }

      if (isActive !== active.value) {
        active.value = isActive;
      }

      if (['onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel', 'onMouseDown', 'onMouseUp', 'onMouseLeave'].includes(eventType)) {
        emit(type.toLowerCase(), ev);
      }
    };

    var onTouchStart = function onTouchStart(e) {
      triggerEvent('TouchStart', true, e);
    };

    var onTouchMove = function onTouchMove(e) {
      triggerEvent('TouchMove', false, e);
    };

    var onTouchEnd = function onTouchEnd(e) {
      triggerEvent('TouchEnd', false, e);
    };

    var onTouchCancel = function onTouchCancel(e) {
      triggerEvent('TouchCancel', false, e);
    };

    var onMouseDown = function onMouseDown(e) {
      // pc simulate mobile
      triggerEvent('MouseDown', true, e);
    };

    var onMouseUp = function onMouseUp(e) {
      triggerEvent('MouseUp', false, e);
    };

    var onMouseLeave = function onMouseLeave(e) {
      triggerEvent('MouseLeave', false, e);
    };

    onUpdated(function () {
      if (props.disabled && active.value) {
        active.value = false;
      }
    });
    return {
      active: active,
      triggerEvent: triggerEvent,
      onTouchStart: onTouchStart,
      onTouchMove: onTouchMove,
      onTouchEnd: onTouchEnd,
      onTouchCancel: onTouchCancel,
      onMouseDown: onMouseDown,
      onMouseUp: onMouseUp,
      onMouseLeave: onMouseLeave
    };
  },
  render: function render() {
    var disabled = this.disabled,
        activeClassName = this.activeClassName,
        activeStyle = this.activeStyle;
    var events = disabled ? undefined : {
      onTouchstart: this.onTouchStart,
      onTouchmove: this.onTouchMove,
      onTouchend: this.onTouchEnd,
      onTouchcancel: this.onTouchCancel,
      onMousedown: this.onMouseDown,
      onMouseup: this.onMouseUp,
      onMouseleave: this.onMouseLeave
    };
    var child = this.$slots.default()[0];

    if (!disabled && this.active) {
      var cls = child.props.class;

      if (cls) {
        var classArray = cls.split(/\s+/);

        if (!classArray.includes(activeClassName)) {
          classArray.push(activeClassName);
        }

        child.props.class = classArray.join(' ');
      } else {
        child.props.class = activeClassName;
      }

      var style = child.props.style;

      if (style) {
        child.props.class = _extends(style, activeStyle);
      } else {
        child.props.style = activeStyle;
      }
    } else {
      var _cls = child.props.class;

      if (_cls) {
        var _classArray = _cls.split(/\s+/);

        if (_classArray.includes(activeClassName)) {
          _classArray.splice(_classArray.indexOf(activeClassName), 1);
        }

        child.props.class = _classArray.join(' ');
      }
    }

    var on = child.props;
    child.props = on ? _extends(on, events) : events;
    return child;
  }
});