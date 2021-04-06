import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { createVNode as _createVNode, resolveDirective as _resolveDirective } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { defineComponent, inject } from 'vue';
import PopupPicker from '../vmc-picker/popup';
export default defineComponent({
  name: 'PopupCascader',
  props: {
    cascader: {
      type: Object
    }
  },
  setup: function setup(props, _ref) {
    var emit = _ref.emit;
    var store = inject('store', undefined);

    var onCancel = function onCancel() {
      if (store.onCancel) {
        store.onCancel();
      }

      emit('cancel');
    };

    var onChange = function onChange(v) {
      emit('change', v);
    };

    var onOk = function onOk(v) {
      if (store.onOk) {
        store.onOk(v);
      }

      emit('change', v);
      emit('ok');
    };

    return {
      onCancel: onCancel,
      onOk: onOk,
      onChange: onChange
    };
  },
  render: function render() {
    var _this = this;

    var props = _objectSpread(_objectSpread(_objectSpread({
      picker: this.cascader
    }, this.$props), this.$attrs), {}, {
      onCancel: this.onCancel,
      onChange: this.onChange,
      onOk: this.onOk
    });

    return _createVNode(PopupPicker, props, {
      picker: function picker() {
        return _this.cascader;
      },
      default: this.$slots.default
    });
  }
});