import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { isVNode as _isVNode, createVNode as _createVNode } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { defineComponent, inject, onBeforeUpdate, reactive, ref, watch } from 'vue';
import MultiPicker from '../vmc-picker/multi-picker';
import RMCPicker from '../vmc-picker/picker';
import DatePickerProps from './date-picker-props';

function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !_isVNode(s);
}

var HOURS_OF_DAY = 24;
var HOURS_HALF_DAY = 12;

function getDaysInMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

function pad(n) {
  return n < 10 ? "0".concat(n) : n;
}

function cloneDate(date) {
  return new Date(+date);
}

function setMonth(date, month) {
  date.setDate(Math.min(date.getDate(), getDaysInMonth(new Date(date.getFullYear(), month))));
  date.setMonth(month);
}

var DATETIME = 'datetime';
var DATE = 'date';
var TIME = 'time';
var MONTH = 'month';
var YEAR = 'year';
var ONE_DAY = HOURS_OF_DAY * 60 * 60 * 1000;
export default defineComponent({
  name: 'DatePicker',
  props: _objectSpread({}, DatePickerProps),
  setup: function setup(props, _ref) {
    var emit = _ref.emit;
    var state = reactive({
      value: props.value || props.defaultDate,
      values: null
    });

    var getMinDate = function getMinDate() {
      return props.minDate || getDefaultMinDate();
    };

    var getMaxDate = function getMaxDate() {
      return props.maxDate || getDefaultMaxDate();
    };

    var clipDate = function clipDate(date) {
      var mode = props.mode;
      var minDate = getMinDate();
      var maxDate = getMaxDate();

      if (mode === DATETIME) {
        if (date < minDate) {
          return cloneDate(minDate);
        }

        if (date > maxDate) {
          return cloneDate(maxDate);
        }
      } else if (mode === DATE || mode === YEAR || mode === MONTH) {
        if (minDate.getTime() >= date.getTime() + ONE_DAY) {
          return cloneDate(minDate);
        }

        if (date.getTime() >= maxDate.getTime() + ONE_DAY) {
          return cloneDate(maxDate);
        }
      } else if (mode === TIME) {
        var maxHour = maxDate.getHours();
        var maxMinutes = maxDate.getMinutes();
        var minHour = minDate.getHours();
        var minMinutes = minDate.getMinutes();
        var hour = date.getHours();
        var minutes = date.getMinutes();

        if (hour < minHour || hour === minHour && minutes < minMinutes) {
          return cloneDate(minDate);
        }

        if (hour > maxHour || hour === maxHour && minutes > maxMinutes) {
          return cloneDate(maxDate);
        }
      }

      return date;
    };

    var getDate = function getDate() {
      return clipDate(state.value || getDefaultMinDate());
    };

    var getDateData = function getDateData() {
      var locale = props.locale,
          formatMonth = props.formatMonth,
          formatDay = props.formatDay,
          mode = props.mode;
      var date = getDate();
      var selYear = date.getFullYear();
      var selMonth = date.getMonth();
      var minDateYear = getMinYear();
      var maxDateYear = getMaxYear();
      var minDateMonth = getMinMonth();
      var maxDateMonth = getMaxMonth();
      var minDateDay = getMinDay();
      var maxDateDay = getMaxDay();
      var years = [];

      for (var i = minDateYear; i <= maxDateYear; i++) {
        years.push({
          value: i,
          label: "".concat(i).concat(locale.year)
        });
      }

      var yearCol = {
        key: 'year',
        props: {
          children: years
        }
      };

      if (mode === YEAR) {
        return [yearCol];
      }

      var months = [];
      var minMonth = 0;
      var maxMonth = 11;

      if (minDateYear === selYear) {
        minMonth = minDateMonth;
      }

      if (maxDateYear === selYear) {
        maxMonth = maxDateMonth;
      }

      for (var _i = minMonth; _i <= maxMonth; _i++) {
        var label = formatMonth ? formatMonth(_i, date) : "".concat(_i + 1 + locale.month);
        months.push({
          value: _i,
          label: label
        });
      }

      var monthCol = {
        key: 'month',
        props: {
          children: months
        }
      };

      if (mode === MONTH) {
        return [yearCol, monthCol];
      }

      var days = [];
      var minDay = 1;
      var maxDay = getDaysInMonth(date);

      if (minDateYear === selYear && minDateMonth === selMonth) {
        minDay = minDateDay;
      }

      if (maxDateYear === selYear && maxDateMonth === selMonth) {
        maxDay = maxDateDay;
      }

      for (var _i2 = minDay; _i2 <= maxDay; _i2++) {
        var _label = formatDay ? formatDay(_i2, date) : _i2 + locale.day;

        days.push({
          value: _i2,
          label: _label
        });
      }

      return [yearCol, monthCol, {
        key: 'day',
        props: {
          children: days
        }
      }];
    };

    var getValueCols = function getValueCols() {
      var minDate = getMinDate();
      var maxDate = getMaxDate();

      if (minDate > maxDate) {
        throw new Error('最大日期不能小于最小日期');
      }

      var mode = props.mode,
          use12Hours = props.use12Hours;
      var date = getDate();
      var cols = [];
      var value = [];

      if (mode === YEAR) {
        return {
          cols: getDateData(),
          value: [date.getFullYear()]
        };
      }

      if (mode === MONTH) {
        return {
          cols: getDateData(),
          value: [date.getFullYear(), date.getMonth()]
        };
      }

      if (mode === DATETIME || mode === DATE) {
        cols = getDateData();
        value = [date.getFullYear(), date.getMonth(), date.getDate()];
      }

      if (mode === DATETIME || mode === TIME) {
        var time = getTimeData(date);
        cols = cols.concat(time.cols);
        var hour = date.getHours();
        var dtValue = [hour, time.selMinute];
        var nhour = hour;

        if (use12Hours) {
          nhour = hour === 0 ? HOURS_HALF_DAY : hour > HOURS_HALF_DAY ? hour - HOURS_HALF_DAY : hour;
          dtValue = [nhour, time.selMinute, hour >= HOURS_HALF_DAY ? 1 : 0];
        }

        value = value.concat(dtValue);
      }

      return {
        value: value,
        cols: cols
      };
    };

    var defaultMinDate = ref(null);
    var defaultMaxDate = ref(null);
    var store = inject('store');

    var getDefaultMinDate = function getDefaultMinDate() {
      if (!defaultMinDate.value) {
        defaultMinDate.value = new Date(2000, 1, 1, 0, 0, 0);
      }

      return defaultMinDate.value;
    };

    var getDefaultMaxDate = function getDefaultMaxDate() {
      if (!defaultMaxDate.value) {
        defaultMaxDate.value = new Date(2099, 1, 1, 23, 59, 59);
      }

      return defaultMaxDate.value;
    };

    var getMinYear = function getMinYear() {
      return getMinDate().getFullYear();
    };

    var getMaxYear = function getMaxYear() {
      return getMaxDate().getFullYear();
    };

    var getMinMonth = function getMinMonth() {
      return getMinDate().getMonth();
    };

    var getMaxMonth = function getMaxMonth() {
      return getMaxDate().getMonth();
    };

    var getMinDay = function getMinDay() {
      return getMinDate().getDate();
    };

    var getMaxDay = function getMaxDay() {
      return getMaxDate().getDate();
    };

    var getMinHour = function getMinHour() {
      return getMinDate().getHours();
    };

    var getMaxHour = function getMaxHour() {
      return getMaxDate().getHours();
    };

    var getMinMinute = function getMinMinute() {
      return getMinDate().getMinutes();
    };

    var getMaxMinute = function getMaxMinute() {
      return getMaxDate().getMinutes();
    };

    var getDisplayHour = function getDisplayHour(rawHour) {
      // 12 hour am (midnight 00:00) -> 12 hour pm (noon 12:00) -> 12 hour am (midnight 00:00)
      if (props.use12Hours) {
        if (rawHour === 0) {
          return HOURS_HALF_DAY;
        }

        if (rawHour > HOURS_HALF_DAY) {
          return rawHour - HOURS_HALF_DAY;
        }
      }

      return rawHour;
    };

    var getTimeData = function getTimeData(date) {
      var _props$minHour = props.minHour,
          minHour = _props$minHour === void 0 ? 0 : _props$minHour,
          _props$maxHour = props.maxHour,
          maxHour = _props$maxHour === void 0 ? HOURS_OF_DAY - 1 : _props$maxHour,
          _props$minMinute = props.minMinute,
          minMinute = _props$minMinute === void 0 ? 0 : _props$minMinute,
          _props$maxMinute = props.maxMinute,
          maxMinute = _props$maxMinute === void 0 ? 59 : _props$maxMinute;
      var mode = props.mode,
          locale = props.locale,
          minuteStep = props.minuteStep,
          use12Hours = props.use12Hours;
      var minDateMinute = getMinMinute();
      var maxDateMinute = getMaxMinute();
      var minDateHour = getMinHour();
      var maxDateHour = getMaxHour();
      var hour = date.getHours();

      if (mode === DATETIME) {
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDate();
        var minDateYear = getMinYear();
        var maxDateYear = getMaxYear();
        var minDateMonth = getMinMonth();
        var maxDateMonth = getMaxMonth();
        var minDateDay = getMinDay();
        var maxDateDay = getMaxDay();

        if (minDateYear === year && minDateMonth === month && minDateDay === day) {
          minHour = minDateHour;

          if (minDateHour === hour) {
            minMinute = minDateMinute;
          }
        }

        if (maxDateYear === year && maxDateMonth === month && maxDateDay === day) {
          maxHour = maxDateHour;

          if (maxDateHour === hour) {
            maxMinute = maxDateMinute;
          }
        }
      } else {
        minHour = minDateHour;

        if (minDateHour === hour) {
          minMinute = minDateMinute;
        }

        maxHour = maxDateHour;

        if (maxDateHour === hour) {
          maxMinute = maxDateMinute;
        }
      }

      var hours = [];

      if (minHour === 0 && maxHour === 0 || minHour !== 0 && maxHour !== 0) {
        minHour = getDisplayHour(minHour);
      } else if (minHour === 0 && use12Hours) {
        minHour = 1;
        hours.push({
          value: '0',
          label: locale.hour ? '12' + locale.hour : '12'
        });
      }

      maxHour = getDisplayHour(maxHour);

      for (var i = minHour; i <= maxHour; i++) {
        hours.push({
          value: i,
          label: locale.hour ? i + locale.hour : pad(i)
        });
      }

      var minutes = [];
      var selMinute = date.getMinutes();

      for (var _i3 = minMinute; _i3 <= maxMinute; _i3 += minuteStep) {
        minutes.push({
          value: _i3,
          label: locale.minute ? _i3 + locale.minute : pad(_i3)
        });

        if (selMinute > _i3 && selMinute < _i3 + minuteStep) {
          minutes.push({
            value: selMinute,
            label: locale.minute ? selMinute + locale.minute : pad(selMinute)
          });
        }
      }

      var cols = [{
        key: 'hours',
        props: {
          children: hours
        }
      }, {
        key: 'minutes',
        props: {
          children: minutes
        }
      }].concat(use12Hours ? [{
        key: 'ampm',
        props: {
          children: [{
            value: 0,
            label: locale.am
          }, {
            value: 1,
            label: locale.pm
          }]
        }
      }] : []);
      return {
        cols: cols,
        selMinute: selMinute
      };
    };

    watch(function () {
      return state.value;
    }, function () {
      var _getValueCols = getValueCols(),
          value = _getValueCols.value;

      state.values = value;
    }, {
      immediate: true
    });
    onBeforeUpdate(function () {
      if (props.value !== undefined) {
        state.value = props.value || props.defaultDate;
      }
    });

    var getNewDate = function getNewDate(values, index) {
      var value = parseInt(values[index], 10);
      var mode = props.mode;
      var newValue = cloneDate(getDate());

      if (mode === DATETIME || mode === DATE || mode === YEAR || mode === MONTH) {
        switch (index) {
          case 0:
            newValue.setFullYear(value);
            break;

          case 1:
            // Note: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth
            // e.g. from 2017-03-31 to 2017-02-28
            setMonth(newValue, value);
            break;

          case 2:
            newValue.setDate(value);
            break;

          case 3:
            setHours(newValue, value);
            break;

          case 4:
            newValue.setMinutes(value);
            break;

          case 5:
            setAmPm(newValue, value);
            break;

          default:
            break;
        }
      } else if (mode === TIME) {
        switch (index) {
          case 0:
            setHours(newValue, value);
            break;

          case 1:
            newValue.setMinutes(value);
            break;

          case 2:
            setAmPm(newValue, value);
            break;

          default:
            break;
        }
      }

      return clipDate(newValue);
    };

    var onOk = function onOk() {
      var newValue = cloneDate(getDate());
      newValue.setSeconds(0);
      var values = state.values;

      switch (props.mode) {
        case 'date':
          newValue.setFullYear(parseInt(values[0]));
          setMonth(newValue, values[1]);
          newValue.setDate(values[2]);
          setHours(newValue, 0);
          newValue.setMinutes(0);
          break;

        case 'year':
          newValue.setFullYear(parseInt(values[0]));
          break;

        case 'month':
          newValue.setFullYear(parseInt(values[0]));
          setMonth(newValue, values[1]);
          break;

        case 'time':
          setHours(newValue, values[0]);
          newValue.setMinutes(values[1]);

          if (props.use12Hours) {
            setAmPm(newValue, values[2]);
          }

          break;

        case 'datetime':
          newValue.setFullYear(parseInt(values[0]));
          setMonth(newValue, values[1]);
          newValue.setDate(values[2]);
          setHours(newValue, values[3]);
          newValue.setMinutes(values[4]);

          if (props.use12Hours) {
            setAmPm(newValue, values[5]);
          }

          break;
      }

      emit('update:value', newValue);
    };

    var onCancel = function onCancel() {
      var _getValueCols2 = getValueCols(),
          value = _getValueCols2.value;

      state.values = value;
      emit('cancel', value);
    };

    var onValueChange = function onValueChange(values, index) {
      if (!Array.isArray(values)) {
        throw new Error('MultiPicker返回了非法数值：' + JSON.stringify(values));
      }

      state.values = values;
      emit('change', getNewDate(values, index));
    };

    var setHours = function setHours(date, hour) {
      if (props.use12Hours) {
        var dh = date.getHours();
        var nhour;
        nhour = dh >= HOURS_HALF_DAY ? hour + HOURS_HALF_DAY : hour;
        nhour = nhour >= HOURS_OF_DAY ? 0 : nhour; // Make sure no more than one day

        date.setHours(nhour);
      } else {
        date.setHours(hour);
      }
    };

    var setAmPm = function setAmPm(date, index) {
      if (index === 0) {
        date.setTime(+date - ONE_DAY / 2);
      } else {
        date.setTime(+date + ONE_DAY / 2);
      }
    };

    if (store) {
      store.onOk = onOk;
      store.onCancel = onCancel;
    }

    return {
      getValueCols: getValueCols,
      state: state,
      onValueChange: onValueChange
    };
  },
  render: function render() {
    var _slot;

    var _this$getValueCols = this.getValueCols(),
        cols = _this$getValueCols.cols;

    var value = this.state.values;
    var disabled = this.disabled,
        pickerPrefixCls = this.pickerPrefixCls,
        prefixCls = this.prefixCls,
        itemStyle = this.itemStyle;

    var pickerProps = _defineProperty({
      style: {
        flexDirection: 'row',
        alignItems: 'center'
      },
      prefixCls: prefixCls,
      value: value
    }, 'onUpdate:value', this.onValueChange);

    return _createVNode(MultiPicker, pickerProps, _isSlot(_slot = cols.map(function (p) {
      return _createVNode(RMCPicker, {
        "disabled": disabled,
        "prefixCls": pickerPrefixCls,
        "itemStyle": itemStyle,
        "data": p.props.children,
        "style": {
          flex: 1
        },
        "key": p.key
      }, null);
    })) ? _slot : {
      default: function _default() {
        return [_slot];
      }
    });
  }
});