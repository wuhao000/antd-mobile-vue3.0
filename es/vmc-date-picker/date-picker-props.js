import defaultLocale from './locale/zh_CN';
var DATE = 'date';
export default {
  onChange: {},
  value: {
    type: Date
  },
  defaultDate: {
    type: Date,
    default: function _default() {
      return new Date();
    }
  },
  minDate: {
    type: Date
  },
  maxDate: {
    type: Date
  },
  minHour: {
    type: Number
  },
  maxHour: {
    type: Number
  },
  minMinute: {
    type: Number
  },
  maxMinute: {
    type: Number
  },
  mode: {
    type: String,
    default: DATE
  },
  disabled: {
    type: Boolean,
    default: false
  },
  locale: {
    type: Object,
    default: defaultLocale
  },
  minuteStep: {
    type: Number,
    default: 1
  },
  formatMonth: {
    type: Function
  },
  formatDay: {
    type: Function
  },
  itemStyle: {
    type: Function
  },
  prefixCls: {
    type: String,
    default: 'rmc-date-picker'
  },
  rootNativeProps: {},
  pickerPrefixCls: {
    type: String,
    default: 'rmc-picker'
  },
  use12Hours: {
    type: Boolean,
    default: false
  }
};