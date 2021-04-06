import _defineProperty from "@babel/runtime/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { useSimpleFormComponent } from './simple-form-component';
import { computed } from 'vue';
import { usePureInputComponent } from './pure-input-component';
export var useBaseInputComponent = function useBaseInputComponent(props, _ref) {
  var emit = _ref.emit,
      attrs = _ref.attrs,
      slots = _ref.slots;
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    defaultValue: undefined,
    propName: 'value'
  };

  var _useSimpleFormCompone = useSimpleFormComponent(props),
      isReadonly = _useSimpleFormCompone.isReadonly,
      componentSize = _useSimpleFormCompone.componentSize,
      isDisabled = _useSimpleFormCompone.isDisabled;

  var _usePureInputComponen = usePureInputComponent(props, {
    emit: emit,
    attrs: attrs
  }, options),
      getSlotProps = _usePureInputComponen.getSlotProps,
      cssStyle = _usePureInputComponen.cssStyle,
      listeners = _usePureInputComponen.listeners,
      getDefaultSlot = _usePureInputComponen.getDefaultSlot,
      getProps = _usePureInputComponen.getProps,
      stateValue = _usePureInputComponen.stateValue;

  return {
    isReadonly: isReadonly,
    componentSize: componentSize,
    isDisabled: isDisabled,
    getDefaultSlot: getDefaultSlot,
    slots: slots,
    stateValue: stateValue,
    listeners: listeners,
    cssStyle: cssStyle,
    props: computed(function () {
      return _objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, getSlotProps()), attrs), props), getProps()), {}, {
        disabled: isDisabled,
        readOnly: isReadonly,
        visible: stateValue
      });
    })
  };
};