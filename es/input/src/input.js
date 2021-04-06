import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { createVNode as _createVNode } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { defineComponent, ref, watch } from 'vue';
var Input = defineComponent({
  name: 'Input',
  props: {
    value: {
      type: [String, Number]
    },
    disabled: Boolean,
    placeholder: String,
    readonly: Boolean,
    type: {
      type: String
    },
    textAlign: {
      type: String,
      default: 'left'
    }
  },
  setup: function setup(props, _ref) {
    var _props$value$toString, _props$value;

    var emit = _ref.emit;
    var currentValue = ref((_props$value$toString = (_props$value = props.value) === null || _props$value === void 0 ? void 0 : _props$value.toString()) !== null && _props$value$toString !== void 0 ? _props$value$toString : '');
    var inputRef = ref(null);

    var onInputBlur = function onInputBlur(e) {
      var value = e.target.value;
      emit('blur', value);
    };

    var onInputFocus = function onInputFocus(e) {
      emit('focus');
    };

    var focus = function focus() {
      if (inputRef.value) {
        inputRef.value.focus();
      }
    };

    watch(function () {
      return props.value;
    }, function (value) {
      currentValue.value = value === null || value === void 0 ? void 0 : value.toString();
    });
    return {
      currentValue: currentValue,
      inputRef: inputRef,
      onInputBlur: onInputBlur,
      focus: focus,
      onInputFocus: onInputFocus
    };
  },
  render: function render() {
    var _this = this;

    var currentValue = this.currentValue;
    var type = this.type === 'number' ? 'text' : this.type;

    var props = _objectSpread(_objectSpread(_objectSpread({}, this.$props), this.$attrs), {}, {
      value: currentValue,
      type: type,
      ref: function ref(el) {
        _this.inputRef = el;
      },
      disabled: this.disabled,
      readonly: this.readonly,
      placeholder: this.placeholder,
      onBlur: function onBlur(e) {
        _this.onInputBlur(e);
      },
      onInput: function onInput(e) {
        _this.$emit('change', e);
      },
      style: {
        textAlign: this.textAlign
      }
    });

    return _createVNode("input", props, null);
  }
});
export default Input;