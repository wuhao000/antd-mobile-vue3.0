import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { resolveDirective as _resolveDirective, createTextVNode as _createTextVNode, createVNode as _createVNode, mergeProps as _mergeProps } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import classnames from 'classnames';
import { defineComponent, onBeforeUnmount, onMounted, onUpdated, reactive, ref, watch } from 'vue';
import List from '../../list';
import { formComponentProps, useFormComponent } from '../../mixins/form-component';
import { IS_IOS } from '../../utils/exenv';
import TouchFeedback from '../../vmc-feedback';

function fixControlledValue(value) {
  if (typeof value === 'undefined' || value === null) {
    return '';
  }

  return value;
}

var regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]|\n/g;

function countSymbols() {
  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return text.replace(regexAstralSymbols, '_').length;
}

export default defineComponent({
  name: 'MTextarea',
  props: _objectSpread(_objectSpread({}, formComponentProps), {}, {
    prefixCls: {
      type: String,
      default: 'am-textarea'
    },
    prefixListCls: {
      type: String,
      default: 'am-list'
    },
    title: {
      type: String
    },
    maxLength: {
      type: Number
    },
    name: {
      type: String
    },
    placeholder: {
      default: ''
    },
    clearable: {
      type: Boolean,
      default: false
    },
    rows: {
      type: Number,
      default: 1
    },
    count: {
      type: Number
    },
    autoHeight: {
      type: Boolean,
      default: false
    },
    labelNumber: {
      type: Number,
      default: 5
    }
  }),
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots,
        attrs = _ref.attrs;

    var _useFormComponent = useFormComponent(props, {
      emit: emit
    }),
        isReadonly = _useFormComponent.isReadonly,
        isDisabled = _useFormComponent.isDisabled;

    var debounceTimeout = ref(null);
    var state = reactive({
      focus: false,
      value: props.value || ''
    });
    watch(function () {
      return props.value;
    }, function (value) {
      state.value = fixControlledValue(value);
    });
    watch(function () {
      return state.value;
    }, function (value) {
      emit('update:value', value);
    });
    var textareaRef = ref(null);

    var focus = function focus() {
      textareaRef.value.focus();
    };

    var reAlignHeight = function reAlignHeight() {
      var textareaDom = textareaRef.value;
      textareaDom.style.height = ''; // 字数减少时能自动减小高度

      textareaDom.style.height = "".concat(textareaDom.scrollHeight, "px");
    };

    var onChange = function onChange(e) {
      var value = e.target.value;
      state.value = value;
      emit('change', value);
    };

    var onBlur = function onBlur(e) {
      debounceTimeout.value = setTimeout(function () {
        if (document.activeElement !== textareaRef.value) {
          state.focus = false;
        }
      }, 150);
      var value = e.currentTarget.value; // fix autoFocus item blur with flash

      setTimeout(function () {
        // fix ios12 wechat browser click failure after input
        if (document.body) {
          document.body.scrollTop = document.body.scrollTop;
        }
      }, 100);
      emit('blur', value);
    };

    var onFocus = function onFocus(e) {
      if (debounceTimeout.value) {
        clearTimeout(debounceTimeout.value);
        debounceTimeout.value = null;
      }

      state.focus = true;
      var value = e.currentTarget.value;
      emit('focus', value);
    };

    var clearInput = function clearInput() {
      state.value = '';
      emit('change', '');
    };

    var onInput = function onInput(e) {
      state.value = e.target.value;

      if (props.autoHeight && state.focus) {
        reAlignHeight();
      }
    };

    onMounted(function () {
      if (props.autoHeight) {
        reAlignHeight();
      }
    });
    onUpdated(function () {
      if (props.autoHeight && state.focus) {
        reAlignHeight();
      }
    });
    onBeforeUnmount(function () {
      if (debounceTimeout.value) {
        clearTimeout(debounceTimeout.value);
        debounceTimeout.value = null;
      }
    });
    return {
      setTextareaRef: function setTextareaRef(el) {
        textareaRef.value = el;
      },
      state: state,
      isDisabled: isDisabled,
      isReadonly: isReadonly,
      onInput: onInput,
      onChange: onChange,
      onBlur: onBlur,
      onFocus: onFocus,
      clearInput: clearInput,
      focus: focus
    };
  },
  render: function render() {
    var _classnames,
        _this = this;

    var prefixCls = this.prefixCls,
        prefixListCls = this.prefixListCls,
        editable = this.editable,
        clearable = this.clearable,
        count = this.count,
        labelNumber = this.labelNumber,
        title = this.title,
        autoHeight = this.autoHeight,
        disabled = this.disabled;
    var _ref2 = this.state,
        value = _ref2.value,
        focus = _ref2.focus;
    var hasCount = count > 0 && this.rows > 1;
    var wrapCls = classnames("".concat(prefixListCls, "-item"), "".concat(prefixCls, "-item"), (_classnames = {}, _defineProperty(_classnames, "".concat(prefixCls, "-disabled"), disabled), _defineProperty(_classnames, "".concat(prefixCls, "-item-single-line"), this.rows === 1 && !autoHeight), _defineProperty(_classnames, "".concat(prefixCls, "-focus"), focus), _defineProperty(_classnames, "".concat(prefixCls, "-has-count"), hasCount), _classnames));
    var characterLength = countSymbols(value);
    var lengthCtrlProps = {};

    if (count > 0) {
      // Note: If in the iOS environment of dev-tools, It will fail.
      if (IS_IOS) {
        var entValue = value ? value.replace(regexAstralSymbols, '_') : '';
        var entLen = entValue ? entValue.split('_').length - 1 : 0;
        lengthCtrlProps.maxLength = count + entLen - characterLength + (value ? value.length : 0);
      } else {
        lengthCtrlProps.maxLength = count - characterLength + (value ? value.length : 0);
      }
    }

    var slots = {
      extra: function extra() {
        return _createVNode("div", {
          "class": "".concat(prefixCls, "-control"),
          "slot": "extra"
        }, [_createVNode("textarea", _mergeProps({
          "ref": _this.setTextareaRef
        }, lengthCtrlProps, {
          "rows": _this.rows,
          "disabled": _this.isDisabled,
          "name": _this.name,
          "placeholder": _this.placeholder,
          "value": value,
          "oninput": _this.onInput,
          "onChange": _this.onChange,
          "onBlur": _this.onBlur,
          "onFocus": _this.onFocus,
          "readOnly": !editable
        }), null), clearable && editable && value && characterLength > 0 && // @ts-ignore
        _createVNode(TouchFeedback, {
          "activeClassName": "".concat(prefixCls, "-clear-active")
        }, {
          default: function _default() {
            return [_createVNode("div", {
              "class": "".concat(prefixCls, "-clear"),
              "onClick": _this.clearInput
            }, null)];
          }
        }), hasCount && _createVNode("span", {
          "class": "".concat(prefixCls, "-count")
        }, [_createVNode("span", null, [value ? characterLength : 0]), _createTextVNode("/"), count])]);
      }
    };
    return _createVNode(List.Item, {
      "class": wrapCls,
      "required": this.required,
      "disabled": this.isDisabled,
      "title": title
    }, _objectSpread({}, slots));
  }
});