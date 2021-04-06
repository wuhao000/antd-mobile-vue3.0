import {defineComponent, inject, onBeforeUpdate, reactive, Ref, ref, watch} from 'vue';
import MultiPicker from '../vmc-picker/multi-picker';
import RMCPicker from '../vmc-picker/picker';
import DatePickerProps from './date-picker-props';

const HOURS_OF_DAY = 24;
const HOURS_HALF_DAY = 12;

type DateDataCol = { key: 'year' | 'month' | 'day'; props: { children: LabelItem[] } };

function getDaysInMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

function pad(n) {
  return n < 10 ? `0${n}` : n;
}

function cloneDate(date) {
  return new Date(+date);
}

function setMonth(date, month) {
  date.setDate(Math.min(date.getDate(), getDaysInMonth(new Date(date.getFullYear(), month))));
  date.setMonth(month);
}

interface LabelItem {
  value: any;
  label: string;
}

interface CalendarPickerCol {
  key: string;
  props: {
    children: LabelItem[]
  };
}

const DATETIME = 'datetime';
const DATE = 'date';
const TIME = 'time';
const MONTH = 'month';
const YEAR = 'year';
const ONE_DAY = HOURS_OF_DAY * 60 * 60 * 1000;

export default defineComponent({
  name: 'DatePicker',
  props: {
    ...DatePickerProps
  },
  setup(props, {emit}) {
    const state = reactive({
      value: props.value || props.defaultDate,
      values: null
    });
    const getMinDate = () => props.minDate || getDefaultMinDate();
    const getMaxDate = () => props.maxDate || getDefaultMaxDate();
    const clipDate = (date: Date) => {
      const {mode} = props;
      const minDate = getMinDate();
      const maxDate: Date = getMaxDate();
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
        const maxHour = maxDate.getHours();
        const maxMinutes = maxDate.getMinutes();
        const minHour = minDate.getHours();
        const minMinutes = minDate.getMinutes();
        const hour = date.getHours();
        const minutes = date.getMinutes();
        if (hour < minHour || hour === minHour && minutes < minMinutes) {
          return cloneDate(minDate);
        }
        if (hour > maxHour || hour === maxHour && minutes > maxMinutes) {
          return cloneDate(maxDate);
        }
      }
      return date;
    };
    const getDate = () => clipDate(state.value || getDefaultMinDate());
    const getDateData = (): DateDataCol[] => {
      const {locale, formatMonth, formatDay, mode} = props;
      const date = getDate();
      const selYear = date.getFullYear();
      const selMonth = date.getMonth();
      const minDateYear = getMinYear();
      const maxDateYear = getMaxYear();
      const minDateMonth = getMinMonth();
      const maxDateMonth = getMaxMonth();
      const minDateDay = getMinDay();
      const maxDateDay = getMaxDay();
      const years: LabelItem[] = [];
      for (let i = minDateYear; i <= maxDateYear; i++) {
        years.push({
          value: i,
          label: `${i}${locale.year}`
        });
      }
      const yearCol: DateDataCol = {key: 'year', props: {children: years}};
      if (mode === YEAR) {
        return [yearCol];
      }

      const months: LabelItem[] = [];
      let minMonth = 0;
      let maxMonth = 11;
      if (minDateYear === selYear) {
        minMonth = minDateMonth;
      }
      if (maxDateYear === selYear) {
        maxMonth = maxDateMonth;
      }
      for (let i = minMonth; i <= maxMonth; i++) {
        const label = formatMonth ? formatMonth(i, date) : (`${i + 1 + locale.month}`);
        months.push({
          value: i,
          label
        });
      }
      const monthCol: DateDataCol = {key: 'month', props: {children: months}};
      if (mode === MONTH) {
        return [yearCol, monthCol];
      }
      const days: LabelItem[] = [];
      let minDay = 1;
      let maxDay = getDaysInMonth(date);

      if (minDateYear === selYear && minDateMonth === selMonth) {
        minDay = minDateDay;
      }
      if (maxDateYear === selYear && maxDateMonth === selMonth) {
        maxDay = maxDateDay;
      }
      for (let i = minDay; i <= maxDay; i++) {
        const label = formatDay ? formatDay(i, date) : (i + locale.day);
        days.push({
          value: i,
          label
        });
      }
      return [
        yearCol,
        monthCol,
        {key: 'day', props: {children: days}}
      ];
    };
    const getValueCols = () => {
      const minDate = getMinDate();
      const maxDate = getMaxDate();
      if (minDate > maxDate) {
        throw new Error('最大日期不能小于最小日期');
      }
      const {mode, use12Hours} = props;
      const date = getDate();
      let cols: any[] = [];
      let value: number[] = [];
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
        const time = getTimeData(date);
        cols = cols.concat(time.cols);
        const hour = date.getHours();
        let dtValue = [hour, time.selMinute];
        let nhour = hour;
        if (use12Hours) {
          nhour = hour === 0 ? HOURS_HALF_DAY : (hour > HOURS_HALF_DAY ? hour - HOURS_HALF_DAY : hour);
          dtValue = [nhour, time.selMinute, (hour >= HOURS_HALF_DAY ? 1 : 0)];
        }
        value = value.concat(dtValue);
      }
      return {
        value,
        cols
      };
    };

    const defaultMinDate: Ref<Date> = ref(null);
    const defaultMaxDate: Ref<Date> = ref(null);
    const store: {
      onCancel: () => void;
      onOk: (...args: any) => any
    } = inject('store');
    const getDefaultMinDate = (): Date => {
      if (!defaultMinDate.value) {
        defaultMinDate.value = new Date(2000, 1, 1, 0, 0, 0);
      }
      return defaultMinDate.value;
    };
    const getDefaultMaxDate = () => {
      if (!defaultMaxDate.value) {
        defaultMaxDate.value = new Date(2099, 1, 1, 23, 59, 59);
      }
      return defaultMaxDate.value;
    };
    const getMinYear = () => getMinDate().getFullYear();
    const getMaxYear = () => getMaxDate().getFullYear();
    const getMinMonth = () => getMinDate().getMonth();
    const getMaxMonth = () => getMaxDate().getMonth();
    const getMinDay = () => getMinDate().getDate();
    const getMaxDay = () => getMaxDate().getDate();
    const getMinHour = () => getMinDate().getHours();
    const getMaxHour = () => getMaxDate().getHours();
    const getMinMinute = () => getMinDate().getMinutes();
    const getMaxMinute = () => getMaxDate().getMinutes();
    const getDisplayHour = rawHour => {
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
    const getTimeData = (date): {
      cols: CalendarPickerCol[];
      selMinute: number;
    } => {
      let {minHour = 0, maxHour = HOURS_OF_DAY - 1, minMinute = 0, maxMinute = 59} = props;
      const {mode, locale, minuteStep, use12Hours} = props;
      const minDateMinute = getMinMinute();
      const maxDateMinute = getMaxMinute();
      const minDateHour = getMinHour();
      const maxDateHour = getMaxHour();
      const hour = date.getHours();
      if (mode === DATETIME) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        const minDateYear = getMinYear();
        const maxDateYear = getMaxYear();
        const minDateMonth = getMinMonth();
        const maxDateMonth = getMaxMonth();
        const minDateDay = getMinDay();
        const maxDateDay = getMaxDay();
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

      const hours: any[] = [];
      if (minHour === 0 && maxHour === 0 || minHour !== 0 && maxHour !== 0) {
        minHour = getDisplayHour(minHour);
      } else if (minHour === 0 && use12Hours) {
        minHour = 1;
        hours.push({value: '0', label: locale.hour ? '12' + locale.hour : '12'});
      }
      maxHour = getDisplayHour(maxHour);
      for (let i = minHour; i <= maxHour; i++) {
        hours.push({
          value: i,
          label: locale.hour ? i + locale.hour : pad(i)
        });
      }

      const minutes: any[] = [];
      const selMinute: number = date.getMinutes();
      for (let i = minMinute; i <= maxMinute; i += minuteStep!) {
        minutes.push({
          value: i,
          label: locale.minute ? i + locale.minute : pad(i)
        });
        if (selMinute > i && selMinute < i + minuteStep!) {
          minutes.push({
            value: selMinute,
            label: locale.minute ? selMinute + locale.minute : pad(selMinute)
          });
        }
      }
      const cols = [
        {key: 'hours', props: {children: hours}},
        {key: 'minutes', props: {children: minutes}}
      ].concat(use12Hours ? [{
        key: 'ampm',
        props: {children: [{value: 0, label: locale.am}, {value: 1, label: locale.pm}]}
      }] : []);
      return {cols, selMinute};
    };
    watch(() => state.value, () => {
      const {value} = getValueCols();
      state.values = value;
    }, {immediate: true});
    onBeforeUpdate(() => {
      if (props.value !== undefined) {
        state.value = props.value || props.defaultDate;
      }
    });
    const getNewDate = (values, index) => {
      const value = parseInt(values[index], 10);
      const {mode} = props;
      const newValue = cloneDate(getDate());
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
    const onOk = () => {
      const newValue = cloneDate(getDate());
      newValue.setSeconds(0);
      const values = state.values;
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
    const onCancel = () => {
      const {value} = getValueCols();
      state.values = value;
      emit('cancel', value);
    };
    const onValueChange = (values, index) => {
      if (!Array.isArray(values)) {
        throw new Error('MultiPicker返回了非法数值：' + JSON.stringify(values));
      }
      state.values = values;
      emit('change', getNewDate(values, index));
    };
    const setHours = (date, hour) => {
      if (props.use12Hours) {
        const dh = date.getHours();
        let nhour: any;
        nhour = dh >= HOURS_HALF_DAY ? hour + HOURS_HALF_DAY : hour;
        nhour = nhour >= HOURS_OF_DAY ? 0 : nhour; // Make sure no more than one day
        date.setHours(nhour);
      } else {
        date.setHours(hour);
      }
    };
    const setAmPm = (date, index) => {
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
    return {getValueCols, state, onValueChange};
  },
  render() {
    const {cols} = this.getValueCols();
    const value = this.state.values;
    const {
      disabled, pickerPrefixCls, prefixCls, itemStyle
    } = this;
    const pickerProps = {
      style: {
        flexDirection: 'row',
        alignItems: 'center'
      },
      prefixCls,
      value,
      ['onUpdate:value']: this.onValueChange
    };
    return (
        <MultiPicker {...pickerProps}>
          {cols.map(p => (
              <RMCPicker
                  disabled={disabled}
                  prefixCls={pickerPrefixCls}
                  itemStyle={itemStyle}
                  data={p.props.children}
                  style={{flex: 1}}
                  key={p.key}>
              </RMCPicker>
          ))}
        </MultiPicker>
    );
  }
});
