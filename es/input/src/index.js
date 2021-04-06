import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { resolveDirective as _resolveDirective, mergeProps as _mergeProps, createVNode as _createVNode } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/* tslint:disable:jsx-no-multiline-js */
import classnames from 'classnames';
import { defineComponent, getCurrentInstance, onBeforeUnmount, reactive, ref, watch } from 'vue';
import List from '../../list';
import { formComponentProps, useFormComponent } from '../../mixins/form-component';
import { isEmptySlot } from '../../utils/vnode';
import TouchFeedback from '../../vmc-feedback';
import CustomInput from './custom-input';
import Input from './input';

function noop() {}

function normalizeValue(value) {
  if (typeof value === 'undefined' || value === null) {
    return '';
  }

  return value + '';
}

export default defineComponent({
  name: 'InputItem',
  props: _objectSpread(_objectSpread({}, formComponentProps), {}, {
    defaultValue: {
      type: [String, Number]
    },
    title: {
      type: [String, Object]
    },

    /**
     * class 前缀
     */
    prefixCls: {
      type: String,
      default: 'am-input'
    },

    /**
     * list class 前缀
     */
    prefixListCls: {
      type: String,
      default: 'am-list'
    },

    /**
     * 文字排版起始方向, 只有 type='money' 支持，
     * 可选为 <code>'left'</code>, <code>'right'</code>
     */
    moneyKeyboardAlign: {
      type: String,
      default: 'right'
    },
    moneyKeyboardWrapProps: {
      type: Function,
      default: function _default() {
        return {};
      }
    },
    moneyKeyboardHeader: {
      default: null
    },
    type: {
      type: String,
      default: 'text'
    },

    /**
     * input元素的name属性
     */
    name: {
      type: String
    },

    /**
     * 占位文字
     */
    placeholder: {
      type: String,
      default: ''
    },

    /**
     * 是否支持清除内容
     */
    clearable: {
      type: Boolean,
      default: false
    },

    /**
     * 最大长度
     */
    maxLength: {
      type: Number,
      default: 1000000
    },

    /**
     * 右边注释
     */
    extra: {
      default: ''
    },
    labelNumber: {
      default: 5
    },
    textAlign: {
      type: String
    },
    locale: {},
    android: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    errorDisplayType: {
      type: String,
      default: 'toast'
    }
  }),
  install: null,
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        emit = _ref.emit,
        attrs = _ref.attrs;
    var state = reactive({
      placeholder: props.placeholder || ''
    });

    var _useFormComponent = useFormComponent(props, {
      emit: emit
    }),
        currentValue = _useFormComponent.currentValue,
        isDisabled = _useFormComponent.isDisabled,
        isReadonly = _useFormComponent.isReadonly,
        onFieldBlur = _useFormComponent.onFieldBlur,
        onFieldChange = _useFormComponent.onFieldChange;

    var debounceTimeout = ref(null);
    watch(function () {
      return props.placeholder;
    }, function (placeholder) {
      state.placeholder = placeholder;
    });
    var inputRef = ref(null);

    var renderLabel = function renderLabel() {
      var _classnames;

      var prefixCls = props.prefixCls;
      var labelNumber = props.labelNumber;
      var labelCls = classnames("".concat(prefixCls, "-label"), (_classnames = {}, _defineProperty(_classnames, "".concat(prefixCls, "-label-2"), labelNumber === 2), _defineProperty(_classnames, "".concat(prefixCls, "-label-3"), labelNumber === 3), _defineProperty(_classnames, "".concat(prefixCls, "-label-4"), labelNumber === 4), _defineProperty(_classnames, "".concat(prefixCls, "-label-5"), labelNumber === 5), _defineProperty(_classnames, "".concat(prefixCls, "-label-6"), labelNumber === 6), _defineProperty(_classnames, "".concat(prefixCls, "-label-7"), labelNumber === 7), _classnames));

      if (!isEmptySlot(slots.default)) {
        return _createVNode("div", {
          "class": labelCls
        }, [slots.default()]);
      } else if (props.title) {
        return _createVNode("div", {
          "class": labelCls
        }, [props.title]);
      }

      return null;
    };

    var onInputChange = function onInputChange(e) {
      var _currentValue$value;

      var el = e.target;
      var rawVal = el.value,
          prePos = el.selectionEnd;
      var preCtrlVal = (_currentValue$value = currentValue.value) !== null && _currentValue$value !== void 0 ? _currentValue$value : '';
      var type = props.type;
      var ctrlValue = rawVal;

      switch (type) {
        case 'bankCard':
          ctrlValue = rawVal.replace(/\D/g, '').replace(/(....)(?=.)/g, '$1 ');
          break;

        case 'phone':
          ctrlValue = rawVal.replace(/\D/g, '').substring(0, 11);
          var valueLen = ctrlValue.length;

          if (valueLen > 3 && valueLen < 8) {
            ctrlValue = "".concat(ctrlValue.substr(0, 3), " ").concat(ctrlValue.substr(3));
          } else if (valueLen >= 8) {
            ctrlValue = "".concat(ctrlValue.substr(0, 3), " ").concat(ctrlValue.substr(3, 4), " ").concat(ctrlValue.substr(7));
          }

          break;

        case 'number':
          ctrlValue = rawVal.replace(/\D/g, '');
          break;

        case 'digit':
          ctrlValue = rawVal.replace(/[^0-9.]/g, '');
          break;

        case 'text':
        case 'password':
        default:
          break;
      }

      if (props.maxLength && ctrlValue.length > props.maxLength) {
        ctrlValue = ctrlValue.substring(0, props.maxLength);
      }

      handleOnChange(ctrlValue, ctrlValue !== rawVal, function () {
        switch (type) {
          case 'bankCard':
          case 'phone':
          case 'number':
            // controlled input type needs to adjust the position of the caret
            try {
              // set selection may throw error (https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange)
              el.selectionStart = el.selectionEnd = calcPos(prePos || 0, preCtrlVal, rawVal, ctrlValue, [' '], /\D/g);
            } catch (error) {
              console.warn('Set selection error:', error);
            }

            break;

          default:
            break;
        }
      });
      onFieldChange();
    };
    /**
     *
     * @param {string} value
     * @param {boolean} isMutated 校正值是否和输入值不同
     * @param adjustPos
     */


    var handleOnChange = function handleOnChange(value) {
      var isMutated = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var adjustPos = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;
      currentValue.value = value;
      emit('update:value', value);
      emit('change', value);
      adjustPos();

      if (inputRef.value && isMutated) {
        inputRef.value.$forceUpdate();
      }
    };

    var instance = getCurrentInstance();

    var onInputFocus = function onInputFocus(value) {
      if (debounceTimeout.value) {
        clearTimeout(debounceTimeout.value);
        debounceTimeout.value = null;
      }

      instance.vnode.el.focus();
      emit('focus', value);
    };

    var onInputBlur = function onInputBlur(value) {
      if (inputRef.value) {
        // this.inputRef may be null if customKeyboard unmount
        debounceTimeout.value = window.setTimeout(function () {
          if (document.activeElement !== (inputRef.value && inputRef.value.inputRef)) {
            instance.vnode.el.blur();
          }
        }, 200);
      } // fix autoFocus item blur with flash


      setTimeout(function () {
        // fix ios12 wechat browser click failure after input
        if (document.body) {
          document.body.scrollTop = document.body.scrollTop;
        }
      }, 100);
      onFieldBlur();
      emit('blur', value);
    };

    var clearInput = function clearInput() {
      handleOnChange('');
      focus();
    };

    var focus = function focus() {
      if (inputRef.value) {
        if (typeof inputRef.value.focus === 'function') {
          inputRef.value.focus();
        } else {
          inputRef.value.focus = true;
        }
      }
    };

    var calcPos = function calcPos(prePos, preCtrlVal, rawVal, ctrlVal, placeholderChars, maskReg) {
      var editLength = rawVal.length - preCtrlVal.length;
      var isAddition = editLength > 0;
      var pos = prePos;

      if (isAddition) {
        var additionStr = rawVal.substr(pos - editLength, editLength);
        var ctrlCharCount = additionStr.replace(maskReg, '').length;
        pos -= editLength - ctrlCharCount;
        var placeholderCharCount = 0;

        while (ctrlCharCount > 0) {
          if (placeholderChars.indexOf(ctrlVal.charAt(pos - ctrlCharCount + placeholderCharCount)) === -1) {
            ctrlCharCount--;
          } else {
            placeholderCharCount++;
          }
        }

        pos += placeholderCharCount;
      }

      return pos;
    };

    currentValue.value = normalizeValue((props.value || '') + '');
    onBeforeUnmount(function () {
      if (debounceTimeout.value) {
        window.clearTimeout(debounceTimeout.value);
        debounceTimeout.value = null;
      }
    });
    return {
      clearInput: clearInput,
      setInputRef: function setInputRef(el) {
        inputRef.value = el;
      },
      onInputChange: onInputChange,
      onInputFocus: onInputFocus,
      onInputBlur: onInputBlur,
      isReadonly: isReadonly,
      isDisabled: isDisabled,
      currentValue: currentValue,
      focus: focus,
      state: state,
      renderLabel: renderLabel
    };
  },
  render: function render() {
    var _classnames2,
        _this = this;

    var prefixCls = this.prefixCls,
        prefixListCls = this.prefixListCls,
        isReadonly = this.isReadonly,
        isDisabled = this.isDisabled,
        clearable = this.clearable,
        type = this.type,
        currentValue = this.currentValue,
        moneyKeyboardAlign = this.moneyKeyboardAlign,
        moneyKeyboardWrapProps = this.moneyKeyboardWrapProps,
        moneyKeyboardHeader = this.moneyKeyboardHeader,
        name = this.name,
        maxLength = this.maxLength;
    var extra = this.$slots.extra || this.extra;
    var _confirmLabel$backspa = {
      confirmLabel: '确定',
      backspaceLabel: '退格',
      cancelKeyboardLabel: '收起键盘'
    },
        confirmLabel = _confirmLabel$backspa.confirmLabel,
        backspaceLabel = _confirmLabel$backspa.backspaceLabel,
        cancelKeyboardLabel = _confirmLabel$backspa.cancelKeyboardLabel;
    var focus = this.focus,
        placeholder = this.state.placeholder;
    var wrapCls = classnames("".concat(prefixListCls, "-item"), "".concat(prefixCls, "-item"), "".concat(prefixListCls, "-item-middle"), (_classnames2 = {}, _defineProperty(_classnames2, "".concat(prefixCls, "-disabled"), isDisabled), _defineProperty(_classnames2, "".concat(prefixCls, "-focus"), focus), _defineProperty(_classnames2, "".concat(prefixCls, "-android"), this.android), _classnames2));
    var controlCls = "".concat(prefixCls, "-control");
    var inputType = 'text';

    if (type === 'bankCard' || type === 'phone') {
      inputType = 'tel';
    } else if (type === 'password') {
      inputType = 'password';
    } else if (type === 'digit') {
      inputType = 'number';
    } else if (type !== 'text' && type !== 'number') {
      inputType = type;
    }

    var patternProps;

    if (type === 'number') {
      patternProps = {
        pattern: '[0-9]*'
      };
    }

    var classNameProp = '';

    if (type === 'digit') {
      classNameProp = 'h5numInput';
    }

    var slots = {
      control: function control() {
        return _createVNode("div", {
          "class": controlCls
        }, [type === 'money' ? _createVNode(CustomInput, _mergeProps({
          value: normalizeValue(currentValue),
          type: type,
          maxLength: maxLength,
          placeholder: placeholder,
          disabled: isDisabled,
          editable: !isReadonly,
          prefixCls: prefixCls,
          confirmLabel: confirmLabel,
          backspaceLabel: backspaceLabel,
          cancelKeyboardLabel: cancelKeyboardLabel,
          moneyKeyboardAlign: moneyKeyboardAlign,
          moneyKeyboardWrapProps: moneyKeyboardWrapProps,
          moneyKeyboardHeader: moneyKeyboardHeader
        }, {
          "onChange": _this.onInputChange,
          "onFocus": _this.onInputFocus,
          "onBlur": _this.onInputBlur,
          "onConfirm": function onConfirm(v) {
            _this.$emit('confirm', v);
          },
          "ref": _this.setInputRef
        }), null) : _createVNode(Input, _objectSpread(_objectSpread({}, patternProps), {}, {
          value: normalizeValue(currentValue),
          defaultValue: _this.defaultValue,
          textAlign: _this.textAlign,
          type: inputType,
          maxLength: maxLength,
          name: name,
          placeholder: placeholder,
          readonly: isReadonly,
          disabled: isDisabled,
          onChange: _this.onInputChange,
          onFocus: _this.onInputFocus,
          onBlur: _this.onInputBlur,
          class: classNameProp,
          ref: _this.setInputRef
        }), null)]);
      },
      suffix: function suffix() {
        return clearable && !isReadonly && !isDisabled && currentValue && "".concat(currentValue).length > 0 ? // @ts-ignore
        _createVNode(TouchFeedback, {
          "activeClassName": "".concat(prefixCls, "-clear-active")
        }, {
          default: function _default() {
            return [_createVNode("div", {
              "class": "".concat(prefixCls, "-clear"),
              "onClick": _this.clearInput
            }, null)];
          }
        }) : null;
      },
      extra: extra !== '' ? function () {
        return _createVNode("div", {
          "class": "".concat(prefixCls, "-extra"),
          "onClick": function onClick(e) {
            _this.$emit('extra-click', e);
          }
        }, [extra]);
      } : null
    };
    return _createVNode(List.Item, {
      "title": this.renderLabel(),
      "required": this.required,
      "error": this.error,
      "errorMessage": this.errorMessage,
      "errorDisplayType": this.errorDisplayType,
      "class": wrapCls
    }, _objectSpread({}, slots));
  }
});