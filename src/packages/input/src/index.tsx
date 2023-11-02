import classnames from 'classnames';
import {defineComponent, getCurrentInstance, onBeforeUnmount, PropType, reactive, ref, watch} from 'vue';
import List from '../../list';
import {formComponentProps, useFormComponent} from '../../mixins/form-component';
import TouchFeedback from '../../vmc-feedback';
import CustomInput from './custom-input';
import Input from './input';
import {renderLabel} from './utils';

function noop() {
  // do nothing
}

function normalizeValue(value?: string) {
  if (typeof value === 'undefined' || value === null) {
    return '';
  }
  return value + '';
}

export default defineComponent({
  name: 'MInputItem',
  props: {
    ...formComponentProps,
    onChange: Function,
    onBlur: Function,
    onConfirm: Function,
    onKeydown: Function,
    onKeyup: Function,
    defaultValue: {
      type: [String, Number] as PropType<string | number>
    },
    title: {
      type: [String, Object] as PropType<string>
    },
    /**
     * class 前缀
     */
    prefixCls: {
      type: String as PropType<string>,
      default: 'am-input'
    },
    /**
     * list class 前缀
     */
    prefixListCls: {
      type: String as PropType<string>,
      default: 'am-list'
    },
    /**
     * 文字排版起始方向, 只有 type='money' 支持，
     * 可选为 <code>'left'</code>, <code>'right'</code>
     */
    moneyKeyboardAlign: {
      type: String as PropType<string>,
      default: 'right'
    },
    moneyKeyboardWrapProps: {
      type: Function as PropType<object>,
      default: () => {
        return {};
      }
    },
    moneyKeyboardHeader: {
      default: null
    },
    type: {
      type: String as PropType<'' | 'text' | 'bankCard' | 'phone' | 'password' | 'number' | 'digit' | 'money'>,
      default: 'text'
    },
    /**
     * input元素的name属性
     */
    name: {
      type: String as PropType<string>
    },
    /**
     * 占位文字
     */
    placeholder: {
      type: String as PropType<string>,
      default: ''
    },
    /**
     * 是否支持清除内容
     */
    clearable: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    /**
     * 最大长度
     */
    maxLength: {
      type: Number as PropType<number>, default: 1_000_000
    },
    /**
     * 右边注释
     */
    extra: {
      default: ''
    },
    labelNumber: {
      default: 5
    },
    textAlign: {
      type: String as PropType<'left' | 'center' | 'right'>
    },
    locale: {},
    android: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    required: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    errorDisplayType: {
      type: String as PropType<'toast' | 'popover' | 'text' | undefined>,
      default: 'toast'
    }
  },
  install: null,
  setup(props, {emit}) {
    const state = reactive({
      placeholder: props.placeholder || ''
    });
    const {currentValue, isDisabled, isReadonly, onFieldBlur, onFieldChange} = useFormComponent(props, {emit});
    const debounceTimeout = ref(null);
    watch(() => props.placeholder, (placeholder: string) => {
      state.placeholder = placeholder;
    });
    const inputRef = ref(null);
    const onInputChange = (e) => {
      const el = e.target;
      const {value: rawVal, selectionEnd: prePos} = el;
      const preCtrlVal = currentValue.value ?? '';
      const {type} = props;
      let ctrlValue = rawVal;
      switch (type) {
        case 'bankCard':
          ctrlValue = rawVal.replace(/\D/g, '').replace(/(....)(?=.)/g, '$1 ');
          break;
        case 'phone':
          ctrlValue = rawVal.replace(/\D/g, '').substring(0, 11);
          const valueLen = ctrlValue.length;
          if (valueLen > 3 && valueLen < 8) {
            ctrlValue = `${ctrlValue.substr(0, 3)} ${ctrlValue.substr(3)}`;
          } else if (valueLen >= 8) {
            ctrlValue = `${ctrlValue.substr(0, 3)} ${ctrlValue.substr(3, 4)} ${ctrlValue.substr(
              7
            )}`;
          }
          break;
        case 'number':
          ctrlValue = rawVal.replace(/\D/g, '');
          break;
        case 'digit':
          ctrlValue = rawVal.replace(/[^0-9.]/g, '');
          break;
        case 'text':
        case 'password':
        default:
          break;
      }
      if (props.maxLength && ctrlValue.length > props.maxLength) {
        ctrlValue = ctrlValue.substring(0, props.maxLength);
      }
      handleOnChange(ctrlValue, ctrlValue !== rawVal, () => {
        switch (type) {
          case 'bankCard':
          case 'phone':
          case 'number':
            // controlled input type needs to adjust the position of the caret
            try {
              // set selection may throw error (https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange)
              el.selectionStart = el.selectionEnd = calcPos(prePos || 0, preCtrlVal, rawVal, ctrlValue, [' '], /\D/g);
            } catch (error) {
              console.warn('Set selection error:', error);
            }
            break;
          default:
            break;
        }
      });
      onFieldChange();
    };
    /**
     *
     * @param {string} value
     * @param {boolean} isMutated 校正值是否和输入值不同
     * @param adjustPos
     */
    const handleOnChange = (value: string, isMutated: boolean = false, adjustPos: any = noop) => {
      currentValue.value = value;
      emit('update:value', value);
      emit('change', value);
      adjustPos();
      if (inputRef.value && isMutated) {
        inputRef.value.$forceUpdate();
      }
    };
    const instance = getCurrentInstance();
    const onInputFocus = (value: string) => {
      if (debounceTimeout.value) {
        clearTimeout(debounceTimeout.value);
        debounceTimeout.value = null;
      }
      (instance.vnode.el as HTMLElement).focus();
      emit('focus', value);
    };
    const onInputBlur = (value: string) => {
      if (inputRef.value) {
        // this.inputRef may be null if customKeyboard unmount
        debounceTimeout.value = window.setTimeout(() => {
          if (document.activeElement !== (inputRef.value && inputRef.value.inputRef)) {
            (instance.vnode.el as HTMLElement).blur();
          }
        }, 200);
      }
      // fix autoFocus item blur with flash
      setTimeout(() => {
        // fix ios12 wechat browser click failure after input
        if (document.body) {
          document.body.scrollTop = document.body.scrollTop;
        }
      }, 100);
      onFieldBlur();
      emit('blur', value);
    };
    const clearInput = () => {
      handleOnChange('');
      focus();
    };
    const focus = () => {
      if (inputRef.value) {
        if (typeof inputRef.value.focus === 'function') {
          inputRef.value.focus();
        } else {
          inputRef.value.focus = true;
        }
      }
    };
    const calcPos = (prePos: number, preCtrlVal: string, rawVal: string, ctrlVal: string, placeholderChars: Array<string>, maskReg: RegExp) => {
      const editLength = rawVal.length - preCtrlVal.length;
      const isAddition = editLength > 0;
      let pos = prePos;
      if (isAddition) {
        const additionStr = rawVal.substr(pos - editLength, editLength);
        let ctrlCharCount = additionStr.replace(maskReg, '').length;
        pos -= (editLength - ctrlCharCount);
        let placeholderCharCount = 0;
        while (ctrlCharCount > 0) {
          if (placeholderChars.indexOf(ctrlVal.charAt(pos - ctrlCharCount + placeholderCharCount)) === -1) {
            ctrlCharCount--;
          } else {
            placeholderCharCount++;
          }
        }
        pos += placeholderCharCount;
      }
      return pos;
    };
    currentValue.value = normalizeValue(((props.value || '') + ''));
    onBeforeUnmount(() => {
      if (debounceTimeout.value) {
        window.clearTimeout(debounceTimeout.value);
        debounceTimeout.value = null;
      }
    });
    return {
      clearInput,
      setInputRef(el) {
        inputRef.value = el;
      },
      onInputChange,
      onInputFocus,
      onInputBlur,
      isReadonly,
      isDisabled,
      currentValue,
      focus,
      state
    };
  },
  render() {
    const {
      prefixCls,
      prefixListCls,
      isReadonly,
      isDisabled,
      clearable,
      type,
      currentValue,
      moneyKeyboardAlign,
      moneyKeyboardWrapProps,
      moneyKeyboardHeader,
      name, maxLength
    } = this;
    const extra = this.$slots.extra || this.extra;
    const {
      confirmLabel,
      backspaceLabel,
      cancelKeyboardLabel
    } = {
      confirmLabel: '确定',
      backspaceLabel: '退格',
      cancelKeyboardLabel: '收起键盘'
    };

    const {
      focus,
      state: {placeholder}
    } = this;

    const wrapCls = classnames(
      `${prefixListCls}-item`,
      `${prefixCls}-item`,
      `${prefixListCls}-item-middle`,
      {
        [`${prefixCls}-disabled`]: isDisabled,
        [`${prefixCls}-focus`]: focus,
        [`${prefixCls}-android`]: this.android
      }
    );

    const controlCls = {
      [`${prefixCls}-control`]: true,
      [`${prefixCls}-control-extra`]: !!extra
    };

    let inputType: any = 'text';
    if (type === 'bankCard' || type === 'phone') {
      inputType = 'tel';
    } else if (type === 'password') {
      inputType = 'password';
    } else if (type === 'digit') {
      inputType = 'number';
    } else if (type !== 'text' && type !== 'number') {
      inputType = type;
    }

    let patternProps;
    if (type === 'number') {
      patternProps = {
        pattern: '[0-9]*'
      };
    }

    let classNameProp = '';
    if (type === 'digit') {
      classNameProp = 'h5numInput';
    }
    const slots = {
      control: () => {
        return <div class={controlCls}>
          {type === 'money' ? (
            <CustomInput
              {
                ...{
                  value: normalizeValue(currentValue),
                  type,
                  maxLength,
                  placeholder,
                  disabled: isDisabled,
                  editable: !isReadonly,
                  prefixCls,
                  confirmLabel,
                  backspaceLabel,
                  cancelKeyboardLabel,
                  moneyKeyboardAlign,
                  moneyKeyboardWrapProps,
                  moneyKeyboardHeader
                }
              }
              onChange={this.onInputChange}
              onFocus={this.onInputFocus}
              onBlur={this.onInputBlur}
              onConfirm={(v) => {
                this.$emit('confirm', v);
              }}
              ref={this.setInputRef}
            />
          ) : (
            <Input
              {
                ...{
                  ...patternProps,
                  value: normalizeValue(currentValue),
                  defaultValue: this.defaultValue,
                  textAlign: this.textAlign,
                  type: inputType,
                  maxLength,
                  name,
                  placeholder,
                  readonly: isReadonly,
                  disabled: isDisabled,
                  onKeydown: this.onKeydown,
                  onKeyup: this.onKeyup,
                  onChange: this.onInputChange,
                  onFocus: this.onInputFocus,
                  onBlur: this.onInputBlur,
                  class: classNameProp,
                  ref: this.setInputRef
                }
              }
            />
          )}
          {extra !== '' ? (
            <div class={`${prefixCls}-extra`}
                 onClick={(e) => {
                   this.$emit('extra-click', e);
                 }}>
              {extra}
            </div>
          ) : null}
        </div>;
      },
      suffix: () => {
        return clearable &&
        !isReadonly &&
        !isDisabled &&
        (currentValue && `${currentValue}`.length > 0) ? (
          // @ts-ignore
          <TouchFeedback activeClassName={`${prefixCls}-clear-active`}>
            <div class={`${prefixCls}-clear`}
                 onClick={this.clearInput}/>
          </TouchFeedback>
        ) : null;
      }
    };
    return (
      <List.Item title={renderLabel(this.$props, this.$slots)}
                 required={this.required}
                 error={this.error}
                 errorMessage={this.errorMessage}
                 errorDisplayType={this.errorDisplayType}
                 v-slots={slots}
                 class={wrapCls}/>
    );
  }
});
