import {Options, Vue} from 'vue-class-component';
import {ExtraData, Locale} from './data-types';
import {PropsType as HeaderPropsType} from './calendar/header';
import defaultLocale from './locale/zh_CN';
import { VNode, PropType } from 'vue';

export type SelectDateType = [Date, Date] | [Date];

export default {
  defaultTimeValue: {
    type: Date as PropType<Date>, default: () => {
      return new Date(2000, 0, 1, 8);
    }
  },
  value: {type: Array as PropType<Date[]>},
  defaultValue: {type: Array as PropType<Date[]>},
  displayMode: {type: Boolean, default: false},
  enterDirection: {type: String, default: 'vertical'},
  getDateExtra: {type: Function},
  infiniteOpt: {type: Boolean, default: false},
  initialMonths: {type: Number},
  locale: {
    type: Object, default: () => {
      return defaultLocale;
    }
  },
  maxDate: {type: Date},
  minDate: {type: Date},
  onSelect: {type: Function},
  pickTime: {type: Boolean, default: false},
  prefixCls: {type: String, default: 'rmc-calendar'},
  renderHeader: {type: Function},
  renderShortcut: {type: Function},
  rowSize: {},
  showHeader: {type: Boolean, default: true},
  showShortcut: {type: Boolean, default: false},
  timePickerPickerPrefixCls: {type: String},
  timePickerPrefixCls: {type: String},
  title: {type: String},
  type: {type: String, default: 'range'},
  visible: {type: Boolean, default: false}
};
