import classNames from 'classnames';
import {defineComponent, inject, Prop} from 'vue';
import Grid from '../grid';
import {creatFormComponentProps, useFormComponent} from '../mixins/form-component';
import {optionsBasedComponentProps, useOptionsBaseComponent} from '../mixins/options-based-component';
import Space from '../space';
import {getOptionProperty} from '../utils/option';
import {CheckMark} from './check-mark';

export default defineComponent({
  name: 'MSelector',
  props: {
    ...creatFormComponentProps(),
    ...optionsBasedComponentProps,
    prefixCls: {
      type: String,
      default: 'am-selector'
    },
    columns: {} as Prop<number>,
    multiple: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean
    },
    defaultValue: {
      type: [Array, String, Number],
      default: () => []
    } as Prop<unknown[] | string | number>,
    onChange: {
      type: Function
    } as Prop<(v: unknown[] | string | number, items: unknown) => void>,
    showCheckMark: {
      type: Boolean,
      default: true
    }
  },
  emit: ['change'],
  setup(props, {emit, slots, attrs}) {
    const onChange = v => {
      if (props.multiple) {
        emit('change', v, props.options.filter(option => (v as unknown[]).includes(getOptionProperty(option, props.valueProperty))));
      } else {
        emit('change', v, props.options.find(option => v === getOptionProperty(option, props.valueProperty)));
      }
    };
    const {currentValue} = useFormComponent(props, {emit, onChange});
    const form = inject('list', undefined);
    const {getOptions} = useOptionsBaseComponent(props, {
      emit,
      slots,
      attrs
    }, form);
    const setValue = (v: Array<string | number> | string | number) => {
      currentValue.value = v;
    };
    return {
      getOptions,
      currentValue,
      setValue
    };
  },
  render() {
    const {prefixCls, columns, multiple, setValue, showCheckMark, getOptions, currentValue} = this;
    const items = getOptions().map(option => {
      const active = multiple ? (currentValue as Array<string | number> || []).includes(option.value) : option.value === currentValue;
      const disabled = option.disabled;
      const itemCls = classNames(`${prefixCls}-item`, {
        [`${prefixCls}-item-active`]: active && !multiple,
        [`${prefixCls}-item-multiple-active`]: active && multiple,
        [`${prefixCls}-item-disabled`]: disabled
      });

      return (
        <div
          key={option.value}
          class={itemCls}
          onClick={() => {
            if (disabled) {
              return;
            }
            if (multiple) {
              const val = active
                ? (currentValue as Array<string | number>).filter(v => v !== option.value)
                : [...(currentValue as Array<string | number>), option.value];
              setValue(val);
            } else {
              const val = active ? undefined : option.value;
              setValue(val);
            }
          }}
          role="option"
          aria-selected={
            (active && !multiple) || (active && multiple)
          }>
          {option.label}
          {option.description && (
            <div class={`${prefixCls}-item-description`}>
              {option.description}
            </div>
          )}
          {active && showCheckMark && (
            <div class={`${prefixCls}-check-mark-wrapper`}>
              <CheckMark/>
            </div>
          )}
        </div>
      );
    });
    return <div
      class={prefixCls}
      role="listbox">
      {columns ? (<Grid cols={columns}>{items}</Grid>) : (
        <Space wrap>{items}</Space>
      )}
    </div>;
  }
});
