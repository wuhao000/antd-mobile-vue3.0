import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { createVNode as _createVNode } from "vue";
import classnames from 'classnames';
import { defineComponent } from 'vue';
export default defineComponent({
  install: null,
  name: 'ActivityIndicator',
  props: {
    prefixCls: {
      type: String,
      default: 'am-activity-indicator'
    },
    className: {
      type: String
    },
    animating: {
      type: Boolean,
      default: true
    },
    toast: {
      type: Boolean,
      default: false
    },
    size: {
      default: 'small'
    },
    text: {
      type: String
    }
  },
  render: function render() {
    var _classnames;

    var prefixCls = this.prefixCls,
        className = this.className,
        animating = this.animating,
        toast = this.toast,
        size = this.size,
        text = this.text;
    var wrapClass = classnames(prefixCls, className, (_classnames = {}, _defineProperty(_classnames, "".concat(prefixCls, "-lg"), size === 'large'), _defineProperty(_classnames, "".concat(prefixCls, "-sm"), size === 'small'), _defineProperty(_classnames, "".concat(prefixCls, "-toast"), toast), _classnames));
    var spinnerClass = classnames("".concat(prefixCls, "-spinner"), _defineProperty({}, "".concat(prefixCls, "-spinner-lg"), toast || size === 'large'));

    if (animating) {
      if (toast) {
        return _createVNode("div", {
          "class": wrapClass
        }, [text ? _createVNode("div", {
          "class": "".concat(prefixCls, "-content")
        }, [_createVNode("span", {
          "class": spinnerClass,
          "aria-hidden": "true"
        }, null), _createVNode("span", {
          "class": "".concat(prefixCls, "-toast")
        }, [text])]) : _createVNode("div", {
          "class": "".concat(prefixCls, "-content")
        }, [_createVNode("span", {
          "class": spinnerClass,
          "aria-label": "Loading"
        }, null)])]);
      } else {
        return text ? _createVNode("div", {
          "class": wrapClass
        }, [_createVNode("span", {
          "class": spinnerClass,
          "aria-hidden": "true"
        }, null), _createVNode("span", {
          "class": "".concat(prefixCls, "-tip")
        }, [text])]) : _createVNode("div", {
          "class": wrapClass
        }, [_createVNode("span", {
          "class": spinnerClass,
          "aria-label": "loading"
        }, null)]);
      }
    } else {
      return null;
    }
  }
});