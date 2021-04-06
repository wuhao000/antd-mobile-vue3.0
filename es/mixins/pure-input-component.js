import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _extends from "@babel/runtime/helpers/extends";
import _typeof from "@babel/runtime/helpers/typeof";

var _this = this;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { computed, getCurrentInstance, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useEmitter } from './emitter';
export var usePureInputComponent = function usePureInputComponent(props, _ref) {
  var emit = _ref.emit,
      attrs = _ref.attrs;
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    defaultValue: undefined,
    propName: 'value'
  };
  var convertValue = ref(function (value) {
    return value;
  });
  var defaultValue = computed(function () {
    var convertedValue = convertValue.value(props[options.propName]);

    if (convertedValue !== null && convertedValue !== undefined) {
      return convertedValue;
    } else {
      return options === null || options === void 0 ? void 0 : options.defaultValue;
    }
  });
  var stateValue = ref(defaultValue.value);
  var instance = getCurrentInstance();

  var _useEmitter = useEmitter(instance),
      dispatch = _useEmitter.dispatch;

  watch(function () {
    return stateValue.value;
  }, function (value) {
    if (Array.isArray(value) && _typeof(value[0]) === 'object') {
      console.log('invalid');
    }

    var val = convertValueBack(value);

    if (props[options.propName] !== undefined) {
      emit("update:".concat(options.propName), val);
    }

    emit('change', val);
    dispatch('DFormItem', 'd.form.change', [val]);
  });
  watch(function () {
    return props[options.propName];
  }, function (value) {
    var convertedValue = convertValue.value(value);

    if (stateValue.value !== convertedValue) {
      stateValue.value = convertedValue;
    }
  });
  var cssStyle = computed(function () {
    var style = {};

    if (props.block) {
      style.display = 'block';
    }

    if (props.width) {
      if (typeof props.width === 'number') {
        style.width = "".concat(props.width, "px");
      } else {
        style.width = props.width;
      }
    }

    return style;
  });
  var listeners = computed(function () {
    var listeners = {
      onInput: onInput,
      onBlur: handleBlur,
      onChange: handleChange,
      onKeydown: handleKeydown,
      onKeyup: handleKeyup
    };
    Object.keys(attrs).forEach(function (key) {
      if (key in listeners) {
        listeners[key] = attrs[key];
      }
    });
    return listeners;
  });
  var slots = computed(function () {
    return _extends({}, slots, getSlots());
  });

  var getSlots = function getSlots() {
    return {};
  };

  var convertValueBack = function convertValueBack(value) {
    return value;
  };

  var getInputComponent = function getInputComponent() {
    return {};
  };

  var getProps = function getProps() {
    return {};
  };

  var getSlotProps = function getSlotProps() {
    var props = {};
    Object.keys(slots).forEach(function (slotKey) {
      if (slotKey !== 'default') {
        props[slotKey] = slots[slotKey];
      }
    });
    return props;
  };

  var handleBlur = function handleBlur() {
    dispatch('DFormItem', 'd.form.blur', [stateValue.value]);
  };

  var handleChange = function handleChange(value) {
    if (value !== null && value !== undefined && value.toString() === '[object InputEvent]') {
      return;
    }

    var comp = getInputComponent();

    if (comp.model && comp.model.prop === 'value' && comp.model.event === 'change') {
      stateValue.value = value;
    }
  };

  var handleKeydown = function handleKeydown() {
    emit('keydown');
  };

  var handleKeyup = function handleKeyup() {
    emit('keyup');
  };

  var onInput = function onInput(value) {
    var val = value;

    if (value && value.toString() === '[object InputEvent]') {
      val = value.target.value;
    }

    emit("update:".concat(options.propName), val);

    if (props[options.propName] === undefined) {
      stateValue.value = val;
    }
  };

  var getDefaultSlot = function getDefaultSlot() {
    var _slots$default;

    return (_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots);
  };

  onMounted(function () {
    dispatch('DFormItem', 'd.form-item.setControl', [_this]);
  });
  onBeforeUnmount(function () {
    dispatch('DFormItem', 'd.form-item.setControl', [null]);
  });
  return {
    getInputComponent: getInputComponent,
    listeners: listeners,
    cssStyle: cssStyle,
    stateValue: stateValue,
    getDefaultSlot: getDefaultSlot,
    props: computed(function () {
      return _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, getSlotProps()), attrs), props), getProps());
    }),
    slots: slots,
    getSlotProps: getSlotProps,
    getProps: getProps
  };
};
export var pureInputComponentProps = {
  block: Boolean,
  value: {},
  width: [String, Number]
};