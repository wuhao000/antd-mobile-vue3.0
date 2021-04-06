import classnames from 'classnames';
import {computed, defineComponent, PropType, ref, Ref} from 'vue';
import {IS_IOS} from '../../utils/exenv';
import TouchFeedback from '../../vmc-feedback';

const KeyboardItem = defineComponent({
  name: 'KeyboardItem',
  props: {
    value: {type: [String, Number]},
    label: String,
    type: {type: String},
    prefixCls: {default: 'am-number-keyboard'},
    iconOnly: {},
    disabled: {type: Boolean, default: false}
  },
  render() {
    const {
      prefixCls,
      disabled,
      label,
      iconOnly,
      ...restProps
    } = this;
    let value: any = this.$slots.default?.();
    const type = this.type;
    if (type === 'keyboard-delete') {
      value = 'delete';
    } else if (type === 'keyboard-hide') {
      value = 'hide';
    } else if (type === 'keyboard-confirm') {
      value = 'confirm';
    }

    const wrapCls = classnames(`${prefixCls}-item`);
    return (
        <TouchFeedback
            class={type}
            activeClassName={`${prefixCls}-item-active`}>
          <td
              ref="td"
              // tslint:disable-next-line:jsx-no-multiline-js
              onClick={e => {
                this.$emit('click', e, this.value);
              }}
              class={wrapCls}
              {...restProps}
          >
            {this.$slots.default?.()}
            {iconOnly && <i class="sr-only">{label}</i>}
          </td>
        </TouchFeedback>
    );
  }
});

export default defineComponent({
  name: 'CustomKeyboard',
  props: {
    onClick: {},
    prefixCls: {},
    confirmLabel: {},
    backspaceLabel: {type: String as PropType<string>},
    cancelKeyboardLabel: {type: String as PropType<string>},
    wrapProps: {},
    header: {}
  },
  setup(props, {emit, slots}) {
    const linkedInput: Ref<any> = ref(null);
    const confirmDisabled: Ref<boolean> = ref(null);
    const confirmKeyboardItem: Ref<HTMLTableDataCellElement | null> = ref(null);

    const onKeyboardClick = (e, value: string = '') => {
      e.stopImmediatePropagation();
      if (value === 'confirm' && confirmDisabled.value) {
        return null;
      } else {
        if (linkedInput.value) {
          linkedInput.value.onKeyboardClick(value);
        }
      }
    };
    const renderKeyboardItem = (item: string, index: number) => {
      const KeyboardItem2: any = KeyboardItem;
      return (
          <KeyboardItem2
              {...{value: item}}
              onClick={onKeyboardClick}
              key={`item-${item}-${index}`}>
            {item}
          </KeyboardItem2>
      );
    };
    const getAriaAttr = (label: string) => {
      if (IS_IOS) {
        return {label, iconOnly: true};
      } else {
        return {role: 'button', 'aria-label': label};
      }
    };


    return {
      linkedInput,
      confirmDisabled,
      confirmKeyboardItem,
      onKeyboardClick,
      renderKeyboardItem,
      getAriaAttr
    };
  },
  render() {
    const {
      prefixCls,
      confirmLabel,
      backspaceLabel,
      cancelKeyboardLabel,
      wrapProps,
      header
    } = this;

    const wrapperCls = classnames(
        `${prefixCls}-wrapper`,
        `${prefixCls}-wrapper-hide`
    );
    const KeyboardItem2: any = KeyboardItem;
    return (
        <div class={wrapperCls} ref="antmKeyboard" {...wrapProps}>
          {header}
          <table>
            <tbody>
              <tr>
                {['1', '2', '3'].map((item, index) =>
                    // tslint:disable-next-line:jsx-no-multiline-js
                    this.renderKeyboardItem(item, index)
                )}
                <KeyboardItem2
                    {
                      ...{
                        ...this.getAriaAttr(backspaceLabel),
                        type: 'keyboard-delete',
                        rowSpan: 2,
                        onClick: e => this.onKeyboardClick(e, 'delete')
                      }
                    }
                />
              </tr>
              <tr>
                {['4', '5', '6'].map((item, index) =>
                    // tslint:disable-next-line:jsx-no-multiline-js
                    this.renderKeyboardItem(item, index)
                )}
              </tr>
              <tr>
                {['7', '8', '9'].map((item, index) =>
                    // tslint:disable-next-line:jsx-no-multiline-js
                    this.renderKeyboardItem(item, index)
                )}
                <KeyboardItem2
                    {
                      ...{
                        type: 'keyboard-confirm',
                        rowSpan: 2,
                        onClick: e => this.onKeyboardClick(e, 'confirm')
                      }
                    }
                    tdRef="td"
                >
                  {confirmLabel}
                </KeyboardItem2>
              </tr>
              <tr>
                {['.', '0'].map((item, index) =>
                    // tslint:disable-next-line:jsx-no-multiline-js
                    this.renderKeyboardItem(item, index)
                )}
                <KeyboardItem2
                    {
                      ...{
                        ...this.getAriaAttr(cancelKeyboardLabel),
                        type: 'keyboard-hide',
                        onClick: e => this.onKeyboardClick(e, 'hide')
                      }
                    }
                />
              </tr>
            </tbody>
          </table>
        </div>
    );
  }
});
