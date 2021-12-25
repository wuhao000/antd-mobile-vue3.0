import {defineComponent, PropType, provide, ref, watch} from 'vue';
import {getComponentLocale} from '../../utils/getLocale';
import {setProps} from '../../utils/vnode';
import RCDatePicker from '../../vmc-date-picker/date-picker';
import {DatePickerMode} from '../../vmc-date-picker/date-picker-props';
import PopupDatePicker from '../../vmc-date-picker/popup';
import locale from './locale/zh_CN';
import defaultLocale from './locale/zh_CN';
import {formatFn} from './utils';

export const getDatePicker = (isView: boolean, name: string) => {
  return defineComponent({
    install: null,
    Item: null,
    name,
    props: {
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
      format: {
        type: [String, Function] as PropType<string | ((arg) => any)>
      },
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
        type: [Object, Number, String] as PropType<Date | number | string>
      },
      visible: {type: Boolean, default: false},
      placeholder: {
        type: String as PropType<string>,
        default: ''
      },
      prefixCls: {
        type: String as PropType<string>,
        default: 'am-picker'
      },
      use12Hours: {
        type: Boolean as PropType<boolean>,
        default: false
      },
      pickerPrefixCls: {
        type: String as PropType<string>,
        default: 'am-picker-col'
      },
      popupPrefixCls: {
        type: String as PropType<string>,
        default: 'am-picker-popup'
      }
    },
    setup(props, {emit}) {
      const getDate = (): Date => {
        if (typeof props.value === 'number') {
          return new Date(props.value);
        } else if (typeof props.value === 'string') {
          return new Date(props.value);
        } else {
          return props.value || new Date();
        }
      };
      const scrollValue = ref<Date>(getDate());
      const localVisible = ref(props.visible);
      watch(() => props.visible, visible => {
        localVisible.value = visible;
      });
      const onOk = () => {
        let value = props.value;
        if (scrollValue.value !== undefined) {
          value = scrollValue.value as Date;
        }
        emit('update:value', value);
        emit('change', value);
        emit('ok', value);
      };
      const onVisibleChange = (visible: boolean) => {
        localVisible.value = visible;
        emit('update:visible', visible);
      };
      const fixOnOk = (picker: any) => {
        if (picker) {
          picker.onOk = onOk;
        }
      };
      const onChange = (v: Date) => {
        scrollValue.value = v;
        if (isView) {
          emit('update:value', v);
          emit('change', v);
        }
      };
      provide('store', {
        onOk: null
      });
      return {
        scrollValue,
        onOk,
        onVisibleChange,
        fixOnOk,
        onChange,
        getDate,
        localVisible
      };
    },
    render() {
      const {value, popupPrefixCls} = this.$props;
      const locale = getComponentLocale(this.$props, null, 'DatePicker', () =>
        defaultLocale
      );
      const {okText, cancelText, extra, DatePickerLocale} = locale;

      /**
       * 注意:
       * 受控 表示 通过设置 value 属性、组件的最终状态跟 value 设置值一致。
       * 默认不设置 value 或 只设置 defaultValue 表示非受控。
       *
       * DatePickerView 对外通过 value “只支持 受控” 模式（可以使用 defaultDate 支持 非受控 模式，但不对外）
       * PickerView 对外通过 value “只支持 受控” 模式
       *
       * DatePicker / Picker 对外只有 value 属性 (没有 defaultValue)，
       * 其中 List 展示部分 “只支持 受控” 模式，
       * 弹出的 选择器部分 会随外部 value 改变而变、同时能自由滚动
       * （即不会因为传入的 value 不变而不能滚动 (不像原生 input 的受控行为)）
       *
       */
      const datePickerProps = {
        minuteStep: this.minuteStep,
        locale: DatePickerLocale,
        minDate: this.minDate,
        maxDate: this.maxDate,
        mode: this.mode,
        pickerPrefixCls: this.pickerPrefixCls,
        prefixCls: this.prefixCls,
        value: this.getDate(),
        use12Hours: this.use12Hours,
        onChange: this.onChange
      };
      const datePicker = <RCDatePicker {...datePickerProps}/>;
      if (isView) {
        return datePicker;
      }
      const textValue = value ? formatFn(value, this.format, this.mode) : null;
      const childExtra = textValue ? textValue : (this.extra || extra || this.placeholder);
      const visible = (this.disabled || !this.editable) ? false : this.localVisible;
      return (
        <PopupDatePicker onVisibleChange={this.onVisibleChange}
                         datePicker={datePicker}
                         {...this.$props}
                         title={this.title}
                         disabled={this.disabled}
                         editable={this.editable}
                         visible={visible}
                         prefixCls={popupPrefixCls}
                         date={this.getDate()}
                         cancelText={this.cancelText || cancelText}
                         okText={this.okText || okText}
                         ref={this.fixOnOk}>
          {this.$slots.default?.()?.map(it => {
            setProps(it, {
              touchFeedback: true,
              onClick: () => {
                this.onVisibleChange(true);
              },
              text: !!textValue,
              extra: childExtra,
              arrow: 'horizontal'
            });
            return it;
          })}
        </PopupDatePicker>
      );
    }
  });
};

export default getDatePicker(false, 'MDatePicker');
