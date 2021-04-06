import { createVNode as _createVNode } from "vue";
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'AnimateWrapper',
  props: {
    visible: {
      type: Boolean
    },
    displayType: {
      type: String
    }
  },
  render: function render() {
    var _this$$slots$default, _this$$slots;

    var displayType = this.displayType,
        visible = this.visible;
    return _createVNode("div", {
      "class": "animate",
      "style": {
        display: visible ? displayType : 'none'
      }
    }, [visible && ((_this$$slots$default = (_this$$slots = this.$slots).default) === null || _this$$slots$default === void 0 ? void 0 : _this$$slots$default.call(_this$$slots))]);
  }
});