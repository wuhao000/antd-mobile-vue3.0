import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { resolveDirective as _resolveDirective, createTextVNode as _createTextVNode, isVNode as _isVNode, createVNode as _createVNode } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { Drawer } from 'ant-design-vue';
import { defineComponent } from 'vue';
import { useBaseInputComponent } from '../../mixins/base-input-component';
import { pureInputComponentProps } from '../../mixins/pure-input-component';
import Touchable from '../../vmc-feedback/feedback';

function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !_isVNode(s);
}

export default defineComponent({
  inheritAttrs: false,
  name: 'MPopup',
  props: _objectSpread(_objectSpread({}, pureInputComponentProps), {}, {
    onCancel: {},
    onOk: {},
    visible: {
      type: Boolean,
      default: false
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    showCancel: {
      type: Boolean,
      default: false
    },
    cancelButton: {
      type: Object
    },
    showOk: {
      type: Boolean,
      default: true
    },
    title: {
      type: [String, Object],
      default: ''
    },
    prefixCls: {
      type: String,
      default: 'am-popup'
    },
    height: {
      type: String
    },
    width: {
      type: String
    },
    placement: {
      type: String,
      default: 'bottom'
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    closable: {
      type: Boolean,
      default: true
    }
  }),
  install: null,
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        attrs = _ref.attrs,
        slots = _ref.slots;

    var _useBaseInputComponen = useBaseInputComponent(props, {
      emit: emit,
      attrs: attrs,
      slots: slots
    }, {
      propName: 'visible',
      defaultValue: props.visible
    }),
        stateValue = _useBaseInputComponen.stateValue,
        cssStyle = _useBaseInputComponen.cssStyle,
        getDefaultSlot = _useBaseInputComponen.getDefaultSlot,
        isDisabled = _useBaseInputComponen.isDisabled,
        isReadonly = _useBaseInputComponen.isReadonly;

    var onCancel = function onCancel() {
      stateValue.value = false;
      emit('cancel');
    };

    var onOk = function onOk() {
      stateValue.value = false;
      emit('ok');
    };

    var getProps = function getProps() {
      return _objectSpread(_objectSpread({}, props), {}, {
        title: renderHeader(),
        height: props.height || 'auto',
        width: props.width || 'auto',
        disabled: isDisabled.value,
        position: props.placement,
        open: isDisabled.value ? false : stateValue.value
      });
    };

    var getListeners = function getListeners() {
      return {
        onClose: function onClose() {
          stateValue.value = false;
          emit('cancel');
        }
      };
    };

    var renderHeader = function renderHeader() {
      return props.showTitle ? _createVNode("div", {
        "class": "".concat(props.prefixCls, "-title-wrap")
      }, [renderCancel(), _createVNode("div", {
        "class": "".concat(props.prefixCls, "-item ").concat(props.prefixCls, "-title")
      }, [props.title]), renderOk()]) : null;
    };

    var renderCancel = function renderCancel() {
      var cancelButton = props.cancelButton ? props.cancelButton : _createVNode("div", {
        "onClick": onCancel,
        "class": "".concat(props.prefixCls, "-item ").concat(props.prefixCls, "-header-left")
      }, [props.cancelText]);
      return props.showCancel ? _createVNode(Touchable, {
        "activeClassName": "".concat(props.prefixCls, "-item-active")
      }, _isSlot(cancelButton) ? cancelButton : {
        default: function _default() {
          return [cancelButton];
        }
      }) : null;
    };

    var renderOk = function renderOk() {
      return props.showOk ? _createVNode(Touchable, {
        "activeClassName": "".concat(props.prefixCls, "-item-active")
      }, {
        default: function _default() {
          return [_createVNode("div", {
            "onClick": onOk,
            "class": "".concat(props.prefixCls, "-item ").concat(props.prefixCls, "-header-right")
          }, [_createTextVNode("\u786E\u5B9A")])];
        }
      }) : null;
    };

    return {
      getProps: getProps,
      slots: slots,
      getDefaultSlot: getDefaultSlot,
      cssStyle: cssStyle,
      stateValue: stateValue,
      getListeners: getListeners,
      isReadonly: isReadonly,
      isDisabled: isDisabled
    };
  },
  render: function render() {
    var _this = this;

    var props = _objectSpread(_objectSpread(_objectSpread({}, this.getListeners()), this.getProps()), {}, {
      style: this.cssStyle,
      visible: this.stateValue
    }); // @ts-ignore


    return _createVNode(Drawer, props, _objectSpread({
      default: function _default() {
        return [_this.getDefaultSlot()];
      }
    }, this.slots));
  }
});