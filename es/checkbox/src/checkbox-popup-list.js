import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { mergeProps as _mergeProps, resolveDirective as _resolveDirective, createTextVNode as _createTextVNode, createVNode as _createVNode, resolveComponent as _resolveComponent } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { computed, defineComponent, ref, watch } from 'vue';
import List from '../../list';
import { optionsBasedComponentProps, useOptionsBaseComponent } from '../../mixins/options-based-component';
import Popup from '../../popup';
import CheckboxList from './checkbox-list';
export default defineComponent({
  name: 'MCheckboxPopupList',
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
    },
    separator: {
      type: String,
      default: '、'
    },
    visible: {
      type: Boolean,
      default: false
    },
    searchable: {
      type: Boolean,
      default: false
    }
  }),
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots,
        attrs = _ref.attrs;

    var _useOptionsBaseCompon = useOptionsBaseComponent(props, {
      emit: emit,
      slots: slots,
      attrs: attrs
    }),
        getOptions = _useOptionsBaseCompon.getOptions,
        searchKeyword = _useOptionsBaseCompon.searchKeyword,
        isReadonly = _useOptionsBaseCompon.isReadonly,
        stateValue = _useOptionsBaseCompon.stateValue,
        isDisabled = _useOptionsBaseCompon.isDisabled;

    var popupVisible = ref(props.visible);
    watch(function () {
      return props.visible;
    }, function (visible) {
      popupVisible.value = visible;
    });
    watch(function () {
      return popupVisible.value;
    }, function (popupVisible) {
      emit('update:visible', popupVisible);
    });
    var optionText = computed(function () {
      var options = getOptions(); // @ts-ignore

      var value = stateValue.value;
      var array = [];

      if (value) {
        value.forEach(function (v, index) {
          var option = options.find(function (it) {
            return it.value === v;
          });

          if (option) {
            array.push(option.label);
          } else {
            array.push(v);
          }

          if (index < value.length - 1) {
            array.push(props.separator);
          }
        });
      }

      return array;
    });

    var onChange = function onChange(value) {
      stateValue.value = value;
      emit('update:value', stateValue.value);
      emit('change', stateValue.value);
    };

    var onClick = function onClick() {
      if (!isDisabled.value && !isReadonly.value) {
        popupVisible.value = true;
      }
    };

    var onClear = function onClear() {
      emit('clear');
      emit('update:value', []);
      closePopup();
    };

    var closePopup = function closePopup() {
      popupVisible.value = false;
    };

    var renderSearch = function renderSearch() {
      return props.searchable ? _createVNode(_resolveComponent("m-search-bar"), {
        "value": searchKeyword.value,
        "onInput": function onInput(v) {
          searchKeyword.value = v;
        }
      }, null) : null;
    };

    return {
      onChange: onChange,
      stateValue: stateValue,
      getOptions: getOptions,
      onClick: onClick,
      isDisabled: isDisabled,
      isReadonly: isReadonly,
      closePopup: closePopup,
      onClear: onClear,
      renderSearch: renderSearch,
      popupVisible: popupVisible,
      optionText: optionText
    };
  },
  render: function render() {
    var _this = this;

    var listProps = _objectSpread(_objectSpread(_objectSpread({}, this.$attrs), this.$props), {}, {
      options: this.getOptions()
    });

    var stateValue = this.stateValue,
        placeholder = this.placeholder;
    listProps.title = undefined;

    var cancelButton = _createVNode("div", {
      "onClick": this.onClear,
      "class": "am-popup-item am-popup-header-left"
    }, [_createTextVNode("\u6E05\u9664")]);

    var slots = {
      extra: function extra() {
        return _createVNode("span", null, [stateValue && stateValue.length ? _this.optionText : placeholder]);
      },
      default: function _default() {
        return _createVNode("span", null, [_this.title]);
      }
    };
    return [_createVNode(List.Item, {
      "onClick": this.onClick,
      "touchFeedback": !this.isReadonly && !this.isDisabled,
      "required": this.required,
      "text": !!this.optionText,
      "disabled": this.isDisabled
    }, _objectSpread({}, slots)), _createVNode(Popup, {
      "visible": this.isDisabled ? false : this.popupVisible,
      "showCancel": this.clearable,
      "cancelButton": cancelButton,
      "title": this.title,
      "onOk": this.closePopup,
      "onCancel": this.closePopup
    }, {
      default: function _default() {
        return [_this.renderSearch(), _createVNode(CheckboxList, _mergeProps(listProps, {
          "maxHeightPercentage": 0.7,
          "onChange": _this.onChange
        }), null)];
      }
    })];
  }
});