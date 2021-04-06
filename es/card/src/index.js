import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { createVNode as _createVNode } from "vue";
import classnames from 'classnames';
import { defineComponent } from 'vue';
import Body from './body';
import Header from './header';
import Footer from './footer';
export default defineComponent({
  name: 'MCard',
  Body: Body,
  Header: Header,
  Footer: Footer,
  props: {
    prefixCls: {
      default: 'am-card'
    },
    full: {
      type: Boolean,
      default: false
    }
  },
  render: function render() {
    var _this$$slots$default, _this$$slots;

    var prefixCls = this.prefixCls,
        full = this.full;
    var wrapCls = classnames(prefixCls, _defineProperty({}, "".concat(prefixCls, "-full"), full));
    return _createVNode("div", {
      "class": wrapCls
    }, [(_this$$slots$default = (_this$$slots = this.$slots).default) === null || _this$$slots$default === void 0 ? void 0 : _this$$slots$default.call(_this$$slots)]);
  }
});