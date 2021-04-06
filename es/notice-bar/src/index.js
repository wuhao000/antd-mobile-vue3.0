import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import { mergeProps as _mergeProps, createVNode as _createVNode } from "vue";
import classnames from 'classnames';
import { defineComponent, ref } from 'vue';
import Icon from '../../icon';
import Marquee from './marquee';
export default defineComponent({
  inheritAttrs: false,
  install: null,
  name: 'NoticeBar',
  props: {
    marqueeProps: {
      type: Object
    },
    prefixCls: {
      type: String,
      default: 'am-notice-bar'
    },
    mode: {
      type: String,
      default: ''
    },
    icon: {
      type: [String, Object]
    },
    action: {
      type: Object
    }
  },
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var show = ref(true);

    var onClick = function onClick() {
      var mode = props.mode;
      emit('click');

      if (mode === 'closable') {
        show.value = false;
      }
    };

    return {
      onClick: onClick,
      show: show
    };
  },
  render: function render() {
    var _ref2, _this$$slots$icon, _this$$slots$icon2, _this$$slots;

    var mode = this.mode,
        prefixCls = this.prefixCls,
        action = this.action,
        marqueeProps = this.marqueeProps,
        restProps = _objectWithoutProperties(this, ["mode", "prefixCls", "action", "marqueeProps"]);

    var icon = (_ref2 = (_this$$slots$icon = (_this$$slots$icon2 = (_this$$slots = this.$slots).icon) === null || _this$$slots$icon2 === void 0 ? void 0 : _this$$slots$icon2.call(_this$$slots)) !== null && _this$$slots$icon !== void 0 ? _this$$slots$icon : this.icon) !== null && _ref2 !== void 0 ? _ref2 : _createVNode(Icon, {
      "type": "voice",
      "size": "xxs"
    }, null);
    var extraProps = {};
    var operationDom = null;

    if (mode === 'closable') {
      var _ref3, _this$$slots$action, _this$$slots$action2, _this$$slots2;

      operationDom = _createVNode("div", {
        "class": "".concat(prefixCls, "-operation"),
        "onClick": this.onClick,
        "role": "button",
        "aria-label": "close"
      }, [(_ref3 = (_this$$slots$action = (_this$$slots$action2 = (_this$$slots2 = this.$slots).action) === null || _this$$slots$action2 === void 0 ? void 0 : _this$$slots$action2.call(_this$$slots2)) !== null && _this$$slots$action !== void 0 ? _this$$slots$action : action) !== null && _ref3 !== void 0 ? _ref3 : _createVNode(Icon, {
        "type": "cross",
        "size": "md"
      }, null)]);
    } else {
      if (mode === 'link') {
        operationDom = _createVNode("div", {
          "class": "".concat(prefixCls, "-operation"),
          "role": "button",
          "aria-label": "go to detail"
        }, [action ? action : _createVNode(Icon, {
          "type": "right",
          "size": "md"
        }, null)]);
      }

      extraProps.onClick = this.onClick;
    }

    var wrapCls = classnames(prefixCls);
    return this.show ? _createVNode("div", {
      "class": wrapCls,
      "onClick": function onClick(e) {
        if (extraProps.onClick) {
          extraProps.onClick(e);
        }
      },
      "role": "alert"
    }, [icon && // tslint:disable-next-line:jsx-no-multiline-js
    _createVNode("div", {
      "class": "".concat(prefixCls, "-icon"),
      "aria-hidden": "true"
    }, [icon]), _createVNode("div", {
      "class": "".concat(prefixCls, "-content")
    }, [_createVNode(Marquee, _mergeProps(marqueeProps, {
      "prefixCls": prefixCls,
      "text": this.$slots.default ? this.$slots.default()[0] : null
    }), null)]), operationDom]) : null;
  }
});