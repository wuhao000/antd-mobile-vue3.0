import _defineProperty from "@babel/runtime/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { defineComponent } from 'vue';
import { useBaseCalendar } from './calendar-base';
import CalendarProps from './calendar-props';
var CalendarView = defineComponent({
  name: 'CalendarView',
  props: _objectSpread({}, CalendarProps),
  setup: function setup(props, ctx) {
    var _useBaseCalendar = useBaseCalendar(props, ctx),
        renderCalendar = _useBaseCalendar.renderCalendar;

    return {
      renderCalendar: renderCalendar
    };
  },
  render: function render() {
    return this.renderCalendar();
  }
});
export default CalendarView;