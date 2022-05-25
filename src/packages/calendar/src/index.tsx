import {defineComponent} from 'vue';
import Icon from '../../icon';
import {getComponentLocale} from '../../utils/getLocale';
import {Calendar as VMCalendar} from '../../vmc-calendar';
import CalendarProps from '../../vmc-calendar/calendar-props';
import defaultLocale from './locale/zh_CN';
import {useLocalValue} from "../../utils/value";

export default defineComponent({
  install: null,
  Item: null,
  name: 'MCalendar',
  props: {
    ...CalendarProps,
    prefixCls: {type: String, default: 'am-calendar'},
    timePickerPrefixCls: {type: String, default: 'am-picker'},
    timePickerPickerPrefixCls: {type: String, default: 'am-picker-col'}
  },
  setup(props, {emit}) {
    const {localValue} = useLocalValue<Date[]>(props, emit, {
      autoEmit: false,
      prop: 'value'
    });
    const {localValue: localVisible} = useLocalValue(props, emit, 'visible');
    const onConfirm = (...args) => {
      emit('confirm', ...args);
      emit('update:value', localValue.value);
      onClose();
    };
    const onClear = (e) => {
      localValue.value = undefined;
      emit('update:value', undefined);
      localVisible.value = false;
      emit('clear', e);
    };
    const onClose = (...args) => {
      localVisible.value = false;
      emit('close', ...args);
    };
    return {onClose, onConfirm, onClear, localValue, localVisible};
  },
  render() {
    const locale = getComponentLocale(this.$props, {}, 'Calendar', () =>
      defaultLocale
    );
    const Header = VMCalendar.DefaultHeader;
    return (
      <VMCalendar
        {
          ...this.$props
        }
        v-model={[this.localValue, 'value']}
        locale={locale}
        renderHeader={headerProps => (
          <Header {...headerProps} closeIcon={<Icon type="cross"/>}/>
        )}
        onCancel={(...args) => {
          this.$emit('cancel', ...args);
        }}
        onClose={this.onClose}
        onConfirm={this.onConfirm}
        onClear={this.onClear}
        onSelectHasDisableDate={(...args) => {
          this.$emit('select-has-disable-date', ...args);
        }}
        visible={this.localVisible}
      />
    );
  }
});

