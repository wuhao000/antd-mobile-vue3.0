import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { mergeProps as _mergeProps, createVNode as _createVNode } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { defineComponent, reactive } from 'vue';
import defaultLocale from './locale/zh_CN';
import Icon from '../../icon';
import { getComponentLocale } from '../../utils/getLocale';
import { CalendarView as VMCalendar } from '../../vmc-calendar';
import CalendarProps from '../../vmc-calendar/calendar-props';

var endOfMonth = function endOfMonth() {
  var now = new Date();
  return new Date(new Date(now.getFullYear(), now.getMonth() + 1, 1).getTime() - 24 * 3600 * 1000);
};

var beginOfMonth = function beginOfMonth() {
  var now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
};

export default defineComponent({
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
  setup: function setup(props) {
    var state = reactive({
      visible: props.visible
    });
    return {
      state: state
    };
  },
  render: function render() {
    var _this = this;

    var locale = getComponentLocale(this.$props, {}, 'Calendar', function () {
      return defaultLocale;
    });
    var Header = VMCalendar.DefaultHeader;
    return (// @ts-ignore
      _createVNode(VMCalendar, _mergeProps({
        "class": this.prefixCls + '-view',
        "locale": locale,
        "renderHeader": function renderHeader(headerProps) {
          return _createVNode(Header, _mergeProps(headerProps, {
            "closeIcon": _createVNode(Icon, {
              "type": "cross"
            }, null)
          }), null);
        },
        "onSelectHasDisableDate": function onSelectHasDisableDate() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this.$emit.apply(_this, ['select-has-disable-date'].concat(args));
        }
      }, _objectSpread(_objectSpread({}, this.$props), {}, {
        type: 'one',
        displayMode: true,
        minDate: this.minDate || beginOfMonth(),
        maxDate: this.maxDate || endOfMonth()
      }), {
        "visible": this.state.visible
      }), null)
    );
  }
});