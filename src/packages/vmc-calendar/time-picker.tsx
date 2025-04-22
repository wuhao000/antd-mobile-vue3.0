import {defineComponent, PropType} from 'vue';
import DateTimePicker from '../vmc-date-picker';

export const MIN_DATE = new Date(0, 0, 0, 0, 0);
export const MAX_DATE = new Date(9999, 11, 31, 23, 59, 59);

const TimePicker = defineComponent({
  name: 'MTimePicker',
  props: {
    locale: {type: Object as PropType<any>},
    prefixCls: String,
    pickerPrefixCls: String,
    title: String,
    defaultValue: Date as PropType<Date>,
    value: Date as PropType<Date>,
    minDate: {
      type: Date as PropType<Date>, default: () => {
        return MIN_DATE;
      }
    },
    maxDate: {
      type: Date as PropType<Date>, default: () => {
        return MAX_DATE;
      }
    },
    clientHeight: {type: Number}
  },
  setup(props, {emit}) {


    const onDateChange = (date: Date) => {
      emit('change', date);
    };
    const getMinTime = (date?: Date) => {
      const minDate = props.minDate;
      if (!date ||
        date.getFullYear() > minDate.getFullYear() ||
        date.getMonth() > minDate.getMonth() ||
        date.getDate() > minDate.getDate()
      ) {
        return MIN_DATE;
      }
      return minDate;
    };
    const getMaxTime = (date?: Date) => {
      const maxDate = props.maxDate as Date;
      if (!date ||
        date.getFullYear() < maxDate.getFullYear() ||
        date.getMonth() < maxDate.getMonth() ||
        date.getDate() < maxDate.getDate()
      ) {
        return MAX_DATE;
      }
      return maxDate;
    };
    return {
      getMinTime, getMaxTime, onDateChange
    };
  },
  render() {
    const {
      locale, title, value, defaultValue,
      prefixCls, pickerPrefixCls, clientHeight
    } = this.$props;
    const date: Date = value || defaultValue || undefined;
    const height = (clientHeight && clientHeight * 3 / 8 - 52) || Number.POSITIVE_INFINITY;

    return (
      <div class="time-picker">
        <div class="title">{title}</div>
        {
          <DateTimePicker
            prefixCls={prefixCls}
            pickerPrefixCls={pickerPrefixCls}
            style={{
              height: height > 164 || height < 0 ? 164 : height,
              overflow: 'hidden'
            }}
            mode="time"
            value={date}
            locale={locale as any}
            minDate={this.getMinTime(date)}
            maxDate={this.getMaxTime(date)}
            onChange={this.onDateChange}
            use12Hours
          />
        }
      </div>
    );
  }
});
export default TimePicker as any;
