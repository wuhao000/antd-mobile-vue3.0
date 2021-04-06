import _extends from "@babel/runtime/helpers/extends";
import { createVNode as _createVNode, isVNode as _isVNode, mergeProps as _mergeProps } from "vue";
import classnames from 'classnames';
import { defineComponent, reactive, watch } from 'vue';
import getDataAttr from '../../utils/get-data-attr';
import Checkbox from './checkbox';

function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !_isVNode(s);
}

export default defineComponent({
  name: 'MAgreeItem',
  props: {
    prefixCls: {
      type: String,
      default: 'am-checkbox'
    },
    name: {
      type: String
    },
    wrapLabel: {
      type: Boolean,
      default: true
    },
    defaultValue: {
      type: Boolean,
      default: false
    },
    value: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup: function setup(props, _ref) {
    var _props$value;

    var emit = _ref.emit;
    var state = reactive({
      value: (_props$value = props.value) !== null && _props$value !== void 0 ? _props$value : props.defaultValue
    });
    watch(function () {
      return state.value;
    }, function (value) {
      emit('update:value', value);
    });
    watch(function () {
      return props.value;
    }, function (value) {
      state.value = value;
    });
    return {
      state: state
    };
  },
  render: function render() {
    var _this = this;

    var _slot;

    var restProps = _extends({}, this.$props);

    var prefixCls = restProps.prefixCls;
    var wrapCls = classnames("".concat(prefixCls, "-agree"));
    return _createVNode("div", _mergeProps(getDataAttr(restProps), {
      "class": wrapCls
    }), [_createVNode(Checkbox, _mergeProps(restProps, {
      'value': _this.state.value,
      "onUpdate:value": function onUpdateValue($event) {
        return _this.state.value = $event;
      },
      "class": "".concat(prefixCls, "-agree-label")
    }), _isSlot(_slot = this.$slots.default()) ? _slot : {
      default: function _default() {
        return [_slot];
      }
    })]);
  }
});