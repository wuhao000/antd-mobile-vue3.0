import { computed, inject } from 'vue';
export var simpleFormComponentProps = {
  size: {
    type: String
  },
  required: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean
  },
  readOnly: {
    type: Boolean
  },
  error: {
    type: Boolean,
    default: false
  },
  errorMessage: {
    type: String
  },
  errorDisplayType: {
    type: String
  }
};
export var useSimpleFormComponent = function useSimpleFormComponent(props) {
  var form = inject('list');
  var isDisabled = computed(function () {
    var disabled = props.disabled;

    if (form && !disabled) {
      disabled = form.disabled;
    }

    return disabled;
  });
  var componentSize = computed(function () {
    var size = props.size;

    if (form && (size === undefined || size === null)) {
      size = form.size;
    }

    return size;
  });
  var isReadonly = computed(function () {
    var readOnly = props.readOnly;

    if (form && !readOnly) {
      readOnly = !form.editable;
    }

    return readOnly;
  });
  return {
    isDisabled: isDisabled,
    componentSize: componentSize,
    isReadonly: isReadonly
  };
};