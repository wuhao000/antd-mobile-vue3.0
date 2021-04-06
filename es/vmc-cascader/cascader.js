import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { isVNode as _isVNode, createVNode as _createVNode } from "vue";
import arrayTreeFilter from 'array-tree-filter';
import { defineComponent, inject, onBeforeUpdate, reactive } from 'vue';
import MultiPicker from '../vmc-picker/multi-picker';
import RmcPicker from '../vmc-picker/picker';

function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !_isVNode(s);
}

export default defineComponent({
  name: 'Cascader',
  props: {
    onChange: {},
    onScrollChange: {},
    defaultValue: {},
    value: {},
    data: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    cols: {
      type: Number,
      default: 3
    },
    disabled: {
      type: Boolean,
      default: false
    },
    pickerItemStyle: {},
    indicatorStyle: {},
    prefixCls: {
      default: 'rmc-cascader'
    },
    pickerPrefixCls: {
      default: 'rmc-picker'
    }
  },
  setup: function setup(props, _ref) {
    var emit = _ref.emit;
    var store = inject('store', undefined);

    var getValue = function getValue(d, val) {
      var data = d || props.data;
      var value = val || props.value || props.defaultValue;

      if (!value || !value.length || value.indexOf(undefined) > -1) {
        value = [];

        for (var i = 0; i < props.cols; i++) {
          if (data && data.length) {
            value[i] = data[0].value;
            data = data[0].children;
          }
        }
      }

      return value;
    };

    var state = reactive({
      value: getValue(props.data, props.defaultValue || props.value)
    });

    var onOk = function onOk() {
      emit('update:value', state.value);
      emit('change', state.value);
    };

    var onCancel = function onCancel() {
      state.value = getValue(props.data, props.defaultValue || props.value);
      emit('cancel', state.value);
    };

    var onScrollChange = function onScrollChange() {
      emit('scroll-change');
    };

    var onValueChange = function onValueChange(value) {
      state.value = value;
      emit('change', value);
    };

    var getCols = function getCols() {
      var data = props.data,
          cols = props.cols,
          pickerPrefixCls = props.pickerPrefixCls,
          disabled = props.disabled,
          pickerItemStyle = props.pickerItemStyle,
          indicatorStyle = props.indicatorStyle;
      var value = state.value;
      var childrenTree = arrayTreeFilter(data, function (c, level) {
        return c.value === value[level];
      }).map(function (c) {
        return c.children;
      }); // in case the users data is async get when select change

      var needPad = cols - childrenTree.length;

      if (needPad > 0) {
        for (var i = 0; i < needPad; i++) {
          childrenTree.push([]);
        }
      }

      childrenTree.length = cols - 1;
      childrenTree.unshift(data);
      return childrenTree.map(function () {
        var children = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var level = arguments.length > 1 ? arguments[1] : undefined;
        return _createVNode(RmcPicker, {
          "key": level,
          "prefixCls": pickerPrefixCls,
          "style": {
            flex: 1
          },
          "disabled": disabled,
          "data": children,
          "itemStyle": pickerItemStyle,
          "indicatorStyle": indicatorStyle
        }, null);
      });
    };

    {
      if (store) {
        store.onOk = onOk;
        store.onCancel = onCancel;
      }
    }
    onBeforeUpdate(function () {
      if (props.value !== undefined) {
        state.value = getValue(props.data, props.value);
      }
    });
    return {
      getCols: getCols,
      state: state,
      onValueChange: onValueChange,
      onScrollChange: onScrollChange
    };
  },
  render: function render() {
    var _pickerProps;

    var props = this.$props;
    var prefixCls = props.prefixCls;
    var cols = this.getCols();
    var multiStyle = {
      flexDirection: 'row',
      alignItems: 'center'
    };
    var pickerProps = (_pickerProps = {
      prefixCls: prefixCls,
      value: this.state.value,
      style: multiStyle
    }, _defineProperty(_pickerProps, 'onUpdate:value', this.onValueChange), _defineProperty(_pickerProps, "onScrollChange", this.onScrollChange), _pickerProps);
    return _createVNode(MultiPicker, pickerProps, _isSlot(cols) ? cols : {
      default: function _default() {
        return [cols];
      }
    });
  }
});