import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import { createVNode as _createVNode, mergeProps as _mergeProps } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import classnames from 'classnames';
import { defineComponent } from 'vue';
import List from '../../list';
import Radio from './radio';
var RadioItem = defineComponent({
  name: 'MRadioItem',
  props: {
    prefixCls: {
      default: 'am-radio'
    },
    listPrefixCls: {
      default: 'am-list'
    },
    radioProps: {
      default: function _default() {
        return {};
      }
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

    var onChange = function onChange(value) {
      emit('change', value);
    };

    var onClick = function onClick(e) {
      if (!props.disabled) {
        emit('click', e);
        emit('change', !props.value);
      }
    };

    return {
      onClick: onClick,
      onChange: onChange
    };
  },
  render: function render() {
    var _this = this,
        _this$$slots$default,
        _this$$slots;

    var _this$$props = this.$props,
        listPrefixCls = _this$$props.listPrefixCls,
        disabled = _this$$props.disabled,
        radioProps = _this$$props.radioProps,
        otherProps = _objectWithoutProperties(_this$$props, ["listPrefixCls", "disabled", "radioProps"]);

    var prefixCls = otherProps.prefixCls;
    var wrapCls = classnames("".concat(prefixCls, "-item"), _defineProperty({}, "".concat(prefixCls, "-item-disabled"), disabled === true));
    var extraProps = {};
    ['name', 'disabled'].forEach(function (i) {
      if (i in _this.$props) {
        extraProps[i] = _this.$props[i];
      }
    }); // @ts-ignore

    var extra = _createVNode(Radio, _mergeProps(_objectSpread(_objectSpread({}, radioProps), extraProps), {
      "value": this.value,
      "onChange": this.onChange
    }), null);

    return _createVNode(List.Item, _mergeProps(otherProps, {
      "onClick": this.onClick,
      "prefixCls": listPrefixCls,
      "class": wrapCls,
      "extra": extra
    }), {
      default: function _default() {
        return [(_this$$slots$default = (_this$$slots = _this.$slots).default) === null || _this$$slots$default === void 0 ? void 0 : _this$$slots$default.call(_this$$slots)];
      }
    });
  }
});
export default RadioItem;