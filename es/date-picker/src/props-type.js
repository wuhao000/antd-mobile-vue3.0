import locale from './locale/zh_CN';
export var datePickerProps = {
  disabled: {
    type: Boolean
  },
  cancelText: {},
  editable: {
    type: Boolean,
    default: true
  },
  extra: {
    type: String
  },
  format: {},
  locale: {
    type: Object,
    default: function _default() {
      return locale;
    }
  },
  maxDate: {
    type: Date
  },
  minDate: {
    type: Date
  },
  minuteStep: {
    type: Number,
    default: 1
  },
  mode: {
    type: String,
    default: 'datetime'
  },
  okText: {},
  title: {},
  value: {
    type: Object
  },
  visible: {
    type: Boolean,
    default: false
  }
};