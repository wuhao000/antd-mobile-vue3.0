import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { createVNode as _createVNode } from "vue";
import classnames from 'classnames';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Badge',
  props: {
    prefixCls: {
      default: 'am-badge'
    },
    hot: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'small'
    },
    overflowCount: {
      type: Number,
      default: 99
    },
    corner: {
      type: Boolean,
      default: false
    },
    dot: {
      type: Boolean,
      default: false
    },
    text: {
      type: [String, Number]
    },
    textStyle: {
      type: Object
    }
  },
  render: function render() {
    var _classnames, _this$$slots$default, _this$$slots, _classnames2, _this$$slots$default2, _this$$slots2;

    var overflowCount = this.overflowCount,
        text = this.text;
    var prefixCls = this.prefixCls,
        size = this.size,
        dot = this.dot,
        corner = this.corner,
        hot = this.hot;
    overflowCount = overflowCount;
    text = typeof text === 'number' && text > overflowCount ? "".concat(overflowCount, "+") : text; // dot mode don't need text

    if (dot) {
      text = '';
    }

    var scrollNumberCls = classnames((_classnames = {}, _defineProperty(_classnames, "".concat(prefixCls, "-dot"), dot), _defineProperty(_classnames, "".concat(prefixCls, "-dot-large"), dot && size === 'large'), _defineProperty(_classnames, "".concat(prefixCls, "-text"), !dot && !corner), _defineProperty(_classnames, "".concat(prefixCls, "-corner"), corner), _defineProperty(_classnames, "".concat(prefixCls, "-corner-large"), corner && size === 'large'), _classnames));
    var badgeCls = classnames(prefixCls, (_classnames2 = {}, _defineProperty(_classnames2, "".concat(prefixCls, "-not-a-wrapper"), !((_this$$slots$default = (_this$$slots = this.$slots).default) !== null && _this$$slots$default !== void 0 && _this$$slots$default.call(_this$$slots))), _defineProperty(_classnames2, "".concat(prefixCls, "-corner-wrapper"), corner), _defineProperty(_classnames2, "".concat(prefixCls, "-hot"), hot), _defineProperty(_classnames2, "".concat(prefixCls, "-corner-wrapper-large"), corner && size === 'large'), _classnames2));
    return _createVNode("span", {
      "class": badgeCls
    }, [(_this$$slots$default2 = (_this$$slots2 = this.$slots).default) === null || _this$$slots$default2 === void 0 ? void 0 : _this$$slots$default2.call(_this$$slots2), (text || dot) && // tslint:disable-next-line:jsx-no-multiline-js
    _createVNode("sup", {
      "class": scrollNumberCls,
      "style": this.textStyle
    }, [text])]);
  }
});