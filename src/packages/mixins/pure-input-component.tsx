import {computed, getCurrentInstance, onBeforeUnmount, onMounted, ref, watch} from 'vue';
import {useEmitter} from './emitter';
import isEqual from "lodash.isequal";

export const usePureInput = <T extends any>(props, {emit, attrs}, options: {
  defaultValue: any,
  propName: string
} = {
  defaultValue: undefined,
  propName: 'value'
}) => {
  const convertValue = ref((value: T) => value);
  const defaultValue = computed(() => {
    const convertedValue = convertValue.value(props[options.propName]);
    if (convertedValue !== null && convertedValue !== undefined) {
      return convertedValue;
    } else {
      return options?.defaultValue;
    }
  });
  const stateValue = ref(defaultValue.value);
  const instance = getCurrentInstance();
  const {dispatch} = useEmitter(instance);
  watch(() => stateValue.value, value => {
    const val = convertValueBack(value);
    if (attrs[`onUpdate:${options.propName}`] && !isEqual(props[options.propName], val)) {
      emit(`update:${options.propName}`, val);
    }
    emit('change', val);
    dispatch('DFormItem', 'd.form.change', [val]);
  });
  const setStateValue = (value) => {
    const convertValue = convertValueBack(value);
    if (attrs[`onUpdate:${options.propName}`]) {
      if (attrs[`onUpdate:${options.propName}`]) {
        emit(`update:${options.propName}`, convertValue);
      }
      emit('change', convertValue);
    } else {
      stateValue.value = convertValue;
    }
  }
  watch(() => props[options.propName], value => {
    const convertedValue = convertValue.value(value);
    if (!isEqual(stateValue.value, convertedValue)) {
      stateValue.value = convertedValue;
    }
  });
  const cssStyle = computed(() => {
    const style: any = props.style || attrs.style || {};
    if (props.block) {
      style.display = 'block';
    }
    if (props.width) {
      if (typeof props.width === 'number') {
        style.width = `${props.width}px`;
      } else {
        style.width = props.width;
      }
    }
    return style;
  });
  const listeners = computed(() => {
    const listeners = {
      onInput,
      onBlur: handleBlur,
      onChange: handleChange,
      onKeydown: handleKeydown,
      onKeyup: handleKeyup
    };
    Object.keys(attrs).forEach(key => {
      if (key in listeners) {
        listeners[key] = attrs[key];
      }
    });
    return listeners;
  });
  const slots = computed(() => Object.assign({}, slots, getSlots()));
  const getSlots = () => {
    return {};
  };
  const convertValueBack = value => value;
  const getInputComponent = () => {
    return {};
  };
  const getProps = () => {
    return {};
  };
  const getSlotProps = () => {
    const props: any = {};
    Object.keys(slots).forEach((slotKey: string) => {
      if (slotKey !== 'default') {
        props[slotKey] = slots[slotKey];
      }
    });
    return props;
  };
  const handleBlur = () => {
    dispatch('DFormItem', 'd.form.blur', [stateValue.value]);
  };
  const handleChange = (value) => {
    if (value !== null && value !== undefined && value.toString() === '[object InputEvent]') {
      return;
    }
    const comp: any = getInputComponent();
    if (comp.model && comp.model.prop === 'value' && comp.model.event === 'change') {
      stateValue.value = value;
    }
  };
  const handleKeydown = () => {
    emit('keydown');
  };
  const handleKeyup = () => {
    emit('keyup');
  };
  const onInput = value => {
    let val = value;
    if (value && value.toString() === '[object InputEvent]') {
      val = value.target.value;
    }
    emit(`update:${options.propName}`, val);
    if (props[options.propName] === undefined) {
      stateValue.value = val;
    }
  };
  const getDefaultSlot = () => slots.default?.();
  onMounted(() => {
    dispatch('DFormItem', 'd.form-item.setControl', [this]);
  });
  onBeforeUnmount(() => {
    dispatch('DFormItem', 'd.form-item.setControl', [null]);
  });
  return {
    getInputComponent,
    listeners,
    cssStyle,
    stateValue,
    getDefaultSlot,
    props: computed(() => {
      return {
        ...getSlotProps(),
        ...attrs,
        ...props,
        ...getProps()
      };
    }),
    setStateValue,
    slots,
    getSlotProps,
    getProps
  };
};
export const pureInputComponentProps = {
  block: Boolean,
  value: {},
  width: [String, Number]
};
