import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import { isVNode as _isVNode, mergeProps as _mergeProps, createVNode as _createVNode } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import classnames from 'classnames';
import { defineComponent, ref } from 'vue';
import { IS_IOS } from '../../utils/exenv';
import TouchFeedback from '../../vmc-feedback';

function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !_isVNode(s);
}

var KeyboardItem = defineComponent({
  name: 'KeyboardItem',
  props: {
    value: {
      type: [String, Number]
    },
    label: String,
    type: {
      type: String
    },
    prefixCls: {
      default: 'am-number-keyboard'
    },
    iconOnly: {},
    disabled: {
      type: Boolean,
      default: false
    }
  },
  render: function render() {
    var _this$$slots$default,
        _this$$slots,
        _this = this,
        _this$$slots$default2,
        _this$$slots2;

    var prefixCls = this.prefixCls,
        disabled = this.disabled,
        label = this.label,
        iconOnly = this.iconOnly,
        restProps = _objectWithoutProperties(this, ["prefixCls", "disabled", "label", "iconOnly"]);

    var value = (_this$$slots$default = (_this$$slots = this.$slots).default) === null || _this$$slots$default === void 0 ? void 0 : _this$$slots$default.call(_this$$slots);
    var type = this.type;

    if (type === 'keyboard-delete') {
      value = 'delete';
    } else if (type === 'keyboard-hide') {
      value = 'hide';
    } else if (type === 'keyboard-confirm') {
      value = 'confirm';
    }

    var wrapCls = classnames("".concat(prefixCls, "-item"));
    return _createVNode(TouchFeedback, {
      "class": type,
      "activeClassName": "".concat(prefixCls, "-item-active")
    }, {
      default: function _default() {
        return [_createVNode("td", _mergeProps({
          "ref": "td",
          "onClick": function onClick(e) {
            _this.$emit('click', e, _this.value);
          },
          "class": wrapCls
        }, restProps), [(_this$$slots$default2 = (_this$$slots2 = _this.$slots).default) === null || _this$$slots$default2 === void 0 ? void 0 : _this$$slots$default2.call(_this$$slots2), iconOnly && _createVNode("i", {
          "class": "sr-only"
        }, [label])])];
      }
    });
  }
});
export default defineComponent({
  name: 'CustomKeyboard',
  props: {
    onClick: {},
    prefixCls: {},
    confirmLabel: {},
    backspaceLabel: {
      type: String
    },
    cancelKeyboardLabel: {
      type: String
    },
    wrapProps: {},
    header: {}
  },
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var linkedInput = ref(null);
    var confirmDisabled = ref(null);
    var confirmKeyboardItem = ref(null);

    var onKeyboardClick = function onKeyboardClick(e) {
      var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      e.stopImmediatePropagation();

      if (value === 'confirm' && confirmDisabled.value) {
        return null;
      } else {
        if (linkedInput.value) {
          linkedInput.value.onKeyboardClick(value);
        }
      }
    };

    var renderKeyboardItem = function renderKeyboardItem(item, index) {
      var KeyboardItem2 = KeyboardItem;
      return _createVNode(KeyboardItem2, _mergeProps({
        value: item
      }, {
        "onClick": onKeyboardClick,
        "key": "item-".concat(item, "-").concat(index)
      }), _isSlot(item) ? item : {
        default: function _default() {
          return [item];
        }
      });
    };

    var getAriaAttr = function getAriaAttr(label) {
      if (IS_IOS) {
        return {
          label: label,
          iconOnly: true
        };
      } else {
        return {
          role: 'button',
          'aria-label': label
        };
      }
    };

    return {
      linkedInput: linkedInput,
      confirmDisabled: confirmDisabled,
      confirmKeyboardItem: confirmKeyboardItem,
      onKeyboardClick: onKeyboardClick,
      renderKeyboardItem: renderKeyboardItem,
      getAriaAttr: getAriaAttr
    };
  },
  render: function render() {
    var _this2 = this;

    var prefixCls = this.prefixCls,
        confirmLabel = this.confirmLabel,
        backspaceLabel = this.backspaceLabel,
        cancelKeyboardLabel = this.cancelKeyboardLabel,
        wrapProps = this.wrapProps,
        header = this.header;
    var wrapperCls = classnames("".concat(prefixCls, "-wrapper"), "".concat(prefixCls, "-wrapper-hide"));
    var KeyboardItem2 = KeyboardItem;
    return _createVNode("div", _mergeProps({
      "class": wrapperCls,
      "ref": "antmKeyboard"
    }, wrapProps), [header, _createVNode("table", null, [_createVNode("tbody", null, [_createVNode("tr", null, [['1', '2', '3'].map(function (item, index) {
      return (// tslint:disable-next-line:jsx-no-multiline-js
        _this2.renderKeyboardItem(item, index)
      );
    }), _createVNode(KeyboardItem2, _objectSpread(_objectSpread({}, this.getAriaAttr(backspaceLabel)), {}, {
      type: 'keyboard-delete',
      rowSpan: 2,
      onClick: function onClick(e) {
        return _this2.onKeyboardClick(e, 'delete');
      }
    }), null)]), _createVNode("tr", null, [['4', '5', '6'].map(function (item, index) {
      return (// tslint:disable-next-line:jsx-no-multiline-js
        _this2.renderKeyboardItem(item, index)
      );
    })]), _createVNode("tr", null, [['7', '8', '9'].map(function (item, index) {
      return (// tslint:disable-next-line:jsx-no-multiline-js
        _this2.renderKeyboardItem(item, index)
      );
    }), _createVNode(KeyboardItem2, _mergeProps({
      type: 'keyboard-confirm',
      rowSpan: 2,
      onClick: function onClick(e) {
        return _this2.onKeyboardClick(e, 'confirm');
      }
    }, {
      "tdRef": "td"
    }), _isSlot(confirmLabel) ? confirmLabel : {
      default: function _default() {
        return [confirmLabel];
      }
    })]), _createVNode("tr", null, [['.', '0'].map(function (item, index) {
      return (// tslint:disable-next-line:jsx-no-multiline-js
        _this2.renderKeyboardItem(item, index)
      );
    }), _createVNode(KeyboardItem2, _objectSpread(_objectSpread({}, this.getAriaAttr(cancelKeyboardLabel)), {}, {
      type: 'keyboard-hide',
      onClick: function onClick(e) {
        return _this2.onKeyboardClick(e, 'hide');
      }
    }), null)])])])]);
  }
});