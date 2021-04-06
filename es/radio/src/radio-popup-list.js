import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { mergeProps as _mergeProps, resolveDirective as _resolveDirective, Fragment as _Fragment, createVNode as _createVNode, createTextVNode as _createTextVNode } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { computed, defineComponent, ref } from 'vue';
import List from '../../list';
import { optionsBasedComponentProps, useOptionsBaseComponent } from '../../mixins/options-based-component';
import Popup from '../../popup';
import RadioList from './radio-list';
export default defineComponent({
  name: 'MRadioPopupList',
  props: _objectSpread(_objectSpread({}, optionsBasedComponentProps), {}, {
    title: {
      type: [String, Object]
    },
    placeholder: {
      type: String
    },
    clearable: {
      type: Boolean,
      default: false
    }
  }),
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots,
        attrs = _ref.attrs;
    var popupVisible = ref(false);

    var _useOptionsBaseCompon = useOptionsBaseComponent(props, {
      emit: emit,
      slots: slots,
      attrs: attrs
    }),
        getOptions = _useOptionsBaseCompon.getOptions,
        isDisabled = _useOptionsBaseCompon.isDisabled,
        isReadonly = _useOptionsBaseCompon.isReadonly,
        stateValue = _useOptionsBaseCompon.stateValue;

    var optionText = computed(function () {
      var options = getOptions();
      var value = stateValue.value;
      var selectedOption = options.find(function (it) {
        return value === it.value;
      });
      return selectedOption && selectedOption.label;
    });

    var onCancel = function onCancel() {
      closePopup();
    };

    var onChange = function onChange(value) {
      stateValue.value = value;
      popupVisible.value = false;
    };

    var onClick = function onClick() {
      if (!isDisabled.value && !isReadonly.value) {
        popupVisible.value = true;
      }
    };

    var onClear = function onClear() {
      emit('clear');
      emit('update:value', null);
      closePopup();
    };

    var closePopup = function closePopup() {
      popupVisible.value = false;
    };

    return {
      onClick: onClick,
      onChange: onChange,
      onCancel: onCancel,
      onClear: onClear,
      getOptions: getOptions,
      stateValue: stateValue,
      closePopup: closePopup,
      optionText: optionText,
      popupVisible: popupVisible,
      isDisabled: isDisabled
    };
  },
  render: function render() {
    var _this = this;

    var listProps = _objectSpread(_objectSpread(_objectSpread({}, this.$attrs), this.$props), {}, {
      options: this.getOptions()
    });

    listProps.title = undefined;

    var cancelButton = _createVNode("div", {
      "onClick": this.onClear,
      "class": "am-popup-item am-popup-header-left"
    }, [_createTextVNode("\u6E05\u9664")]);

    var optionText = this.optionText,
        placeholder = this.placeholder,
        stateValue = this.stateValue,
        closePopup = this.closePopup,
        title = this.title,
        clearable = this.clearable,
        onClick = this.onClick,
        readOnly = this.readOnly,
        isDisabled = this.isDisabled,
        disabled = this.disabled;
    var slots = {
      extra: function extra() {
        return _createVNode("span", null, [stateValue !== undefined && stateValue !== null ? optionText : placeholder]);
      },
      default: function _default() {
        return _createVNode("span", null, [title]);
      }
    };
    return _createVNode(_Fragment, null, [_createVNode(List.Item, {
      "onClick": onClick,
      "text": !!optionText,
      "required": this.required,
      "touchFeedback": !readOnly && !disabled,
      "disabled": isDisabled
    }, _objectSpread({}, slots)), _createVNode(Popup, {
      "visible": isDisabled ? false : this.popupVisible,
      "showCancel": clearable,
      "cancelButton": cancelButton,
      "title": title,
      "onOk": closePopup,
      "onCancel": closePopup
    }, {
      default: function _default() {
        return [_createVNode(RadioList, _mergeProps(listProps, {
          "maxHeightPercentage": 0.7,
          "onChange": _this.onChange
        }), null)];
      }
    })]);
  }
});