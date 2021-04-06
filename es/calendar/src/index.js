import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { mergeProps as _mergeProps, createVNode as _createVNode } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { defineComponent, reactive, watch } from 'vue';
import Icon from '../../icon';
import { getComponentLocale } from '../../utils/getLocale';
import { Calendar as VMCalendar } from '../../vmc-calendar';
import CalendarProps from '../../vmc-calendar/calendar-props';
import defaultLocale from './locale/zh_CN';
export default defineComponent({
  install: null,
  Item: null,
  name: 'Calendar',
  props: _objectSpread(_objectSpread({}, CalendarProps), {}, {
    prefixCls: {
      type: String,
      default: 'am-calendar'
    },
    timePickerPrefixCls: {
      type: String,
      default: 'am-picker'
    },
    timePickerPickerPrefixCls: {
      type: String,
      default: 'am-picker-col'
    }
  }),
  setup: function setup(props, _ref) {
    var emit = _ref.emit;
    var state = reactive({
      visible: props.visible,
      value: props.value
    });
    watch(function () {
      return props.visible;
    }, function (value) {
      state.visible = value;
    });

    var onConfirm = function onConfirm() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      emit.apply(void 0, ['confirm'].concat(args));
      emit('update:value', state.value);
      onClose();
    };

    var onClear = function onClear(e) {
      emit('clear', e);
    };

    var onClose = function onClose() {
      state.visible = false;
      state.value = props.value;

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      emit.apply(void 0, ['close'].concat(args));
      emit('update:visible', false);
    };

    return {
      onClose: onClose,
      onConfirm: onConfirm,
      onClear: onClear,
      state: state
    };
  },
  render: function render() {
    var _this = this;

    var locale = getComponentLocale(this.$props, {}, 'Calendar', function () {
      return defaultLocale;
    });
    var Header = VMCalendar.DefaultHeader;
    return _createVNode(VMCalendar, _mergeProps(this.$props, {
      'value': _this.state.value,
      "onUpdate:value": function onUpdateValue($event) {
        return _this.state.value = $event;
      },
      "locale": locale,
      "renderHeader": function renderHeader(headerProps) {
        return _createVNode(Header, _mergeProps(headerProps, {
          "closeIcon": _createVNode(Icon, {
            "type": "cross"
          }, null)
        }), null);
      },
      "onCancel": function onCancel() {
        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        _this.$emit.apply(_this, ['cancel'].concat(args));
      },
      "onClose": this.onClose,
      "onConfirm": this.onConfirm,
      "onClear": this.onClear,
      "onSelectHasDisableDate": function onSelectHasDisableDate() {
        for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }

        _this.$emit.apply(_this, ['select-has-disable-date'].concat(args));
      },
      "visible": this.state.visible
    }), null);
  }
});