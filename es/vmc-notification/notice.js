import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { createVNode as _createVNode } from "vue";
import classNames from 'classnames';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'Notice',
  props: {
    duration: {
      type: Number
    },
    onClose: {
      type: Function
    },
    children: {},
    prefixCls: {
      type: String
    },
    closable: {
      type: Boolean
    }
  },
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var closeTimer = ref(null);

    var componentDidMount = function componentDidMount() {
      startCloseTimer();
    };

    var componentWillUnmount = function componentWillUnmount() {
      clearCloseTimer();
    };

    var close = function close() {
      clearCloseTimer();
      emit('close');
    };

    var startCloseTimer = function startCloseTimer() {
      if (props.duration) {
        closeTimer.value = setTimeout(function () {
          close();
        }, props.duration * 1000);
      }
    };

    var clearCloseTimer = function clearCloseTimer() {
      if (closeTimer.value) {
        clearTimeout(closeTimer.value);
        closeTimer.value = null;
      }
    };

    return {
      closeTimer: closeTimer,
      componentDidMount: componentDidMount,
      componentWillUnmount: componentWillUnmount,
      close: close,
      startCloseTimer: startCloseTimer,
      clearCloseTimer: clearCloseTimer
    };
  },
  render: function render() {
    var _className, _this$$slots$default, _this$$slots;

    var componentClass = "".concat(this.prefixCls, "-notice");
    var className = (_className = {}, _defineProperty(_className, "".concat(componentClass), 1), _defineProperty(_className, "".concat(componentClass, "-closable"), this.closable), _className);
    return _createVNode("div", {
      "class": classNames(className)
    }, [_createVNode("div", {
      "class": "".concat(componentClass, "-content")
    }, [(_this$$slots$default = (_this$$slots = this.$slots).default) === null || _this$$slots$default === void 0 ? void 0 : _this$$slots$default.call(_this$$slots)]), this.closable ? _createVNode("a", {
      "tabindex": 0,
      "onClick": this.close,
      "class": "".concat(componentClass, "-close")
    }, [_createVNode("span", {
      "class": "".concat(componentClass, "-close-x")
    }, null)]) : null]);
  }
});