import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { mergeProps as _mergeProps, createVNode as _createVNode } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import VcHandle from 'ant-design-vue/es/vc-slider/src/Handle';
import RcSlider from 'ant-design-vue/es/vc-slider/src/Slider';
import { defineComponent } from 'vue';
import { formComponentProps, useFormComponent } from '../../mixins/form-component';
var Slider = defineComponent({
  install: null,
  name: 'Slider',
  props: _objectSpread(_objectSpread({}, formComponentProps), {}, {
    prefixCls: {
      type: String,
      default: 'am-slider'
    },
    marks: {},
    dots: {
      type: Boolean
    },
    included: {
      type: Boolean
    },
    handleStyle: {},
    trackStyle: {},
    railStyle: {},
    tipFormatter: {},
    min: {
      type: Number
    },
    max: {
      type: Number
    },
    step: {
      type: Number
    },
    handle: {}
  }),
  setup: function setup(props, _ref) {
    var emit = _ref.emit;

    var _useFormComponent = useFormComponent(props, {
      emit: emit
    }),
        isDisabled = _useFormComponent.isDisabled,
        currentValue = _useFormComponent.currentValue;

    var handle = function handle(info) {
      return _createVNode(VcHandle, info, null);
    };

    return {
      isDisabled: isDisabled,
      handle: handle,
      currentValue: currentValue
    };
  },
  render: function render() {
    var _this = this;

    var props = _extends({}, this.$props, {
      disabled: this.isDisabled
    });

    return _createVNode("div", {
      "class": "".concat(this.prefixCls, "-wrapper")
    }, [_createVNode(RcSlider, _mergeProps(props, {
      "value": this.currentValue,
      "handle": this.handle,
      "included": true,
      "onChange": function onChange(value) {
        _this.currentValue = value;
      }
    }), null)]);
  }
});
export default Slider;