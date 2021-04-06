import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { mergeProps as _mergeProps, resolveDirective as _resolveDirective, createVNode as _createVNode } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { defineComponent, ref } from 'vue';
import List from '../../list';
import { useBaseInputComponent } from '../../mixins/base-input-component';
import { formComponentProps } from '../../mixins/form-component';
import DatePicker from './index';
export default defineComponent({
  name: 'DatePickerItem',
  props: _objectSpread(_objectSpread({}, formComponentProps), {}, {
    title: {
      type: [String, Object]
    }
  }),
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots,
        attrs = _ref.attrs;

    var _useBaseInputComponen = useBaseInputComponent(props, {
      emit: emit,
      slots: slots,
      attrs: attrs
    }),
        stateValue = _useBaseInputComponen.stateValue,
        isDisabled = _useBaseInputComponen.isDisabled,
        cssStyle = _useBaseInputComponen.cssStyle,
        isReadonly = _useBaseInputComponen.isReadonly;

    var localVisible = ref(false);
    return {
      stateValue: stateValue,
      localVisible: localVisible,
      isDisabled: isDisabled,
      isReadonly: isReadonly,
      cssStyle: cssStyle
    };
  },
  render: function render() {
    var _this = this;

    return _createVNode(DatePicker, _mergeProps(this.$attrs, {
      "disabled": this.isDisabled,
      "editable": !this.isReadonly,
      'value': _this.stateValue,
      "onUpdate:value": function onUpdateValue($event) {
        return _this.stateValue = $event;
      },
      'visible': _this.localVisible,
      "onUpdate:visible": function onUpdateVisible($event) {
        return _this.localVisible = $event;
      },
      "style": this.cssStyle
    }), _objectSpread({
      default: function _default() {
        return [_createVNode(List.Item, {
          "title": _this.title,
          "touchFeedback": true,
          "onClick": function onClick() {
            _this.localVisible = true;
          },
          "required": _this.required,
          "disabled": _this.isDisabled,
          "error": _this.error,
          "errorDisplayType": _this.errorDisplayType,
          "errorMessage": _this.errorMessage,
          "arrow": "horizontal"
        }, null)];
      }
    }, this.$slots));
  }
});