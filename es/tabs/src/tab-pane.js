import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import { createVNode as _createVNode, mergeProps as _mergeProps } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { filterHTMLAttrs } from '../../utils/dom';
import { defineComponent, onBeforeUpdate, ref } from 'vue';
import { getPxStyle, getTransformPropValue } from './utils';
var TabPane = defineComponent({
  inheritAttrs: false,
  name: 'TabPane',
  props: {
    role: {
      type: String
    },
    active: {
      type: Boolean
    },
    fixX: {
      type: Boolean,
      default: true
    },
    fixY: {
      type: Boolean,
      default: true
    }
  },
  setup: function setup(props) {
    var layout = ref(null);
    var offsetX = ref(0);
    var offsetY = ref(0);

    var setLayout = function setLayout(div) {
      layout.value = div;
    };

    onBeforeUpdate(function () {
      if (props.active !== props.active) {
        if (props.active) {
          offsetX.value = 0;
          offsetY.value = 0;
        } else {
          offsetX.value = layout.value.scrollLeft;
          offsetY.value = layout.value.scrollTop;
        }
      }
    });
    return {
      setLayout: setLayout,
      offsetX: offsetX,
      offsetY: offsetY
    };
  },
  render: function render() {
    var active = this.active,
        fixX = this.fixX,
        fixY = this.fixY,
        props = _objectWithoutProperties(this, ["active", "fixX", "fixY"]);

    var style = _objectSpread(_objectSpread({}, fixX && this.offsetX ? getTransformPropValue(getPxStyle(-this.offsetX, 'px', false)) : {}), fixY && this.offsetY ? getTransformPropValue(getPxStyle(-this.offsetY, 'px', true)) : {});

    return _createVNode("div", _mergeProps({
      "style": style
    }, filterHTMLAttrs(_objectSpread(_objectSpread({}, this.$props), this.$attrs)), {
      "ref": this.setLayout
    }), [this.$slots.default()]);
  }
});
export default TabPane;