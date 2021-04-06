import { createVNode as _createVNode } from "vue";
import classnames from 'classnames';
import { defineComponent } from 'vue';
var WingBlank = defineComponent({
  name: 'WingBlank',
  props: {
    prefixCls: {
      type: String,
      default: 'am-wingblank'
    },
    size: {
      default: 'lg'
    }
  },
  install: null,
  render: function render() {
    var prefixCls = this.prefixCls,
        size = this.size;
    var wrapCls = classnames(prefixCls, "".concat(prefixCls, "-").concat(size));
    return _createVNode("div", {
      "class": wrapCls
    }, [this.$slots.default()]);
  }
});
export default WingBlank;