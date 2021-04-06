import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _extends from "@babel/runtime/helpers/extends";

var _this = this;

import { useEmitter } from './emitter';
import AsyncValidator from 'async-validator';
import { computed, getCurrentInstance, inject, nextTick, ref, watch } from 'vue';
import { getPropByPath } from './utils';

var noop = function noop(a, b) {};

export var formComponentProps = {
  /**
   * class 前缀
   */
  prefixCls: {
    type: String
  },
  disabled: {
    type: Boolean
  },
  error: {
    type: Boolean,
    default: false
  },
  errorMessage: {
    type: String
  },
  prop: {
    type: String
  },
  editable: {
    type: Boolean,
    default: true
  },

  /**
   * 是否必须
   */
  required: {
    type: Boolean,
    default: false
  },
  rules: {
    type: Array
  },
  value: {
    type: Object
  },
  errorDisplayType: {
    type: String
  }
};
export var useFormComponent = function useFormComponent(props, _ref) {
  var emit = _ref.emit;

  var _useEmitter = useEmitter(getCurrentInstance()),
      dispatch = _useEmitter.dispatch;

  var currentErrorMessage = ref(props.errorMessage);
  var list = inject('list');
  var validateStatus = ref('');
  var currentValue = ref(props.value);
  var validateDisabled = ref(true);
  var isCurrentError = ref(false);
  watch(function () {
    return props.errorMessage;
  }, function (errorMessage) {
    currentErrorMessage.value = errorMessage;
  });
  watch(function () {
    return props.value;
  }, function (value) {
    if (currentValue.value !== value) {
      currentValue.value = value;
    }
  });
  watch(function () {
    return currentValue.value;
  }, function (currentValue) {
    emit('update:value', currentValue);
    emit('change', currentValue);
  });
  var fieldValue = computed(function () {
    return currentValue.value;
  });
  var isDisabled = computed(function () {
    var disabled = props.disabled;

    if (list) {
      if (!disabled) {
        disabled = list.disabled;
      }
    }

    return disabled;
  });
  var isReadonly = computed(function () {
    var isReadonly = !props.editable;

    if (list && !isReadonly) {
      isReadonly = !list.editable;
    }

    return isReadonly;
  });

  var getFilteredRule = function getFilteredRule(trigger) {
    var rules = getRules();
    return rules.filter(function (rule) {
      if (!rule.trigger || trigger === '') {
        return true;
      }

      if (Array.isArray(rule.trigger)) {
        return rule.trigger.indexOf(trigger) > -1;
      } else {
        return rule.trigger === trigger;
      }
    }).map(function (rule) {
      return _extends({}, rule);
    });
  };

  var getRules = function getRules() {
    var formRules = list && list.rules;
    var prop = getPropByPath(formRules, props.prop || '');
    formRules = formRules ? prop.o[props.prop || ''] || prop.v : [];
    var selfRules = props.rules;
    var requiredRule = props.required !== undefined ? {
      required: props.required
    } : [];

    if (formRules && formRules.some(function (rule) {
      return rule.required !== undefined;
    }) || selfRules && selfRules.some(function (rule) {
      return rule.required !== undefined;
    })) {
      requiredRule = [];
    }

    return [].concat(selfRules || formRules || []).concat(requiredRule);
  };

  var onFieldBlur = function onFieldBlur() {};

  var onFieldChange = function onFieldChange() {
    if (validateDisabled.value) {
      validateDisabled.value = false;
    }
  };

  var validate = function validate(trigger) {
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
    nextTick(function () {
      validateDisabled.value = false;
      var rules = getFilteredRule(trigger);

      if ((!rules || rules.length === 0) && props.required === undefined) {
        callback();
        return true;
      }

      validateStatus.value = 'validating';
      var descriptor = {};

      if (rules && rules.length > 0) {
        rules.forEach(function (rule) {
          delete rule.trigger;
        });
      }

      descriptor[props.prop] = rules;
      var validator = new AsyncValidator(descriptor);

      var model = _defineProperty({}, props.prop, fieldValue.value);

      validator.validate(model, {
        firstFields: true
      }, function (errors, invalidFields) {
        validateStatus.value = !errors ? 'success' : 'error';
        isCurrentError.value = validateStatus.value === 'error';
        currentErrorMessage.value = errors ? errors[0].message : '';
        callback(currentErrorMessage.value, invalidFields);
        emit('validate', !errors, errors);
        list && list.$emit('validate', props.prop, !errors, currentErrorMessage.value || null);
      });
    });
  };

  {
    if (list) {
      dispatch('DForm', 'd.form.addField', [_this]);
    }
  }
  return {
    currentValue: currentValue,
    onFieldChange: onFieldChange,
    validate: validate,
    onFieldBlur: onFieldBlur,
    isReadonly: isReadonly,
    isDisabled: isDisabled
  };
};