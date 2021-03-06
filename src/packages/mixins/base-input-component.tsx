import {useSimpleFormComponent} from './simple-form-component';
import {computed} from 'vue';
import {usePureInputComponent} from './pure-input-component';

export const useBaseInputComponent = (props, {emit, attrs, slots}, options: {
  defaultValue: any,
  propName: string
} = {
  defaultValue: undefined,
  propName: 'value'
}) => {
  const {isReadonly, componentSize, isDisabled} = useSimpleFormComponent(props);
  const {getSlotProps, cssStyle, listeners, getDefaultSlot, getProps, stateValue} = usePureInputComponent(props, {
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
    listeners, cssStyle,
    props: computed(() => {
      return {
        ...getSlotProps(),
        ...attrs,
        ...props,
        ...getProps(),
        disabled: isDisabled,
        readOnly: isReadonly,
        visible: stateValue
      };
    })
  };
};
