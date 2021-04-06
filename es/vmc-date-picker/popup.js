import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { createVNode as _createVNode } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { defineComponent, inject } from 'vue';
import PopupPicker from '../vmc-picker/popup';
export default defineComponent({
  name: 'PopupDatePicker',
  props: {
    onVisibleChange: {},
    title: {},
    visible: {
      type: Boolean,
      default: false
    },
    cancelText: {
      type: String
    },
    okText: {
      type: String
    },
    prefixCls: {
      type: String
    },
    datePicker: {},
    date: {},
    disabled: {
      type: Boolean,
      default: false
    },
    editable: {
      type: Boolean,
      default: true
    }
  },
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var store = inject('store', undefined);

    var onCancel = function onCancel() {
      if (store.onCancel) {
        store.onCancel();
      }

      emit('cancel');
    };

    var onOk = function onOk(v) {
      if (store.onOk) {
        store.onOk();
      }

      emit('change', v);
      emit('ok', v);
    };

    return {
      store: store,
      onCancel: onCancel,
      onOk: onOk
    };
  },
  render: function render() {
    var _this$$slots$default,
        _this$$slots,
        _this = this;

    var props = _objectSpread(_objectSpread(_objectSpread({}, this.$props), this.$attrs), {}, {
      picker: this.datePicker,
      value: this.date,
      disabled: this.disabled || !this.editable,
      onCancel: this.onCancel,
      onOk: this.onOk
    });

    return _createVNode(PopupPicker, props, {
      default: function _default() {
        return [(_this$$slots$default = (_this$$slots = _this.$slots).default) === null || _this$$slots$default === void 0 ? void 0 : _this$$slots$default.call(_this$$slots)];
      }
    });
  }
});