import defaultLocale from './locale/zh_CN';
export default {
  defaultTimeValue: {
    type: Date,
    default: function _default() {
      return new Date(2000, 0, 1, 8);
    }
  },
  value: {
    type: Array
  },
  defaultValue: {
    type: Array
  },
  displayMode: {
    type: Boolean,
    default: false
  },
  enterDirection: {
    type: String,
    default: 'vertical'
  },
  getDateExtra: {
    type: Function
  },
  infiniteOpt: {
    type: Boolean,
    default: false
  },
  initialMonths: {
    type: Number
  },
  locale: {
    type: Object,
    default: function _default() {
      return defaultLocale;
    }
  },
  maxDate: {
    type: Date
  },
  minDate: {
    type: Date
  },
  onSelect: {
    type: Function
  },
  pickTime: {
    type: Boolean,
    default: false
  },
  prefixCls: {
    type: String,
    default: 'rmc-calendar'
  },
  renderHeader: {
    type: Function
  },
  renderShortcut: {
    type: Function
  },
  rowSize: {},
  showHeader: {
    type: Boolean,
    default: true
  },
  showShortcut: {
    type: Boolean,
    default: false
  },
  timePickerPickerPrefixCls: {
    type: String
  },
  timePickerPrefixCls: {
    type: String
  },
  title: {
    type: String
  },
  type: {
    type: String,
    default: 'range'
  },
  visible: {
    type: Boolean,
    default: false
  }
};