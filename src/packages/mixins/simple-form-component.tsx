import {computed, inject} from 'vue';


export const simpleFormComponentProps = {
  value: {},
  size: {type: String},
  required: {type: Boolean, default: false},
  disabled: {type: Boolean},
  readOnly: {type: Boolean},
  error: {type: Boolean, default: false},
  errorMessage: {type: String},
  errorDisplayType: {type: String}
};

export const useSimpleFormComponent = (props, form) => {
  const isDisabled = computed(() => {
    let disabled = props.disabled;
    if (form && !disabled) {
      disabled = form.disabled;
    }
    return disabled;
  });

  const componentSize = computed(() => {
    let size = props.size;
    if (form && (size === undefined || size === null)) {
      size = form.size;
    }
    return size;
  });

  const isReadonly = computed(() => {
    let readOnly = props.readOnly;
    if (form && !readOnly) {
      readOnly = !form.editable;
    }
    return readOnly;
  });
  return {
    isDisabled, componentSize, isReadonly
  };
};
