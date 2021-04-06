import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { createVNode as _createVNode, mergeProps as _mergeProps } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { formComponentProps, useFormComponent } from '../../mixins/form-component';
import classnames from 'classnames';
import { defineComponent } from 'vue';
var Switch = defineComponent({
  name: 'MSwitch',
  props: _objectSpread(_objectSpread({}, formComponentProps), {}, {
    color: {
      type: String
    },
    name: {
      type: String
    },
    prefixCls: {
      type: String,
      default: 'am-switch'
    },
    platform: {
      type: String,
      default: 'ios'
    }
  }),
  setup: function setup(props, ctx) {
    var _useFormComponent = useFormComponent(props, ctx),
        currentValue = _useFormComponent.currentValue;

    var onChange = function onChange(e) {
      currentValue.value = e.target.checked;
    };

    var onClick = function onClick(e) {
      var val; // tslint:disable-next-line:prefer-conditional-expression

      if (e && e.target && e.target.checked !== undefined) {
        val = e.target.checked;
      } else {
        val = props.value;
      }

      currentValue.value = val;
    };

    return {
      currentValue: currentValue,
      onChange: onChange,
      onClick: onClick
    };
  },
  render: function render() {
    var prefixCls = this.prefixCls,
        name = this.name,
        disabled = this.disabled,
        platform = this.platform,
        color = this.color,
        restProps = _objectWithoutProperties(this, ["prefixCls", "name", "disabled", "platform", "color"]);

    var wrapCls = classnames(prefixCls, _defineProperty({}, "".concat(prefixCls, "-android"), platform === 'android'));
    var fackInputCls = classnames('checkbox', _defineProperty({}, "checkbox-disabled", disabled));
    var globalProps = Object.keys(restProps).reduce(function (prev, key) {
      if (key.substr(0, 5) === 'aria-' || key.substr(0, 5) === 'data-' || key === 'role') {
        prev[key] = restProps[key];
      }

      return prev;
    }, {});
    var style = {};

    if (color && this.currentValue) {
      style.backgroundColor = color;
    }

    return _createVNode("label", {
      "class": wrapCls
    }, [_createVNode("input", _mergeProps({
      "type": "checkbox",
      "name": name,
      "class": "".concat(prefixCls, "-checkbox"),
      "disabled": disabled,
      "checked": this.currentValue,
      "onChange": this.onChange,
      "value": this.currentValue ? 'on' : 'off'
    }, !disabled ? {
      onClick: this.onClick
    } : {}, globalProps), null), _createVNode("div", _mergeProps({
      "class": fackInputCls,
      "style": style
    }, disabled ? {
      onClick: this.onClick
    } : {}), null)]);
  }
});
export default Switch;