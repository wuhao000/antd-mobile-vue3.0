import classnames from 'classnames';
import {defineComponent, onBeforeUnmount, onMounted, PropType, Ref, ref, Teleport, TeleportProps} from 'vue';
import {addClass, removeClass} from '../../utils/class';
import CustomKeyboard from './custom-keyboard';

let instanceArr: any = [];
let customNumberKeyboard: any = null;

export default defineComponent({
  name: 'MNumberInput',
  props: {
    onConfirm: {},
    onChange: {},
    onFocus: {},
    onBlur: {},
    placeholder: {default: ''},
    disabled: {type: Boolean, default: false},
    editable: {type: Boolean, default: true},
    moneyKeyboardAlign: {},
    moneyKeyboardWrapProps: {},
    moneyKeyboardHeader: {},
    value: {type: [String, Number]},
    prefixCls: {default: 'am-input'},
    keyboardPrefixCls: {default: 'am-number-keyboard'},
    confirmLabel: {},
    backspaceLabel: {type: String as PropType<string>},
    cancelKeyboardLabel: {type: String as PropType<string>},
    maxLength: {type: Number as PropType<number>},
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
  setup(props, {emit, slots}) {
    const container: Ref<HTMLElement> = ref(null);
    const inputRef: Ref<HTMLDivElement | null> = ref(null);
    const focus: Ref<boolean> = ref(false);
    const currentValue: Ref<string> = ref(null);
    const keyboardRef = ref(null);


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
    const saveRef = (el: any) => {
      customNumberKeyboard = el;
      instanceArr.push({el, container: container.value});
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
          ref={(el) => {
            keyboardRef.value = el;
          }}
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
      const {keyboardPrefixCls} = props;
      if (!container.value) {
        const container: HTMLDivElement = document.createElement('div');
        container.setAttribute('id', `${keyboardPrefixCls}-container-${(new Date().getTime())}`);
        document.body.appendChild(container);
        container['value'] = container;
      }
      return container.value;
    };
    const doBlur = (ev: MouseEvent) => {
      if (ev.target !== inputRef.value) {
        onInputBlur(props.value.toString());
      }
    };
    const removeCurrentExtraKeyboard = () => {
      instanceArr = instanceArr.filter((item: any) => {
        const {el, container} = item;
        if (el && container && el !== customNumberKeyboard) {
          (container as any).parentNode.removeChild(container);
        }
        return el === customNumberKeyboard;
      });
    };
    const unLinkInput = () => {
      if (
        customNumberKeyboard &&
        customNumberKeyboard.antmKeyboard &&
        customNumberKeyboard.linkedInput &&
        customNumberKeyboard.linkedInput === this
      ) {
        customNumberKeyboard.linkedInput = null;
        addClass(
          customNumberKeyboard.antmKeyboard,
          `${props.keyboardPrefixCls}-wrapper-hide`
        );
      }
      // for unmount
      removeBlurListener();
      removeCurrentExtraKeyboard();
    };
    const onInputBlur = (value: string) => {
      if (focus.value) {
        focus.value = false;
        emit('blur', value);
        setTimeout(() => {
          unLinkInput();
        }, 50);
      }
    };
    const onInputFocus = (e?) => {
      emit('focus', props.value);
      focus.value = true;
      if (customNumberKeyboard) {
        customNumberKeyboard.linkedInput = this;
        if (customNumberKeyboard.antmKeyboard) {
          removeClass(
            customNumberKeyboard.antmKeyboard,
            `${props.keyboardPrefixCls}-wrapper-hide`
          );
        }
        customNumberKeyboard.confirmDisabled = props.value === '';
        if (customNumberKeyboard.confirmKeyboardItem) {
          if (props.value === '') {
            addClass(
              customNumberKeyboard.confirmKeyboardItem,
              `${props.keyboardPrefixCls}-item-disabled`
            );
          } else {
            removeClass(
              customNumberKeyboard.confirmKeyboardItem,
              `${props.keyboardPrefixCls}-item-disabled`
            );
          }
        }
      }
    };
    const onKeyboardClick = (keyboardItemValue: string) => {
      const {maxLength, value} = props;
      // tslint:disable-next-line:no-this-assignment

      let valueAfterChange;
      // 删除键
      if (keyboardItemValue === 'delete') {
        valueAfterChange = value.toString().substring(0, value.toString().length - 1);
        emit('change', {target: {value: valueAfterChange}});
        // 确认键
      } else if (keyboardItemValue === 'confirm') {
        valueAfterChange = value;
        onChange({target: {value: valueAfterChange}});
        onInputBlur(value.toString());
        onConfirm(value);
        // 收起键
      } else if (keyboardItemValue === 'hide') {
        valueAfterChange = value;
        onInputBlur(valueAfterChange);
      } else {
        if (maxLength !== undefined &&
          +maxLength >= 0 &&
          (value + keyboardItemValue).length > maxLength
        ) {
          valueAfterChange = (value + keyboardItemValue).substr(0, maxLength);
          onChange({target: {value: valueAfterChange}});
        } else {
          valueAfterChange = value + keyboardItemValue;
          onChange({target: {value: valueAfterChange}});
        }
      }
      if (customNumberKeyboard) {
        customNumberKeyboard.confirmDisabled = valueAfterChange === '';
        if (customNumberKeyboard.confirmKeyboardItem) {
          if (valueAfterChange === '') {
            addClass(
              customNumberKeyboard.confirmKeyboardItem,
              `${props.keyboardPrefixCls}-item-disabled`
            );
          } else {
            removeClass(
              customNumberKeyboard.confirmKeyboardItem,
              `${props.keyboardPrefixCls}-item-disabled`
            );
          }
        }
      }
    };
    const onFakeInputClick = (e) => {
      focusFunc(e);
    };
    const focusFunc = (e) => {
      // this focus may invocked by users page button click, so this click may trigger blurEventListener at the same time
      removeBlurListener();
      if (!focus.value) {
        onInputFocus(e);
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
      unLinkInput();
    });
    onMounted(() => {
      saveRef(keyboardRef.value as any);
    });

    return {
      container,
      inputRef,
      focus,
      currentValue,
      keyboardRef,
      onChange,
      onConfirm,
      addBlurListener,
      removeBlurListener,
      saveRef,
      getComponent,
      getContainer,
      doBlur,
      removeCurrentExtraKeyboard,
      unLinkInput,
      onInputBlur,
      onInputFocus,
      onKeyboardClick,
      onFakeInputClick,
      focusFunc,
      renderPortal
    };
  },
  render() {
    const {placeholder, disabled, editable, moneyKeyboardAlign} = this;
    const {focus, value} = this;
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
          ref="input"
          onClick={preventKeyboard ? () => {
          } : this.onFakeInputClick}
        >
          {value}
        </div>
        {this.renderPortal()}
      </div>
    );
  }
});
