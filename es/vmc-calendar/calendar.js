import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { createVNode as _createVNode, isVNode as _isVNode } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { defineComponent, watch } from 'vue';
import Popup from '../popup';
import { useBaseCalendar } from './calendar-base';
import CalendarProps from './calendar-props';
import Header from './calendar/header';
import ShortcutPanel from './calendar/shortcut-panel';

function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !_isVNode(s);
}

var Calendar = defineComponent({
  DefaultHeader: Header,
  DefaultShortcut: ShortcutPanel,
  name: 'Calendar',
  props: _objectSpread({}, CalendarProps),
  setup: function setup(props, ctx) {
    var _useBaseCalendar = useBaseCalendar(props, ctx),
        state = _useBaseCalendar.state,
        shortcutSelect = _useBaseCalendar.shortcutSelect,
        onClose = _useBaseCalendar.onClose,
        renderCalendar = _useBaseCalendar.renderCalendar;

    watch(function () {
      return props.visible;
    }, function () {
      state.visible = props.visible;
      var defaultValue = props.defaultValue;

      if (props.visible && defaultValue) {
        shortcutSelect(defaultValue[0], defaultValue[1]);
      }
    });
    return {
      onClose: onClose,
      state: state,
      renderCalendar: renderCalendar
    };
  },
  render: function render() {
    var _slot;

    var height = document.body.clientHeight;
    var popupProps = {
      onClose: this.onClose,
      visible: this.visible,
      height: "".concat(height, "px"),
      width: "".concat(height, "px"),
      value: this.state.visible,
      placement: this.enterDirection === 'vertical' ? 'bottom' : 'right'
    };
    return _createVNode(Popup, popupProps, _isSlot(_slot = this.renderCalendar()) ? _slot : {
      default: function _default() {
        return [_slot];
      }
    });
  }
});
export default Calendar;