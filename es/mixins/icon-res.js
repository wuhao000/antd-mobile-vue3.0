import _typeof from "@babel/runtime/helpers/typeof";
import { createVNode as _createVNode } from "vue";
import { defineComponent } from 'vue';
import Icon from '../icon';
var httpReg = /^http(s)?:\/\//;
export default defineComponent({
  name: 'IconRes',
  props: {
    type: [String, Object]
  },
  render: function render() {
    var icon = this.type;

    if (typeof icon === 'string') {
      if (httpReg.test(icon)) {
        return _createVNode("img", {
          "src": icon,
          "alt": ''
        }, null);
      } else {
        return _createVNode(Icon, {
          "type": icon,
          "size": 'md'
        }, null);
      }
    } else if (_typeof(icon) === 'object') {
      if (icon.context) {
        return icon;
      } else if (['icon', 'img'].includes(icon.iconType)) {
        return _createVNode(Icon, icon, null);
      }
    }
  }
});