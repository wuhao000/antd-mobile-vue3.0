import _typeof from "@babel/runtime/helpers/typeof";
import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { simpleFormComponentProps } from './simple-form-component';
import { unwrapFragment } from '../utils/vue';
import { onBeforeUpdate, ref } from 'vue';
import { getOptionProperty } from '../utils/option';
import { getNodeText, isEmptySlot } from '../utils/vnode';
import { useBaseInputComponent } from './base-input-component';
export var optionsBasedComponentProps = _objectSpread(_objectSpread({}, simpleFormComponentProps), {}, {
  /**
   * 选项对象中作为标签的属性名称
   */
  labelProperty: {
    type: [String, Function],
    default: 'label'
  },

  /**
   * 选项对象中作为值的属性名称
   */
  valueProperty: {
    type: [String, Function],
    default: 'value'
  },

  /**
   * 选项数据
   */
  options: {
    type: Array
  }
});
export var useOptionsBaseComponent = function useOptionsBaseComponent(props, _ref) {
  var emit = _ref.emit,
      attrs = _ref.attrs,
      slots = _ref.slots;
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    defaultValue: undefined,
    propName: 'value'
  };

  var _useBaseInputComponen = useBaseInputComponent(props, {
    emit: emit,
    attrs: attrs,
    slots: slots
  }, options),
      isDisabled = _useBaseInputComponen.isDisabled,
      stateValue = _useBaseInputComponen.stateValue,
      isReadonly = _useBaseInputComponen.isReadonly;

  var searchKeyword = ref('');

  var getOptions = function getOptions() {
    return getResolvedOptions(props.options);
  };

  var getResolvedOptions = function getResolvedOptions(options) {
    if (options) {
      return options.map(function (option) {
        return _extends({}, option, {
          label: getOptionProperty(option, props.labelProperty),
          value: getOptionProperty(option, props.valueProperty)
        });
      }).filter(function (item) {
        var label = item.label;

        if (_typeof(label) === 'object') {
          label = getNodeText(label) || '';
        }

        return !searchKeyword.value || label.includes(searchKeyword.value);
      });
    } else {
      return null;
    }
  };

  var setProps = function setProps() {
    if (!isEmptySlot(slots.default)) {
      unwrapFragment(slots.default()).forEach(function (node) {
        if (node.props.disabled === undefined) {
          node.props.disabled = isDisabled.value;
        }

        if (node.props.readonly === undefined) {
          node.props.readonly = isReadonly.value;
        }
      });
    }
  };

  onBeforeUpdate(function () {
    setProps();
  });
  {
    setProps();
  }
  return {
    getOptions: getOptions,
    isReadonly: isReadonly,
    isDisabled: isDisabled,
    searchKeyword: searchKeyword,
    stateValue: stateValue
  };
};