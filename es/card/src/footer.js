import { createVNode as _createVNode } from "vue";
import { isEmptySlot } from '../../utils/vnode';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'MCardFooter',
  props: {
    prefixCls: {
      default: 'am-card'
    },
    extra: {
      type: String
    },
    content: {
      type: String
    }
  },
  render: function render() {
    var prefixCls = this.prefixCls,
        content = this.content,
        extra = this.extra;
    var wrapCls = "".concat(prefixCls, "-footer");
    return _createVNode("div", {
      "class": wrapCls
    }, [_createVNode("div", {
      "class": "".concat(prefixCls, "-footer-content")
    }, [!isEmptySlot(this.$slots.default) ? this.$slots.default() : content]), (this.$slots.extra || extra) && _createVNode("div", {
      "class": "".concat(prefixCls, "-footer-extra")
    }, [!isEmptySlot(this.$slots.extra) ? this.$slots.extra() : extra])]);
  }
});