import { createVNode as _createVNode } from "vue";
import classnames from 'classnames';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'MCardBody',
  props: {
    prefixCls: {
      default: 'am-card'
    }
  },
  render: function render() {
    var _this$$slots$default, _this$$slots;

    var prefixCls = this.prefixCls;
    var wrapCls = classnames("".concat(prefixCls, "-body"));
    return _createVNode("div", {
      "class": wrapCls
    }, [(_this$$slots$default = (_this$$slots = this.$slots).default) === null || _this$$slots$default === void 0 ? void 0 : _this$$slots$default.call(_this$$slots)]);
  }
});