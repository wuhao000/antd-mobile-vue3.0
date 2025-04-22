import classnames from 'classnames';
import { defineComponent, onBeforeUnmount, PropType, Ref, ref, Teleport, TeleportProps } from 'vue';
import CustomKeyboard from './custom-keyboard';

export default defineComponent({
  name: 'MNumberInput',
  props: {
    onConfirm: Function,
    onChange: Function,
    onFocus: Function,
    onBlur: Function,
    placeholder: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    editable: { type: Boolean, default: true },
    moneyKeyboardAlign: {},
    moneyKeyboardWrapProps: {},
    moneyKeyboardHeader: {},
    value: { type: [String, Number] },
    prefixCls: { type: String, default: 'am-input' },
    keyboardPrefixCls: { type: String, default: 'am-number-keyboard' },
    confirmLabel: {},
    backspaceLabel: { type: String },
    cancelKeyboardLabel: { type: String },
    maxLength: { type: Number },
    type: {}
  },
  watch: {
    value(value) {
      this.currentValue = value;
    },
    focus(focus: boolean) {
      if (focus) {
        this.onInputFocus();
      }
    }
  },
  setup(props, { emit }) {
    const container: Ref<HTMLElement> = ref(null);
    const focus: Ref<boolean> = ref(false);
    const currentValue: Ref<string> = ref(null);
    const onChange = (value: any) => {
      if (props.value === undefined) {
        currentValue.value = value.target.value;
      }
      emit('change', value);
    };
    const onConfirm = (value: any) => {
      emit('confirm', value);
    };
    const addBlurListener = () => {
      document.addEventListener('click', doBlur, false);
    };
    const removeBlurListener = () => {
      document.removeEventListener('click', doBlur, false);
    };
    const getComponent = () => {
      const {
        confirmLabel,
        backspaceLabel,
        cancelKeyboardLabel,
        keyboardPrefixCls,
        moneyKeyboardWrapProps,
        moneyKeyboardHeader
      } = props;
      return (
        <CustomKeyboard
          open={focus.value}
          onClick={onKeyboardClick}
          prefixCls={keyboardPrefixCls}
          confirmLabel={confirmLabel}
          backspaceLabel={backspaceLabel}
          cancelKeyboardLabel={cancelKeyboardLabel}
          wrapProps={moneyKeyboardWrapProps}
          header={moneyKeyboardHeader}
        />
      );
    };
    const getContainer = () => {
      const { keyboardPrefixCls } = props;
      if (!container.value) {
        const div: HTMLDivElement = document.createElement('div');
        div.setAttribute('id', `${keyboardPrefixCls}-container-${(new Date().getTime())}`);
        document.body.appendChild(div);
        container.value = div;
      }
      return container.value;
    };
    const doBlur = () => {
      onInputBlur(props.value.toString());
    };
    const onInputBlur = (value: string) => {
      if (focus.value) {
        focus.value = false;
        emit('blur', value);
      }
    };
    const onInputFocus = () => {
      emit('focus', props.value);
      focus.value = true;
    };
    const onKeyboardClick = (keyboardItemValue: string) => {
      const { maxLength, value } = props;
      // tslint:disable-next-line:no-this-assignment

      let valueAfterChange;
      // 删除键
      if (keyboardItemValue === 'delete') {
        valueAfterChange = value.toString().substring(0, value.toString().length - 1);
        emit('change', { target: { value: valueAfterChange } });
        // 确认键
      } else if (keyboardItemValue === 'confirm') {
        valueAfterChange = value;
        onChange({ target: { value: valueAfterChange } });
        onInputBlur(value.toString());
        onConfirm(value);
        // 收起键
      } else if (keyboardItemValue === 'hide') {
        valueAfterChange = value;
        onInputBlur(valueAfterChange);
      } else if (maxLength !== undefined &&
        +maxLength >= 0 &&
        (value + keyboardItemValue).length > maxLength
      ) {
        valueAfterChange = (value + keyboardItemValue).substring(0, maxLength);
        onChange({ target: { value: valueAfterChange } });
      } else {
        valueAfterChange = value + keyboardItemValue;
        onChange({ target: { value: valueAfterChange } });
      }
    };
    const onFakeInputClick = () => {
      focusFunc();
    };
    const focusFunc = () => {
      // this focus may invocked by users page button click, so this click may trigger blurEventListener at the same time
      removeBlurListener();
      if (!focus.value) {
        onInputFocus();
      }
      setTimeout(() => {
        addBlurListener();
      }, 50);
    };
    const renderPortal = () => {
      const props: TeleportProps = {
        disabled: false,
        to: getContainer()
      };
      if (props.to) {
        return (
          <Teleport {...props}>
            {getComponent()}
          </Teleport>
        );
      }
    };
    currentValue.value = props.value?.toString() || '';
    onBeforeUnmount(() => {
      // focus:true unmount 不能触发 blur
      if (!focus.value) {
        emit('blur', props.value);
      }
    });
    return {
      container,
      focus,
      currentValue,
      onChange,
      onConfirm,
      addBlurListener,
      removeBlurListener,
      getComponent,
      getContainer,
      doBlur,
      onInputBlur,
      onInputFocus,
      onKeyboardClick,
      onFakeInputClick,
      focusFunc,
      renderPortal
    };
  },
  render() {
    const { onFakeInputClick, renderPortal, placeholder, disabled, editable, moneyKeyboardAlign } = this;
    const { focus, value } = this;
    const preventKeyboard = disabled || !editable;
    const fakeInputCls = classnames(`fake-input`, {
      focus,
      'fake-input-disabled': disabled
    });
    const fakeInputContainerCls = classnames('fake-input-container', {
      'fake-input-container-left': moneyKeyboardAlign === 'left'
    });
    return (
      <div class={fakeInputContainerCls}>
        {value === '' && (
          <div class="fake-input-placeholder">{placeholder}</div>
        )}
        <div
          role="textbox"
          class={fakeInputCls}
          onClick={preventKeyboard ? () => {
          } : onFakeInputClick}>
          {value}
        </div>
        {renderPortal()}
      </div>
    );
  }
});
