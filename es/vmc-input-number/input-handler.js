import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import { createVNode as _createVNode, mergeProps as _mergeProps } from "vue";
import { defineComponent, ref, watch } from 'vue';
import Touchable from '../vmc-feedback';
var InputHandler = defineComponent({
  name: 'InputHandler',
  props: {
    prefixCls: {
      type: String
    },
    disabled: {
      type: Boolean
    },
    role: {
      type: String
    },
    unselectable: {
      type: Boolean
    }
  },
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var active = ref(false);
    watch(function () {
      return props.disabled;
    }, function (disabled) {
      if (!disabled) {
        active.value = false;
      }
    });
    return {
      active: active
    };
  },
  render: function render() {
    var _this = this,
        _this$$slots$default,
        _this$$slots;

    var _this$$props = this.$props,
        prefixCls = _this$$props.prefixCls,
        disabled = _this$$props.disabled,
        unselectable = _this$$props.unselectable,
        otherProps = _objectWithoutProperties(_this$$props, ["prefixCls", "disabled", "unselectable"]);

    return _createVNode(Touchable, _mergeProps({
      "disabled": disabled
    }, {
      onTouchstart: function onTouchstart() {
        _this.active = true;

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this.$emit.apply(_this, ['touchstart'].concat(args));
      },
      onTouchend: function onTouchend() {
        _this.active = false;

        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        _this.$emit.apply(_this, ['touchend'].concat(args));
      }
    }), {
      default: function _default() {
        return [_createVNode("span", _mergeProps({
          "class": _defineProperty({}, "".concat(prefixCls, "-handler-active"), _this.active && !_this.disabled)
        }, otherProps, {
          "unselectable": unselectable ? 'on' : 'off',
          "onClick": function onClick() {
            for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
              args[_key3] = arguments[_key3];
            }

            _this.$emit.apply(_this, ['click'].concat(args));
          }
        }), [(_this$$slots$default = (_this$$slots = _this.$slots).default) === null || _this$$slots$default === void 0 ? void 0 : _this$$slots$default.call(_this$$slots)])];
      }
    });
  }
});
export default InputHandler;