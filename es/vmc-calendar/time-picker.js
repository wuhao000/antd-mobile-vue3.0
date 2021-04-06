import { createVNode as _createVNode } from "vue";
import { defineComponent } from 'vue';
import DateTimePicker from '../vmc-date-picker';
export var MIN_DATE = new Date(0, 0, 0, 0, 0);
export var MAX_DATE = new Date(9999, 11, 31, 23, 59, 59);
var TimePicker = defineComponent({
  name: 'TimePicker',
  props: {
    locale: {
      type: Object
    },
    prefixCls: String,
    pickerPrefixCls: String,
    title: String,
    defaultValue: Date,
    value: Date,
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
    clientHeight: {
      type: Number
    }
  },
  setup: function setup(props, _ref) {
    var emit = _ref.emit;

    var onDateChange = function onDateChange(date) {
      emit('change', date);
    };

    var getMinTime = function getMinTime(date) {
      var minDate = props.minDate;

      if (!date || date.getFullYear() > minDate.getFullYear() || date.getMonth() > minDate.getMonth() || date.getDate() > minDate.getDate()) {
        return MIN_DATE;
      }

      return minDate;
    };

    var getMaxTime = function getMaxTime(date) {
      var maxDate = props.maxDate;

      if (!date || date.getFullYear() < maxDate.getFullYear() || date.getMonth() < maxDate.getMonth() || date.getDate() < maxDate.getDate()) {
        return MAX_DATE;
      }

      return maxDate;
    };

    return {
      getMinTime: getMinTime,
      getMaxTime: getMaxTime,
      onDateChange: onDateChange
    };
  },
  render: function render() {
    var locale = this.locale,
        title = this.title,
        value = this.value,
        defaultValue = this.defaultValue,
        prefixCls = this.prefixCls,
        pickerPrefixCls = this.pickerPrefixCls,
        clientHeight = this.clientHeight;
    var date = value || defaultValue || undefined;
    var height = clientHeight && clientHeight * 3 / 8 - 52 || Number.POSITIVE_INFINITY;
    return _createVNode("div", {
      "class": "time-picker"
    }, [_createVNode("div", {
      "class": "title"
    }, [title]), _createVNode(DateTimePicker, {
      "prefixCls": prefixCls,
      "pickerPrefixCls": pickerPrefixCls,
      "style": {
        height: height > 164 || height < 0 ? 164 : height,
        overflow: 'hidden'
      },
      "mode": "time",
      "value": date,
      "locale": locale,
      "minDate": this.getMinTime(date),
      "maxDate": this.getMaxTime(date),
      "onChange": this.onDateChange,
      "use12Hours": true
    }, null)]);
  }
});
export default TimePicker;