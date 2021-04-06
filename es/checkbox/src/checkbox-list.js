import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { isVNode as _isVNode, createVNode as _createVNode } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { defineComponent, getCurrentInstance, onMounted, watch } from 'vue';
import List from '../../list';
import { optionsBasedComponentProps, useOptionsBaseComponent } from '../../mixins/options-based-component';
import CheckboxItem from './checkbox-item';

function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !_isVNode(s);
}

var MCheckboxList = defineComponent({
  name: 'MCheckboxList',
  props: _objectSpread(_objectSpread({}, optionsBasedComponentProps), {}, {
    value: {
      type: Array
    },
    title: {
      type: String
    },
    maxHeightPercentage: {
      type: Number
    }
  }),
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots,
        attrs = _ref.attrs;

    var _useOptionsBaseCompon = useOptionsBaseComponent(props, {
      emit: emit,
      attrs: attrs,
      slots: slots
    }, {
      defaultValue: [],
      propName: 'value'
    }),
        getOptions = _useOptionsBaseCompon.getOptions,
        stateValue = _useOptionsBaseCompon.stateValue,
        isDisabled = _useOptionsBaseCompon.isDisabled;

    var renderOptions = function renderOptions() {
      var options = getOptions();
      return options.map(function (option) {
        return _createVNode(CheckboxItem, {
          "value": stateValue.value.includes(option.value),
          "disabled": option.disabled || isDisabled.value,
          "onChange": function onChange(checkState) {
            _onChange(checkState, option.value);
          }
        }, {
          default: function _default() {
            return [option.label];
          }
        });
      });
    };

    watch(function () {
      return props.value;
    }, function (v) {
      stateValue.value = v;
    });

    var _onChange = function _onChange(checkState, value) {
      if (checkState) {
        if (!stateValue.value.includes(value)) {
          stateValue.value = [].concat(_toConsumableArray(stateValue.value), [value]);
        }
      } else {
        stateValue.value = stateValue.value.filter(function (it) {
          return it !== value;
        });
      }
    };

    var instance = getCurrentInstance();
    onMounted(function () {
      if (props.maxHeightPercentage) {
        var windowHeight = document.body.clientHeight;
        var maxHeight = props.maxHeightPercentage;

        if (instance.vnode.el.clientHeight > windowHeight * maxHeight) {
          instance.vnode.el.style.height = windowHeight * maxHeight + 'px';
        }
      }
    });
    return {
      renderOptions: renderOptions
    };
  },
  render: function render() {
    var _slot;

    return _createVNode(List, {
      "required": this.required,
      "title": this.title
    }, _isSlot(_slot = this.renderOptions()) ? _slot : {
      default: function _default() {
        return [_slot];
      }
    });
  }
});
export default MCheckboxList;