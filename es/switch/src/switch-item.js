import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { createVNode as _createVNode } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import classnames from 'classnames';
import { defineComponent, reactive, watch } from 'vue';
import List from '../../list';
import { formComponentProps, useFormComponent } from '../../mixins/form-component';
import Switch from './switch';
var ListItem = List.Item;
var switchItem = defineComponent({
  name: 'SwitchItem',
  props: _objectSpread(_objectSpread({}, formComponentProps), {}, {
    prefixCls: {
      default: 'am-switch'
    },
    listPrefixCls: {
      default: 'am-list'
    },
    switchProps: {
      default: function _default() {
        return {};
      }
    },
    title: {
      type: [String, Object]
    }
  }),
  setup: function setup(props, _ref) {
    var emit = _ref.emit;

    var _useFormComponent = useFormComponent(props, {
      emit: emit
    }),
        isDisabled = _useFormComponent.isDisabled;

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
    }, function (value, oldValue) {
      emit('update:value', value);

      if (value !== oldValue) {
        emit('change', value);
      }
    });

    var onClick = function onClick() {
      if (!props.disabled) {
        emit('click');
      }
    };

    return {
      state: state,
      onClick: onClick,
      isDisabled: isDisabled
    };
  },
  render: function render() {
    var _this = this,
        _this$$slots$default,
        _this$$slots;

    var _this$$props = this.$props,
        listPrefixCls = _this$$props.listPrefixCls,
        disabled = _this$$props.disabled,
        switchProps = _this$$props.switchProps,
        otherProps = _objectWithoutProperties(_this$$props, ["listPrefixCls", "disabled", "switchProps"]);

    var prefixCls = otherProps.prefixCls;
    var wrapCls = classnames("".concat(prefixCls, "-item"), _defineProperty({}, "".concat(prefixCls, "-item-disabled"), disabled === true));

    var extraProps = _objectSpread(_objectSpread(_objectSpread({}, this.$attrs), switchProps), {}, {
      disabled: this.isDisabled,
      value: this.state.value,
      'onUpdate:value': function onUpdateValue(value) {
        _this.state.value = value;
      },
      onClick: this.onClick
    }); // @ts-ignore


    var extra = _createVNode(Switch, extraProps, null);

    var listItemProps = _objectSpread(_objectSpread({}, otherProps), {}, {
      disabled: this.isDisabled,
      prefixCls: listPrefixCls,
      class: wrapCls,
      extra: extra
    });

    return _createVNode(ListItem, listItemProps, {
      default: function _default() {
        return [(_this$$slots$default = (_this$$slots = _this.$slots).default) === null || _this$$slots$default === void 0 ? void 0 : _this$$slots$default.call(_this$$slots)];
      }
    });
  }
});
export default switchItem;