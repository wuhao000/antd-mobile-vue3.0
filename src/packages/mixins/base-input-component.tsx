import {useSimpleFormComponent} from './simple-form-component';
import {computed} from 'vue';
import {usePureInput} from './pure-input-component';

export const useBaseInputComponent = (props, {emit, attrs, slots}, form, options: {
  defaultValue: any,
  propName: string
} = {
  defaultValue: undefined,
  propName: 'value'
}) => {
  const {isReadonly, componentSize, isDisabled} = useSimpleFormComponent(props, form);
  const {getSlotProps, setStateValue, cssStyle, listeners, getDefaultSlot, getProps, stateValue} = usePureInput(props, {
    emit,
    attrs
  }, options);
  return {
    isReadonly,
    componentSize,
    isDisabled,
    getDefaultSlot,
    slots,
    stateValue,
    setStateValue,
    listeners,
    cssStyle,
    props: computed(() => {
      return {
        ...getSlotProps(),
        ...attrs,
        ...props,
        ...getProps(),
        disabled: isDisabled,
        readOnly: isReadonly,
        open: stateValue
      };
    })
  };
};
