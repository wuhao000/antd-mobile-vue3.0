import AsyncValidator, {ValidateRule} from 'async-validator';
import {computed, getCurrentInstance, inject, nextTick, Prop, PropType, Ref, ref, watch} from 'vue';
import {useEmitter} from './emitter';
import {getPropByPath} from './utils';

const noop = function noop(a?, b?) {
  // do nothing
};

export const creatFormComponentProps = <T extends any>() => {
  return {
    /**
     * class 前缀
     */
    prefixCls: {
      type: String as PropType<string>
    },
    disabled: {
      type: Boolean as PropType<boolean>
    },
    error: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    errorMessage: {
      type: String as PropType<string>
    },
    errorDisplayType: {
      type: String as PropType<'toast' | 'popover' | 'text' | undefined>
    },
    prop: {
      type: String as PropType<string>
    },
    editable: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    /**
     * 是否必须
     */
    required: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    rules: {
      type: Array as PropType<ValidateRule[]>
    },
    defaultValue: {} as Prop<T>,
    value: {} as Prop<T>
  };
};
export const useFormComponent = (props, {emit, onChange}: {emit: any; onChange?: ((v) => void)}) => {
  const {dispatch} = useEmitter(getCurrentInstance());
  const currentErrorMessage = ref(props.errorMessage);
  const list: any = inject('list', undefined);
  const validateStatus: Ref<'' | 'success' | 'warning' | 'error' | 'validating'> = ref('');
  const currentValue = ref(props.value ?? props.defaultValue);
  const validateDisabled: Ref<boolean> = ref(true);
  const isCurrentError: Ref<boolean> = ref(false);
  watch(() => props.errorMessage, (errorMessage: string) => {
    currentErrorMessage.value = errorMessage;
  });
  watch(() => props.value, (value: any) => {
    if (currentValue.value !== value) {
      currentValue.value = value;
    }
  });
  watch(() => currentValue.value, val => {
    emit('update:value', val);
    if (onChange) {
      onChange(val);
    } else {
      emit('change', val);
    }
  });
  const fieldValue = computed(() => {
    return currentValue.value;
  });
  const isDisabled = computed(() => {
    let disabled = props.disabled;
    if (list) {
      if (!disabled) {
        disabled = list.disabled;
      }
    }
    return disabled;
  });
  const isReadonly = computed(() => {
    let isReadonly = !props.editable;
    if (list && !isReadonly) {
      isReadonly = !list.editable;
    }
    return isReadonly;
  });
  const getFilteredRule = (trigger) => {
    const rules = getRules();
    return rules.filter(rule => {
      if (!rule.trigger || trigger === '') {
        return true;
      }
      if (Array.isArray(rule.trigger)) {
        return rule.trigger.indexOf(trigger) > -1;
      } else {
        return rule.trigger === trigger;
      }
    }).map(rule => Object.assign({}, rule));
  };
  const getRules = () => {
    let formRules: any = list?.rules;
    const prop = getPropByPath(formRules, props.prop || '');
    formRules = formRules ? (prop.o[props.prop || ''] || prop.v) : [];
    const selfRules = props.rules;
    let requiredRule = props.required !== undefined ? {required: props.required} : [];
    if (formRules?.some(rule => rule.required !== undefined) || selfRules?.some(rule => rule.required !== undefined)) {
      requiredRule = [];
    }
    return [].concat(selfRules || formRules || []).concat(requiredRule);
  };
  const onFieldBlur = () => {
  };
  const onFieldChange = () => {
    if (validateDisabled.value) {
      validateDisabled.value = false;
    }
  };
  const validate = (trigger, callback = noop) => {
    nextTick(() => {
      validateDisabled.value = false;
      const rules = getFilteredRule(trigger);
      if ((!rules || rules.length === 0) && props.required === undefined) {
        callback();
        return true;
      }
      validateStatus.value = 'validating';
      const descriptor = {};
      if (rules && rules.length > 0) {
        rules.forEach(rule => {
          delete rule.trigger;
        });
      }
      descriptor[props.prop] = rules;
      const validator = new AsyncValidator(descriptor);
      const model = {
        [props.prop]: fieldValue.value
      };
      validator.validate(model, {firstFields: true}, (errors, invalidFields) => {
        validateStatus.value = !errors ? 'success' : 'error';
        isCurrentError.value = validateStatus.value === 'error';
        currentErrorMessage.value = errors ? errors[0].message : '';
        callback(currentErrorMessage.value, invalidFields);
        emit('validate', !errors, errors);
        list?.$emit('validate', props.prop, !errors, currentErrorMessage.value || null);
      });
    });
  };
  if (list) {
    dispatch('DForm', 'd.form.addField', [this]);
  }
  return {
    currentValue, onFieldChange, validate, onFieldBlur, isReadonly, isDisabled
  };
};
