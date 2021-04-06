import { createVNode as _createVNode } from "vue";
import classnames from 'classnames';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'WhiteSpace',
  props: {
    size: {
      type: String,
      default: 'md'
    },
    prefixCls: {
      type: String,
      default: 'am-whitespace'
    }
  },
  render: function render() {
    var _this = this;

    var wrapCls = classnames(this.prefixCls, "".concat(this.prefixCls, "-").concat(this.size));
    return _createVNode("div", {
      "class": wrapCls,
      "onClick": function onClick(e) {
        _this.$emit('click', e);
      }
    }, null);
  }
});