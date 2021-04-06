import { createVNode as _createVNode } from "vue";
import { defineComponent } from 'vue';
var Header = defineComponent({
  name: 'Header',
  props: {
    title: {
      type: String
    },
    locale: {
      type: Object
    },
    showClear: {
      type: Boolean
    },
    closeIcon: {
      default: 'X'
    },
    clearIcon: {}
  },
  render: function render() {
    var _this = this;

    var title = this.title,
        _this$locale = this.locale,
        locale = _this$locale === void 0 ? {} : _this$locale,
        showClear = this.showClear,
        closeIcon = this.closeIcon,
        clearIcon = this.clearIcon;
    return _createVNode("div", {
      "class": "header"
    }, [_createVNode("span", {
      "class": "left",
      "onClick": function onClick() {
        return _this.$emit('cancel');
      }
    }, [closeIcon]), _createVNode("span", {
      "class": "title"
    }, [title || locale.title]), showClear && _createVNode("span", {
      "class": "right",
      "onClick": function onClick() {
        return _this.$emit('clear');
      }
    }, [clearIcon || locale.clear])]);
  }
});
export default Header;