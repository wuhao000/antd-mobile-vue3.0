import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import { createVNode as _createVNode, mergeProps as _mergeProps } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { filterHTMLAttrs } from '../../utils/dom';
import classnames from 'classnames';
import { defineComponent } from 'vue';
export default defineComponent({
  inheritAttrs: false,
  name: 'FlexItem',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    prefixCls: {
      type: String,
      default: 'am-flexbox'
    }
  },
  render: function render() {
    var _this$$slots$default, _this$$slots;

    var prefixCls = this.prefixCls,
        restProps = _objectWithoutProperties(this, ["prefixCls"]);

    var wrapCls = classnames("".concat(prefixCls, "-item"));
    var props = filterHTMLAttrs(_objectSpread(_objectSpread({}, restProps), this.$attrs));
    return _createVNode("div", _mergeProps({
      "class": wrapCls
    }, props), [(_this$$slots$default = (_this$$slots = this.$slots).default) === null || _this$$slots$default === void 0 ? void 0 : _this$$slots$default.call(_this$$slots)]);
  }
});