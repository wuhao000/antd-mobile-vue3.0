import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { mergeProps as _mergeProps, createVNode as _createVNode } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import VcHandle from 'ant-design-vue/es/vc-slider/src/Handle';
import RcRange from 'ant-design-vue/es/vc-slider/src/Range';
import { defineComponent } from 'vue';
import { formComponentProps, useFormComponent } from '../../mixins/form-component';
var Range = defineComponent({
  name: 'Range',
  props: _objectSpread(_objectSpread({}, formComponentProps), {}, {
    prefixCls: {
      type: String,
      default: 'am-slider'
    },
    handleStyle: {},
    trackStyle: {},
    railStyle: {},
    onChange: {},
    onAfterChange: {},
    tipFormatter: {},
    pushable: {
      type: Boolean,
      default: false
    },
    min: {
      type: Number
    },
    max: {
      type: Number
    },
    step: {
      type: Number
    }
  }),
  setup: function setup(props, ctx) {
    var _useFormComponent = useFormComponent(props, ctx),
        currentValue = _useFormComponent.currentValue;

    var handle = function handle(info) {
      return _createVNode(VcHandle, info, null);
    };

    return {
      currentValue: currentValue,
      handle: handle
    };
  },
  render: function render() {
    var _this = this;

    return _createVNode("div", {
      "class": "".concat(this.prefixCls, "-wrapper")
    }, [_createVNode(RcRange, _mergeProps(this.$props, {
      "handle": this.handle,
      "value": this.currentValue,
      "pushable": this.pushable,
      "onChange": function onChange(v) {
        _this.currentValue = v;
      }
    }), null)]);
  }
});
export default Range;