import {Dayjs} from 'dayjs';
import {Prop, PropType} from 'vue';
import defaultLocale from './locale/zh_CN';

const DATE = 'date';

interface IDatePickerProps {
  date?: any;
  defaultDate?: any;
  minDate?: any;
  maxDate?: any;
  minHour?: number;
  maxHour?: number;
  minMinute?: number;
  maxMinute?: number;
  mode?: DatePickerMode;
  disabled?: boolean;
  locale?: any;
  minuteStep?: number;
  formatMonth?: (month: number, date?: any) => any;
  formatDay?: (day: number, date?: any) => any;
  itemStyle?: any;
  /** web only */
  prefixCls?: string;
  rootNativeProps?: {};
  pickerPrefixCls?: string;
  use12Hours?: boolean;
}

export type DatePickerMode = 'date' | 'datetime' | 'time' | 'month' | 'year';

export default {
  onChange: {},
  value: {type: Date as PropType<Date>},
  disabledDate: {
    type: Function
  } as Prop<(date: Dayjs) => boolean>,
  defaultDate: {
    type: Date as PropType<Date>,
    default: () => new Date()
  },
  minDate: {
    type: Date as PropType<Date>
  },
  maxDate: {
    type: Date as PropType<Date>
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
    type: String as PropType<DatePickerMode>,
    default: DATE
  },
  disabled: {
    type: Boolean,
    default: false
  },
  locale: {
    type: Object as PropType<any>,
    default: defaultLocale
  },
  minuteStep: {
    type: Number,
    default: 1
  },
  formatMonth: {type: Function as PropType<(index: number, date: Date) => any>},
  formatDay: {type: Function as PropType<(index: number, date: Date) => any>},
  itemStyle: {type: Function as PropType<any>},
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
