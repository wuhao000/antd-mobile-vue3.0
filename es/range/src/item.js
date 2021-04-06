import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { createVNode as _createVNode, mergeProps as _mergeProps } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { defineComponent } from 'vue';
import List from '../../list';
import { formComponentProps, useFormComponent } from '../../mixins/form-component';
import Range from './index';
var RangeItem = defineComponent({
  name: 'RangeItem',
  props: _objectSpread(_objectSpread({}, formComponentProps), {}, {
    title: {
      type: [String, Object]
    }
  }),
  setup: function setup(props, _ref) {
    var emit = _ref.emit;

    var _useFormComponent = useFormComponent(props, {
      emit: emit
    }),
        isDisabled = _useFormComponent.isDisabled,
        currentValue = _useFormComponent.currentValue;

    return {
      isDisabled: isDisabled,
      currentValue: currentValue
    };
  },
  render: function render() {
    var _this = this;

    return _createVNode(List.Item, {
      "multipleLine": true,
      "disabled": this.isDisabled
    }, {
      default: function _default() {
        return [_this.title, _createVNode(List.Item.Brief, {
          "style": {
            padding: '15px',
            flex: 1
          }
        }, {
          default: function _default() {
            return [_createVNode(Range, _mergeProps(_extends({}, _this.$attrs, _this.$props), {
              "style": {
                marginLeft: '8px'
              },
              "disabled": _this.isDisabled,
              "value": _this.currentValue
            }, {
              onChange: function onChange(v) {
                _this.currentValue = v;
              }
            }), null)];
          }
        })];
      }
    });
  }
});
export default RangeItem;