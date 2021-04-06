import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { createVNode as _createVNode, mergeProps as _mergeProps, resolveDirective as _resolveDirective } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { computed, defineComponent, ref, watch } from 'vue';
import List from '../../list';
import { useBaseInputComponent } from '../../mixins/base-input-component';
import { pureInputComponentProps } from '../../mixins/pure-input-component';
import { simpleFormComponentProps } from '../../mixins/simple-form-component';
import Calendar from './index';
var MIN_DATE = new Date(2000, 1, 1, 0, 0, 0);
var MAX_DATE = new Date(new Date().getFullYear() + 10, 12, 31, 23, 59, 59);
export default defineComponent({
  name: 'MCalendarItem',
  props: _objectSpread(_objectSpread(_objectSpread({}, simpleFormComponentProps), pureInputComponentProps), {}, {
    /**
     * 标题
     */
    title: {
      type: [String, Object]
    },

    /**
     * 默认值
     */
    defaultDate: {
      type: Date,
      default: function _default() {
        return new Date();
      }
    },
    minDate: {
      type: Date,
      default: function _default() {
        return MIN_DATE;
      }
    },
    maxDate: {
      type: Date,
      default: function _default() {
        return MAX_DATE;
      }
    },
    pickTime: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'range'
    },
    placeholder: {
      type: String
    }
  }),
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        attrs = _ref.attrs,
        slots = _ref.slots;

    var _useBaseInputComponen = useBaseInputComponent(props, {
      emit: emit,
      attrs: attrs,
      slots: slots
    }),
        getDefaultSlot = _useBaseInputComponen.getDefaultSlot,
        inputSlots = _useBaseInputComponen.slots,
        cssStyle = _useBaseInputComponen.cssStyle,
        listeners = _useBaseInputComponen.listeners,
        inputProps = _useBaseInputComponen.props;

    var currentValue = ref([]);
    var visible = ref(false);
    watch(function () {
      return props.value;
    }, function (value) {
      if (props.type === 'one') {
        currentValue.value = [value];
      } else if (value) {
        currentValue.value = value;
      }
    }, {
      immediate: true
    });
    var displayValue = computed(function () {
      var valueStrs = currentValue.value.map(function (it) {
        if (!it) {
          return null;
        }

        if (props.pickTime) {
          return moment(it).format('YYYY/MM/DD HH:mm');
        } else {
          return moment(it).format('YYYY/MM/DD');
        }
      });

      if (props.type === 'range') {
        if (valueStrs[0] || valueStrs[1]) {
          var _valueStrs$, _valueStrs$2;

          return (_valueStrs$ = valueStrs[0]) !== null && _valueStrs$ !== void 0 ? _valueStrs$ : '' + ' ~ ' + ((_valueStrs$2 = valueStrs[1]) !== null && _valueStrs$2 !== void 0 ? _valueStrs$2 : '');
        }

        return '';
      } else {
        var _valueStrs$3;

        return (_valueStrs$3 = valueStrs[0]) !== null && _valueStrs$3 !== void 0 ? _valueStrs$3 : '';
      }
    });

    var onClick = function onClick() {
      visible.value = true;
    };

    var onConfirm = function onConfirm(value1, value2) {
      if (props.type === 'range') {
        currentValue.value = [value1, value2];
        emit('update:value', [value1, value2]);
      } else {
        currentValue.value = [value1];
        emit('update:value', value1);
      }
    };

    var onClose = function onClose() {
      visible.value = false;
    };

    return {
      onClose: onClose,
      inputProps: inputProps,
      displayValue: displayValue,
      onClick: onClick,
      onConfirm: onConfirm,
      listeners: listeners,
      getDefaultSlot: getDefaultSlot,
      cssStyle: cssStyle,
      inputSlots: inputSlots,
      visible: visible,
      currentValue: currentValue
    };
  },
  render: function render() {
    var _this = this;

    var slots = {
      default: function _default() {
        return [_createVNode(Calendar, _mergeProps(_this.inputProps, _this.listeners, {
          "value": _this.currentValue,
          "visible": _this.visible,
          "onClose": _this.onClose,
          "onConfirm": _this.onConfirm,
          "defaultValue": _this.currentValue,
          "style": _this.cssStyle
        }), _objectSpread({
          default: function _default() {
            return [_this.getDefaultSlot()];
          }
        }, _this.inputSlots)), _createVNode("span", null, [_this.title])];
      },
      extra: function extra() {
        return _createVNode("span", null, [_this.displayValue || _this.placeholder]);
      }
    };
    return _createVNode(List.Item, {
      "text": !!this.displayValue,
      "required": this.required,
      "touchFeedback": true,
      "disabled": this.disabled,
      "arrow": "horizontal",
      "title": this.title,
      "onClick": this.onClick
    }, _objectSpread({}, slots));
  }
});