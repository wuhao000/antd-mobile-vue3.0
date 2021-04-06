import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import { isVNode as _isVNode, createVNode as _createVNode, mergeProps as _mergeProps } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import classnames from 'classnames';
import { defineComponent, reactive, watch } from 'vue';
import List from '../../list';
import Checkbox from './checkbox';

function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !_isVNode(s);
}

var CheckboxItem = defineComponent({
  name: 'MCheckboxItem',
  props: {
    thumbStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    listPrefixCls: {
      type: String,
      default: 'am-list'
    },
    prefixCls: {
      type: String,
      default: 'am-checkbox'
    },
    name: {
      type: String
    },
    wrapLabel: {
      type: Boolean,
      default: false
    },
    checkboxProps: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    extra: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  setup: function setup(props, _ref) {
    var emit = _ref.emit;
    var state = reactive({
      value: props.value
    });
    watch(function () {
      return props.value;
    }, function (value) {
      state.value = value;
    });
    watch(function () {
      return state.value;
    }, function (value) {
      emit('update:value', value);
      emit('change', value);
    });

    var onChange = function onChange(value) {};

    var onClick = function onClick(e) {
      if (!props.disabled) {
        state.value = !state.value;
      }
    };

    return {
      state: state,
      onChange: onChange,
      onClick: onClick
    };
  },
  render: function render() {
    var _slot;

    var _this = this;

    var _this$$props = this.$props,
        listPrefixCls = _this$$props.listPrefixCls,
        disabled = _this$$props.disabled,
        checkboxProps = _this$$props.checkboxProps,
        restProps = _objectWithoutProperties(_this$$props, ["listPrefixCls", "disabled", "checkboxProps"]);

    var prefixCls = restProps.prefixCls;
    var wrapCls = classnames("".concat(prefixCls, "-item"), _defineProperty({}, "".concat(prefixCls, "-item-disabled"), disabled === true));
    var extraProps = {};
    ['name', 'defaultChecked', 'checked', 'onChange', 'disabled'].forEach(function (i) {
      if (i in _this.$props) {
        extraProps[i] = _this.$props[i];
      }
    }); // @ts-ignore

    var thumb = _createVNode(Checkbox, _mergeProps(_objectSpread(_objectSpread(_objectSpread({}, checkboxProps), extraProps), {}, {
      value: this.state.value
    }), {
      "style": this.thumbStyle,
      "onChange": this.onChange
    }), null);

    return (// @ts-ignore
      _createVNode(List.Item, _mergeProps(restProps, {
        "touchFeedback": !this.disabled,
        "onClick": this.onClick,
        "prefixCls": listPrefixCls,
        "class": wrapCls,
        "thumb": thumb
      }), _isSlot(_slot = this.$slots.default()) ? _slot : {
        default: function _default() {
          return [_slot];
        }
      })
    );
  }
});
export default CheckboxItem;