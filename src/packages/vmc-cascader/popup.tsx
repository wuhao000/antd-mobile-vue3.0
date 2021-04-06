import {defineComponent, inject, PropType, VNode} from 'vue';
import PopupPicker from '../vmc-picker/popup';

export default defineComponent({
  name: 'PopupCascader',
  props: {
    cascader: {
      type: Object as PropType<VNode>
    }
  },
  setup(props, {emit}) {
    const store: {
      onCancel: () => void;
      onOk: (...args: any) => any
    } = inject('store', undefined);

    const onCancel = () => {
      if (store.onCancel) {
        store.onCancel();
      }
      emit('cancel');
    };
    const onChange = v => {
      emit('change', v);
    };
    const onOk = (v) => {
      if (store.onOk) {
        store.onOk(v);
      }
      emit('change', v);
      emit('ok');
    };
    return {
      onCancel, onOk, onChange
    };
  },
  render() {
    const props = {
      picker: this.cascader,
      ...this.$props,
      ...this.$attrs,
      onCancel: this.onCancel,
      onChange: this.onChange,
      onOk: this.onOk
    };
    return (<PopupPicker
        {...props}
        v-slots={{
          picker: () => this.cascader,
          default: this.$slots.default
        }}
    />);
  }
});
