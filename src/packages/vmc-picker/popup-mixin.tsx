import {defineComponent, reactive, ref, VNode, watch} from 'vue';
import {cloneVNodes, setListeners, setProps} from '../utils/vnode';
import {unwrapFragment} from '../utils/vue';
import {PopupPickerProps} from './popup-picker-types';

export default function PopupMixin(getModal, newProps) {
  return defineComponent({
    name: 'PopupMixin',
    inheritAttrs: false,
    props: {
      ...PopupPickerProps
    },
    setup(props, {emit, slots}) {
      const picker = ref<VNode>(null);
      const state = reactive({
        pickerValue: props.value !== undefined ? props.value : null,
        open: props.open || false
      });
      watch(() => state.open, (open) => {
        emit('open-change', open);
      });
      watch(() => props.value, value => {
        state.pickerValue = value;
      });
      watch(() => props.open, (value: boolean) => {
        setOpenState(value);
      });

      const onPickerChange = pickerValue => {
        if (state.pickerValue !== pickerValue) {
          state.pickerValue = pickerValue;
          const {pickerValueChangeProp} = props;

          if (picker.value?.props[pickerValueChangeProp!]) {
            (picker.value.props[pickerValueChangeProp!] as (p: unknown) => void)(pickerValue);
          }
        }
      };
      const saveRef = picker => {
        picker.value = picker;
      };
      const setOpenState = open => {
        state.open = open;
        if (!open) {
          state.pickerValue = null;
        }
      };
      const fireOpenChange = open => {
        if (state.open !== open) {
          setOpenState(open);
          emit('open-change', open);
          emit('update:open', open);
        }
      };
      const onTriggerClick = e => {
        const child: VNode = slots.default()[0];
        const childProps = child.props || {};
        if (childProps[props.triggerType!]) {
          childProps[props.triggerType!](e);
        }
        fireOpenChange(!state.open);
      };
      const onOk = () => {
        emit('ok');
        fireOpenChange(false);
      };
      const getContent = () => {
        if (slots.picker) {
          const localPicker: VNode = slots.picker()[0];
          let {pickerValue} = state;
          if (pickerValue === null) {
            pickerValue = props.value;
          }
          setProps(picker.value, ({
            [props.pickerValueProp!]: pickerValue,
            [props.pickerValueChangeProp]: onPickerChange
          }));

          // localPicker.ref = 'picker';
          return localPicker;
        }
        if (picker.value) {
          let {pickerValue} = state;
          if (pickerValue === null) {
            pickerValue = props.value;
          }
          return cloneVNodes(picker.value, ({
            [props.pickerValueProp!]: pickerValue,
            [props.pickerValueChangeProp]: onPickerChange,
            ref: saveRef
          }));
        } else {
          return props.picker;
        }
      };
      const onCancel = () => {
        fireOpenChange(false);
        emit('cancel');
      };
      const hide = () => {
        fireOpenChange(false);
        emit('hide');
      };

      return {
        getContent, onOk, hide, onCancel, state,
        onTriggerClick
      };
    },
    render() {
      const props = this.$props;
      const children = unwrapFragment(this.$slots.default());
      if (!children) {
        return getModal(props, this.state.open, {
          getContent: this.getContent,
          onOk: this.onOk,
          hide: this.hide,
          onCancel: this.onCancel
        });
      }
      const {disabled} = this.$props;
      if (!disabled) {
        children.forEach((child) => {
          setListeners(child, {
            [this.triggerType]: this.onTriggerClick
          });
        });
      }
      const modal = getModal(props, this.state.open, {
        getContent: this.getContent,
        onOk: this.onOk,
        hide: this.hide,
        onCancel: this.onCancel
      });
      return <>
        {children}
        {modal}
      </>;
    }
  });
}
