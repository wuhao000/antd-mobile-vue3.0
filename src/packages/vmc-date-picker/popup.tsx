import { defineComponent, inject, PropType } from 'vue';
import PopupPicker from '../vmc-picker/popup';

export default defineComponent({
  name: 'PopupDatePicker',
  props: {
    onOpenChange: {},
    title: {},
    open: {
      type: Boolean, default: false
    },
    cancelText: {type: String},
    okText: {type: String},
    prefixCls: {type: String},
    datePicker: {},
    date: {},
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    editable: {
      type: Boolean as PropType<boolean>,
      default: true
    }
  },
  setup(props, {emit, slots}) {
    const store: {
      value: Date,
      onOk: (...args: any) => any,
      onCancel: (...args: any) => any
    } = inject('store', undefined);

    const onCancel = () => {
      if (store.onCancel) {
        store.onCancel();
      }
      emit('cancel');
    };
    const onOk = v => {
      if (store.onOk) {
        store.onOk();
      }
      emit('change', v);
      emit('ok', v);
    };
    return {
      store,
      onCancel,
      onOk
    };
  },
  render() {
    const props = {
      ...this.$props,
      ...this.$attrs,
      picker: this.datePicker,
      value: this.date,
      disabled: this.disabled || !this.editable,
      onCancel: this.onCancel,
      onOk: this.onOk
    };
    return (<PopupPicker {...props}>{this.$slots.default?.()}</PopupPicker>);
  }
});
