import {DatePickerMode} from '../../vmc-date-picker/date-picker-props';
import {PropType} from 'vue';
import locale from './locale/zh_CN';

export const datePickerProps = {
  disabled: {
    type: Boolean as PropType<boolean>
  },
  cancelText: {},
  editable: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  extra: {
    type: String as PropType<string>
  },
  format: {},
  locale: {type: Object, default: () => locale},
  maxDate: {
    type: Date as PropType<Date>
  },
  minDate: {
    type: Date as PropType<Date>
  },
  minuteStep: {
    type: Number as PropType<number>,
    default: 1
  },
  mode: {
    type: String as PropType<DatePickerMode>,
    default: 'datetime'
  },
  okText: {},
  title: {},
  value: {
    type: Object as PropType<Date>
  },
  visible: {type: Boolean, default: false}
};
