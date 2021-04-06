import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { createVNode as _createVNode } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { defineComponent } from 'vue';
var PickerItem = defineComponent({
  name: 'PickerItem',
  props: {
    value: {},
    label: {}
  }
});
export default function PickerMixin(ComposedComponent) {
  return defineComponent({
    name: 'PickerMixin',
    props: {
      data: {
        type: Array,
        required: true
      },
      value: {},
      disabled: {
        type: Boolean,
        default: false
      },
      itemStyle: {},
      prefixCls: {},
      indicatorStyle: {},
      indicatorClassName: {},
      defaultValue: {},
      noAnimate: {}
    },
    setup: function setup(props, _ref) {
      var slots = _ref.slots;

      var select = function select(value, itemHeight, scrollTo) {
        for (var i = 0, len = props.data.length; i < len; i++) {
          if (props.data[i].value === value) {
            selectByIndex(i, itemHeight, scrollTo);
            return;
          }
        }

        selectByIndex(0, itemHeight, scrollTo);
      };

      var selectByIndex = function selectByIndex(index, itemHeight, zscrollTo) {
        if (index < 0 || index >= props.data.length || !itemHeight) {
          return;
        }

        zscrollTo(index * itemHeight);
      };

      var computeChildIndex = function computeChildIndex(top, itemHeight, childrenLength) {
        var index = Math.round(top / itemHeight);
        return Math.min(index, childrenLength - 1);
      };

      var doScrollingComplete = function doScrollingComplete(top, itemHeight, fireValueChange) {
        var index = computeChildIndex(top, itemHeight, props.data.length);
        var child = props.data[index];

        if (child) {
          fireValueChange(child.value);
        } else if (console.warn) {
          console.warn('child not found', props.data, index);
        }
      };

      return {
        doScrollingComplete: doScrollingComplete,
        computeChildIndex: computeChildIndex,
        select: select
      };
    },
    render: function render() {
      var _this$$slots$default,
          _this$$slots,
          _this = this;

      return _createVNode(ComposedComponent, _objectSpread(_objectSpread(_objectSpread({}, this.$props), this.$attrs), {}, {
        doScrollingComplete: this.doScrollingComplete,
        computeChildIndex: this.computeChildIndex,
        select: this.select
      }), {
        default: function _default() {
          return [(_this$$slots$default = (_this$$slots = _this.$slots).default) === null || _this$$slots$default === void 0 ? void 0 : _this$$slots$default.call(_this$$slots)];
        }
      });
    }
  });
}