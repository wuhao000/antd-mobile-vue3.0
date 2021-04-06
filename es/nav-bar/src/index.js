import { createVNode as _createVNode } from "vue";
import classnames from 'classnames';
import { defineComponent } from 'vue';
import Icon from '../../icon';
var NavBar = defineComponent({
  install: null,
  name: 'NavBar',
  props: {
    onLeftClick: {},
    prefixCls: {
      type: String,
      default: 'am-navbar'
    },
    className: {
      type: String
    },
    mode: {
      default: 'dark'
    },
    icon: {
      type: [String, Object]
    },
    leftContent: {
      type: [String, Object]
    },
    rightContent: {
      type: [String, Object]
    }
  },
  render: function render() {
    var _ref,
        _this$$slots$rightCon,
        _this$$slots$rightCon2,
        _this$$slots,
        _this$$slots$rightCo,
        _this$$slots2,
        _ref2,
        _this$$slots$leftCont,
        _this$$slots$leftCont2,
        _this$$slots3,
        _this$$slots$leftCon,
        _this$$slots4,
        _this = this,
        _this$$slots$icon,
        _this$$slots5;

    var prefixCls = this.prefixCls,
        className = this.className,
        mode = this.mode,
        icon = this.icon;
    var rightContent = (_ref = (_this$$slots$rightCon = (_this$$slots$rightCon2 = (_this$$slots = this.$slots).rightContent) === null || _this$$slots$rightCon2 === void 0 ? void 0 : _this$$slots$rightCon2.call(_this$$slots)) !== null && _this$$slots$rightCon !== void 0 ? _this$$slots$rightCon : (_this$$slots$rightCo = (_this$$slots2 = this.$slots)['right-content']) === null || _this$$slots$rightCo === void 0 ? void 0 : _this$$slots$rightCo.call(_this$$slots2)) !== null && _ref !== void 0 ? _ref : this.rightContent;
    var leftContent = (_ref2 = (_this$$slots$leftCont = (_this$$slots$leftCont2 = (_this$$slots3 = this.$slots).leftContent) === null || _this$$slots$leftCont2 === void 0 ? void 0 : _this$$slots$leftCont2.call(_this$$slots3)) !== null && _this$$slots$leftCont !== void 0 ? _this$$slots$leftCont : (_this$$slots$leftCon = (_this$$slots4 = this.$slots)['left-content']) === null || _this$$slots$leftCon === void 0 ? void 0 : _this$$slots$leftCon.call(_this$$slots4)) !== null && _ref2 !== void 0 ? _ref2 : this.leftContent;
    return _createVNode("div", {
      "class": classnames(className, prefixCls, "".concat(prefixCls, "-").concat(mode))
    }, [_createVNode("div", {
      "class": "".concat(prefixCls, "-left"),
      "role": "button",
      "onClick": function onClick(e) {
        _this.$emit('left-click', e);
      }
    }, [icon ? _createVNode("span", {
      "class": "".concat(prefixCls, "-left-icon"),
      "aria-hidden": "true"
    }, [typeof icon === 'string' ? _createVNode(Icon, {
      "type": icon
    }, null) : icon]) : (_this$$slots$icon = (_this$$slots5 = this.$slots).icon) === null || _this$$slots$icon === void 0 ? void 0 : _this$$slots$icon.call(_this$$slots5), leftContent]), _createVNode("div", {
      "class": "".concat(prefixCls, "-title")
    }, [this.$slots.default()]), _createVNode("div", {
      "class": "".concat(prefixCls, "-right")
    }, [rightContent])]);
  }
});
export default NavBar;