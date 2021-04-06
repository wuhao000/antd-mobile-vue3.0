import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import { mergeProps as _mergeProps, createVNode as _createVNode } from "vue";
import classnames from 'classnames';
import { defineComponent } from 'vue';
import TouchFeedback from '../../vmc-feedback';
export default defineComponent({
  name: 'PopoverItem',
  props: {
    prefixCls: {
      type: String,
      default: 'am-popover'
    },

    /**
     * 图标
     */
    icon: {},

    /**
     * 是否禁用
     */
    disabled: {
      type: Boolean
    },
    firstItem: {
      type: String
    },
    activeStyle: {}
  },
  render: function render() {
    var _this = this,
        _this$$slots$default,
        _this$$slots;

    var prefixCls = this.prefixCls,
        icon = this.icon,
        disabled = this.disabled,
        firstItem = this.firstItem,
        activeStyle = this.activeStyle,
        restProps = _objectWithoutProperties(this, ["prefixCls", "icon", "disabled", "firstItem", "activeStyle"]);

    var cls = classnames("".concat(prefixCls, "-item"), _defineProperty({}, "".concat(prefixCls, "-item-disabled"), disabled));
    var activeClass = "".concat(prefixCls, "-item-active");

    if (firstItem) {
      activeClass += "".concat(prefixCls, "-item-fix-active-arrow");
    }

    return _createVNode(TouchFeedback, {
      "disabled": disabled,
      "activeClassName": activeClass,
      "activeStyle": activeStyle
    }, {
      default: function _default() {
        return [_createVNode("div", _mergeProps({
          "class": cls
        }, restProps, {
          "onClick": function onClick(e) {
            if (!_this.disabled) {
              _this.$emit('click', e);
            }
          }
        }), [_createVNode("div", {
          "class": "".concat(prefixCls, "-item-container")
        }, [icon ? // tslint:disable-next-line:jsx-no-multiline-js
        _createVNode("span", {
          "class": "".concat(prefixCls, "-item-icon"),
          "aria-hidden": "true"
        }, [icon]) : null, _createVNode("span", {
          "class": "".concat(prefixCls, "-item-content")
        }, [(_this$$slots$default = (_this$$slots = _this.$slots).default) === null || _this$$slots$default === void 0 ? void 0 : _this$$slots$default.call(_this$$slots)])])])];
      }
    });
  }
});