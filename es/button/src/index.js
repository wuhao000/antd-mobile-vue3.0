import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { mergeProps as _mergeProps, createVNode as _createVNode } from "vue";
import classnames from 'classnames';
import { defineComponent } from 'vue';
import IconRes from '../../mixins/icon-res';
import TouchFeedback from '../../vmc-feedback';
var httpReg = /^http(s)?:\/\//;
var rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
var isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);

function isString(str) {
  return typeof str === 'string';
}

export default defineComponent({
  install: null,
  inheritAttrs: false,
  name: 'MButton',
  props: {
    onClick: {},
    prefixCls: {
      type: String,
      default: 'am-button'
    },
    role: {
      type: String
    },
    inline: {
      type: Boolean,
      default: false
    },
    icon: {
      type: [String, Object]
    },
    activeClassName: {
      type: String
    },
    activeStyle: {
      type: [Boolean, Object],
      default: function _default() {
        return {};
      }
    },
    type: {
      type: String
    },
    size: {
      type: String,
      default: 'large'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;

    var insertSpace = function insertSpace(child) {
      if (isString(child.text) && isTwoCNChar(child.text)) {
        return _createVNode("span", null, [child.text.split('').join(' ')]);
      }

      return child;
    };

    return {
      insertSpace: insertSpace
    };
  },
  render: function render() {
    var _classnames,
        _this = this;

    var prefixCls = this.prefixCls,
        type = this.type,
        size = this.size,
        inline = this.inline,
        disabled = this.disabled,
        icon = this.icon,
        loading = this.loading,
        activeStyle = this.activeStyle,
        activeClassName = this.activeClassName;
    var iconType = loading ? 'loading' : icon;
    var wrapCls = classnames(prefixCls, (_classnames = {}, _defineProperty(_classnames, "".concat(prefixCls, "-primary"), type === 'primary'), _defineProperty(_classnames, "".concat(prefixCls, "-ghost"), type === 'ghost'), _defineProperty(_classnames, "".concat(prefixCls, "-warning"), type === 'warning'), _defineProperty(_classnames, "".concat(prefixCls, "-small"), size === 'small'), _defineProperty(_classnames, "".concat(prefixCls, "-inline"), inline), _defineProperty(_classnames, "".concat(prefixCls, "-disabled"), disabled), _defineProperty(_classnames, "".concat(prefixCls, "-loading"), loading), _defineProperty(_classnames, "".concat(prefixCls, "-icon"), !!iconType), _classnames), this.$attrs.class);
    var kids = this.$slots.default ? this.$slots.default().map(this.insertSpace) : '';
    var iconEl;

    if (typeof iconType === 'string') {
      iconEl = _createVNode(IconRes, _mergeProps({
        "class": "".concat(prefixCls, "-icon")
      }, {
        type: httpReg.test(iconType) ? iconType : {
          mobile: true,
          iconType: 'icon',
          type: iconType,
          size: size === 'small' ? 'xxs' : 'md'
        }
      }), null);
    } else if (iconType) {
      var cls = classnames('am-icon', "".concat(prefixCls, "-icon"), size === 'small' ? 'am-icon-xxs' : 'am-icon-md');
      iconEl = // @ts-ignore
      _createVNode(IconRes, {
        "class": cls,
        "props": {
          type: iconType
        }
      }, null);
    }

    return _createVNode(TouchFeedback, {
      "activeClassName": activeClassName || (activeStyle ? "".concat(prefixCls, "-active") : undefined),
      "disabled": disabled,
      "activeStyle": activeStyle
    }, {
      default: function _default() {
        return [_createVNode("a", {
          "role": "button",
          "class": wrapCls,
          "onClick": function onClick(e) {
            if (!_this.disabled) {
              _this.$emit('click', e);
            }
          },
          "aria-disabled": disabled
        }, [iconEl, kids])];
      }
    });
  }
});