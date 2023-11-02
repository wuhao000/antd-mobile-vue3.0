import classnames from 'classnames';
import {defineComponent, PropType, ref, Ref} from 'vue';
import {IS_IOS} from '../../utils/exenv';
import TouchFeedback from '../../vmc-feedback';

const KeyboardItem = defineComponent({
  name: 'MKeyboardItem',
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
      label,
      iconOnly,
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
        <td ref="td"
            onClick={e => {
              this.$emit('click', e, this.value);
            }}
            class={wrapCls}
            {...this.$attrs}>
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
    open: {
      type: Boolean,
      default: false
    },
    prefixCls: {
      type: String
    },
    confirmLabel: {},
    backspaceLabel: {type: String as PropType<string>},
    cancelKeyboardLabel: {type: String as PropType<string>},
    wrapProps: {
      type: Object
    },
    header: {}
  },
  emits: ['click'],
  setup(_, {emit}) {
    const linkedInput: Ref<any> = ref(null);
    const confirmDisabled: Ref<boolean> = ref(null);
    const confirmKeyboardItem: Ref<HTMLTableCellElement | null> = ref(null);

    const onKeyboardClick = (e, value: string = '') => {
      e.stopImmediatePropagation();
      if (value === 'confirm' && confirmDisabled.value) {
        return null;
      } else {
        emit('click', value);
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
      onKeyboardClick,
      prefixCls,
      confirmLabel,
      backspaceLabel,
      cancelKeyboardLabel,
      getAriaAttr,
      renderKeyboardItem,
      open,
      wrapProps,
      header
    } = this;

    const wrapperCls = classnames({
      [`${prefixCls}-wrapper`]: true,
      [`${prefixCls}-wrapper-hide`]: !open
    });
    return (
      <div class={wrapperCls} ref="antmKeyboard"
           {...wrapProps}>
        {header}
        <table>
          <tbody>
          <tr>
            {['1', '2', '3'].map((item, index) =>
              // tslint:disable-next-line:jsx-no-multiline-js
              renderKeyboardItem(item, index)
            )}
            <KeyboardItem
              {
                ...{
                  ...getAriaAttr(backspaceLabel),
                  type: 'keyboard-delete',
                  rowSpan: 2,
                  onClick: e => onKeyboardClick(e, 'delete')
                }
              }
            />
          </tr>
          <tr>
            {['4', '5', '6'].map((item, index) =>
              // tslint:disable-next-line:jsx-no-multiline-js
              renderKeyboardItem(item, index)
            )}
          </tr>
          <tr>
            {['7', '8', '9'].map((item, index) =>
              // tslint:disable-next-line:jsx-no-multiline-js
              renderKeyboardItem(item, index)
            )}
            <KeyboardItem
              {
                ...{
                  type: 'keyboard-confirm',
                  rowSpan: 2,
                  onClick: e => onKeyboardClick(e, 'confirm')
                }
              }
            >
              {confirmLabel}
            </KeyboardItem>
          </tr>
          <tr>
            {['.', '0'].map((item, index) =>
              // tslint:disable-next-line:jsx-no-multiline-js
              renderKeyboardItem(item, index)
            )}
            <KeyboardItem
              {
                ...{
                  ...getAriaAttr(cancelKeyboardLabel),
                  type: 'keyboard-hide',
                  onClick: e => onKeyboardClick(e, 'hide')
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
