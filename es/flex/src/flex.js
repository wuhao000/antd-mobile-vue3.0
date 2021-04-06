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
  Item: null,
  name: 'Flex',
  props: {
    alignContent: {
      type: String
    },
    prefixCls: {
      type: String,
      default: 'am-flexbox'
    },
    role: {
      type: String
    },
    direction: {
      type: String
    },
    wrap: {
      type: String
    },
    justify: {
      type: String
    },
    align: {
      type: String,
      default: 'center'
    },
    disabled: {
      type: Boolean
    }
  },
  render: function render() {
    var _classnames, _this$$slots$default, _this$$slots;

    var direction = this.direction,
        wrap = this.wrap,
        justify = this.justify,
        align = this.align,
        alignContent = this.alignContent,
        prefixCls = this.prefixCls,
        restProps = _objectWithoutProperties(this, ["direction", "wrap", "justify", "align", "alignContent", "prefixCls"]);

    var wrapCls = classnames(prefixCls, (_classnames = {}, _defineProperty(_classnames, "".concat(prefixCls, "-dir-row"), direction === 'row'), _defineProperty(_classnames, "".concat(prefixCls, "-dir-row-reverse"), direction === 'row-reverse'), _defineProperty(_classnames, "".concat(prefixCls, "-dir-column"), direction === 'column'), _defineProperty(_classnames, "".concat(prefixCls, "-dir-column-reverse"), direction === 'column-reverse'), _defineProperty(_classnames, "".concat(prefixCls, "-nowrap"), wrap === 'nowrap'), _defineProperty(_classnames, "".concat(prefixCls, "-wrap"), wrap === 'wrap'), _defineProperty(_classnames, "".concat(prefixCls, "-wrap-reverse"), wrap === 'wrap-reverse'), _defineProperty(_classnames, "".concat(prefixCls, "-justify-start"), justify === 'start'), _defineProperty(_classnames, "".concat(prefixCls, "-justify-end"), justify === 'end'), _defineProperty(_classnames, "".concat(prefixCls, "-justify-center"), justify === 'center'), _defineProperty(_classnames, "".concat(prefixCls, "-justify-between"), justify === 'between'), _defineProperty(_classnames, "".concat(prefixCls, "-justify-around"), justify === 'around'), _defineProperty(_classnames, "".concat(prefixCls, "-align-start"), align === 'start'), _defineProperty(_classnames, "".concat(prefixCls, "-align-center"), align === 'center'), _defineProperty(_classnames, "".concat(prefixCls, "-align-end"), align === 'end'), _defineProperty(_classnames, "".concat(prefixCls, "-align-baseline"), align === 'baseline'), _defineProperty(_classnames, "".concat(prefixCls, "-align-stretch"), align === 'stretch'), _defineProperty(_classnames, "".concat(prefixCls, "-align-content-start"), alignContent === 'start'), _defineProperty(_classnames, "".concat(prefixCls, "-align-content-end"), alignContent === 'end'), _defineProperty(_classnames, "".concat(prefixCls, "-align-content-center"), alignContent === 'center'), _defineProperty(_classnames, "".concat(prefixCls, "-align-content-between"), alignContent === 'between'), _defineProperty(_classnames, "".concat(prefixCls, "-align-content-around"), alignContent === 'around'), _defineProperty(_classnames, "".concat(prefixCls, "-align-content-stretch"), alignContent === 'stretch'), _classnames));
    var props = filterHTMLAttrs(_objectSpread(_objectSpread({}, restProps), this.$attrs));
    return _createVNode("div", _mergeProps(props, {
      "class": wrapCls
    }), [(_this$$slots$default = (_this$$slots = this.$slots).default) === null || _this$$slots$default === void 0 ? void 0 : _this$$slots$default.call(_this$$slots)]);
  }
});