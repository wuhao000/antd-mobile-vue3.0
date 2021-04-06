import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import { mergeProps as _mergeProps, createVNode as _createVNode } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import classnames from 'classnames';
import { defineComponent } from 'vue';
import Icon from '../../icon';
import RMCInputNumber from '../../vmc-input-number';
var MStepper = defineComponent({
  install: null,
  name: 'MStepper',
  props: {
    prefixCls: {
      type: String,
      default: 'am-stepper'
    },
    showNumber: {
      type: Boolean,
      default: true
    },
    min: {
      type: Number
    },
    max: {
      type: Number
    },
    step: {
      default: 1
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean
    },
    autoFocus: {
      type: Boolean
    },
    value: {
      type: [Number, String]
    },
    defaultValue: {
      type: Number
    },
    valueEditable: {
      type: Boolean,
      default: true
    },
    upStyle: {},
    downStyle: {},
    inputStyle: {},
    name: {
      type: String
    }
  },
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;

    var getCurrentValue = function getCurrentValue() {
      var value = props.value;
      var currentValue = null;

      if (typeof value === 'string') {
        if (value === '') {
          currentValue = null;
        } else {
          currentValue = parseInt(value);
        }
      } else {
        currentValue = value;
      }

      return currentValue;
    };

    return {
      getCurrentValue: getCurrentValue
    };
  },
  render: function render() {
    var _this$$props = this.$props,
        showNumber = _this$$props.showNumber,
        value = _this$$props.value,
        restProps = _objectWithoutProperties(_this$$props, ["showNumber", "value"]);

    var stepperClass = classnames({
      showNumber: !!showNumber
    });

    var props = _objectSpread({}, restProps);

    props.upHandler = _createVNode(Icon, {
      "type": "plus",
      "size": "xxs"
    }, null);
    props.downHandler = _createVNode(Icon, {
      "type": "minus",
      "size": "xxs"
    }, null);
    return _createVNode(RMCInputNumber, _mergeProps(_objectSpread(_objectSpread(_objectSpread({}, this.$attrs), props), {}, {
      value: this.getCurrentValue()
    }), {
      "class": stepperClass
    }), null);
  }
});
export default MStepper;