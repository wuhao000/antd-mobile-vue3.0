import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { mergeProps as _mergeProps, createVNode as _createVNode } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import classNames from 'classnames';
import { defineComponent, onBeforeUpdate, onMounted, ref } from 'vue';
import { baseComponentProps, useBaseComponent } from './base';
import InputHandler from './input-handler';

function noop() {}

function preventDefault(e) {
  e.preventDefault();
}

var InputNumber = defineComponent({
  name: 'InputNumber',
  props: _objectSpread(_objectSpread({}, baseComponentProps), {}, {
    valueEditable: {
      type: Boolean,
      default: false
    },
    focusOnUpDown: {
      type: Boolean,
      default: false
    },
    prefixCls: {
      type: String,
      default: 'rmc-input-number'
    },
    tabIndex: {
      type: Number
    },
    upHandler: {
      type: Object
    },
    downHandler: {
      type: Object
    },
    formatter: {
      type: Function
    }
  }),
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots,
        attrs = _ref.attrs;

    var _useBaseComponent = useBaseComponent(props, {
      emit: emit
    }),
        state = _useBaseComponent.state,
        stop = _useBaseComponent.stop,
        up = _useBaseComponent.up,
        onFocus = _useBaseComponent.onFocus,
        onBlur = _useBaseComponent.onBlur,
        onChange = _useBaseComponent.onChange,
        down = _useBaseComponent.down,
        toPrecisionAsStep = _useBaseComponent.toPrecisionAsStep;

    var start = ref(null);
    var end = ref(null);
    var inputRef = ref(null);

    var update = function update() {
      if (props.focusOnUpDown && state.focused) {
        var selectionRange = inputRef.value.setSelectionRange;

        if (selectionRange && typeof selectionRange === 'function' && start.value !== undefined && end.value !== undefined && start.value !== end.value) {
          inputRef.value.setSelectionRange(start.value, end.value);
        } else {
          focus();
        }
      }
    };

    var focus = function focus() {
      inputRef.value.focus();
    };

    var formatWrapper = function formatWrapper(num) {
      if (props.formatter) {
        return props.formatter(num);
      }

      return num;
    };

    onMounted(function () {
      update();
    });
    onBeforeUpdate(function () {
      try {
        start.value = inputRef.value.selectionStart;
        end.value = inputRef.value.selectionEnd;
      } catch (e) {// Fix error in Chrome:
        // Failed to read the 'selectionStart' property from 'HTMLInputElement'
        // http://stackoverflow.com/q/21177489/3040605
      }
    });
    return {
      state: state,
      toPrecisionAsStep: toPrecisionAsStep,
      stop: stop,
      up: up,
      down: down,
      formatWrapper: formatWrapper,
      onFocus: onFocus,
      onBlur: onBlur,
      onChange: onChange,
      setInputRef: function setInputRef(el) {
        inputRef.value = el;
      }
    };
  },
  render: function render() {
    var _classNames,
        _this = this;

    var _this$prefixCls = this.prefixCls,
        prefixCls = _this$prefixCls === void 0 ? '' : _this$prefixCls,
        disabled = this.disabled,
        readOnly = this.readOnly,
        max = this.max,
        step = this.step,
        valueEditable = this.valueEditable,
        autoFocus = this.autoFocus,
        tabIndex = this.tabIndex,
        min = this.min;
    var classes = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls, true), _defineProperty(_classNames, "".concat(prefixCls, "-disabled"), disabled), _defineProperty(_classNames, "".concat(prefixCls, "-focused"), this.state.focused), _classNames));
    var upDisabledClass = '';
    var downDisabledClass = '';
    var inputValue = this.state.inputValue;

    if (inputValue || inputValue === 0) {
      if (!isNaN(inputValue)) {
        var val = Number(inputValue);

        if (val >= max) {
          upDisabledClass = "".concat(prefixCls, "-handler-up-disabled");
        }

        if (val <= min) {
          downDisabledClass = "".concat(prefixCls, "-handler-down-disabled");
        }
      } else {
        upDisabledClass = "".concat(prefixCls, "-handler-up-disabled");
        downDisabledClass = "".concat(prefixCls, "-handler-down-disabled");
      }
    }

    var editable = !readOnly && !disabled; // focus state, show input value
    // unfocus state, show valid value

    var inputDisplayValue;

    if (this.state.focused) {
      inputDisplayValue = this.state.inputValue;
    } else {
      inputDisplayValue = this.toPrecisionAsStep(this.state.inputValue);
    }

    if (inputDisplayValue === undefined || inputDisplayValue === null) {
      inputDisplayValue = '';
    }

    var upEvents;
    var downEvents;
    upEvents = {
      onTouchstart: editable && !upDisabledClass ? this.up : noop,
      onTouchend: this.stop,
      onClick: function onClick() {
        if (editable && !upDisabledClass) {
          // @ts-ignore
          _this.up.apply(_this, arguments);

          _this.stop();
        }
      }
    };
    downEvents = {
      onTouchstart: editable && !downDisabledClass ? this.down : noop,
      onTouchend: this.stop,
      onClick: function onClick() {
        if (editable && !upDisabledClass) {
          // @ts-ignore
          _this.down.apply(_this, arguments);

          _this.stop();
        }
      }
    };
    var inputDisplayValueFormat = this.formatWrapper(inputDisplayValue);
    var isUpDisabled = !!upDisabledClass || disabled || readOnly;
    var isDownDisabled = !!downDisabledClass || disabled || readOnly;
    return _createVNode("div", {
      "class": classes
    }, [_createVNode("div", {
      "class": "".concat(prefixCls, "-handler-wrap")
    }, [_createVNode(InputHandler, _mergeProps({
      "disabled": isUpDisabled,
      "prefixCls": prefixCls,
      "unselectable": "unselectable"
    }, upEvents, {
      "role": "button",
      "aria-label": "Increase Value",
      "aria-disabled": isUpDisabled,
      "class": "".concat(prefixCls, "-handler ").concat(prefixCls, "-handler-up ").concat(upDisabledClass)
    }), {
      default: function _default() {
        return [_this.upHandler || _createVNode("span", {
          "unselectable": "off",
          "class": "".concat(prefixCls, "-handler-up-inner"),
          "onClick": preventDefault
        }, null)];
      }
    }), _createVNode(InputHandler, _mergeProps({
      "disabled": isDownDisabled,
      "prefixCls": prefixCls,
      "unselectable": "unselectable"
    }, downEvents, {
      "role": "button",
      "aria-label": "Decrease Value",
      "aria-disabled": isDownDisabled,
      "class": "".concat(prefixCls, "-handler ").concat(prefixCls, "-handler-down ").concat(downDisabledClass)
    }), {
      default: function _default() {
        return [_this.downHandler || _createVNode("span", {
          "unselectable": "off",
          "class": "".concat(prefixCls, "-handler-down-inner"),
          "onClick": preventDefault
        }, null)];
      }
    })]), _createVNode("div", {
      "class": "".concat(prefixCls, "-input-wrap"),
      "role": "spinbutton",
      "aria-valuemin": min,
      "aria-valuemax": max,
      "aria-valuenow": inputValue
    }, [_createVNode("input", {
      "class": "".concat(prefixCls, "-input"),
      "tabindex": tabIndex,
      "autocomplete": "off",
      "onFocus": this.onFocus,
      "onBlur": this.onBlur,
      "autofocus": autoFocus,
      "readonly": readOnly || !valueEditable,
      "disabled": disabled,
      "max": max,
      "min": min,
      "step": step,
      "onChange": this.onChange,
      "ref": this.setInputRef,
      "value": inputDisplayValueFormat
    }, null)])]);
  }
});
export default InputNumber;