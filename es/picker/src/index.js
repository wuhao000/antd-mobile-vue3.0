import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import { resolveDirective as _resolveDirective, isVNode as _isVNode, createVNode as _createVNode } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import treeFilter from 'array-tree-filter';
import { cloneVNode, defineComponent, provide, reactive, ref, watch } from 'vue';
import { setProps } from '../../utils/vnode';
import RMCCascader from '../../vmc-cascader/cascader';
import RMCPopupCascader from '../../vmc-cascader/popup';
import RMCMultiPicker from '../../vmc-picker/multi-picker';
import RMCPicker from '../../vmc-picker/picker';

function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !_isVNode(s);
}

export var PickerMixin = function PickerMixin(isView) {
  return defineComponent({
    name: 'Picker',
    props: {
      placeholder: {
        type: String,
        default: ''
      },
      cancelText: {
        type: String,
        default: '取消'
      },
      okText: {
        type: String,
        default: '确定'
      },
      prefixCls: {
        type: String,
        default: 'am-picker'
      },
      triggerType: {
        type: String,
        default: 'click'
      },
      pickerPrefixCls: {
        type: String,
        default: 'am-picker-col'
      },
      popupPrefixCls: {
        type: String,
        default: 'am-picker-popup'
      },
      title: {
        type: [String, Object],
        default: ''
      },
      data: {},
      cascade: {
        type: Boolean,
        default: true
      },
      value: {
        type: Array
      },
      format: {
        type: Function,
        default: function _default(values) {
          // label is JSX.Element or other
          if (values.length > 0 && typeof values[0] !== 'string') {
            return values;
          }

          return values.join(',');
        }
      },
      cols: {
        type: Number,
        default: 3
      },
      extra: {},
      onChange: {},
      itemStyle: {},
      indicatorStyle: {},
      visible: {
        type: Boolean,
        default: false
      }
    },
    setup: function setup(props, _ref) {
      var _props$value;

      var emit = _ref.emit,
          slots = _ref.slots;
      var state = reactive({
        visible: props.visible
      });
      watch(function () {
        return props.visible;
      }, function (v) {
        state.visible = v;
      });
      watch(function () {
        return state.visible;
      }, function (v) {
        return emit('update:visible', v);
      });
      var currentValue = ref((_props$value = props.value) !== null && _props$value !== void 0 ? _props$value : []);
      var popupProps = ref(null);
      watch(function () {
        return props.value;
      }, function (v) {
        if (v && v !== currentValue.value) {
          currentValue.value = _toConsumableArray(v);
        }
      }, {
        immediate: true
      });

      var getSel = function getSel() {
        var value = currentValue.value || [];
        var treeChildren;
        var data = props.data;

        if (props.cascade) {
          treeChildren = treeFilter(data, function (c, level) {
            return c.value === value[level];
          });
        } else {
          treeChildren = value.map(function (v, i) {
            return data[i].filter(function (d) {
              return d.value === v;
            })[0];
          });
        }

        var extra = props.format && props.format(treeChildren.map(function (v) {
          return v.label;
        }));

        if (Array.isArray(extra)) {
          return extra[0];
        }

        return extra;
      };

      var getPickerCol = function getPickerCol() {
        var data = props.data,
            pickerPrefixCls = props.pickerPrefixCls,
            itemStyle = props.itemStyle,
            indicatorStyle = props.indicatorStyle;
        return data.map(function (col, index) {
          return _createVNode(RMCPicker, {
            "key": index,
            "prefixCls": pickerPrefixCls,
            "style": {
              flex: 1
            },
            "data": col,
            "itemStyle": itemStyle,
            "indicatorStyle": indicatorStyle
          }, null);
        });
      };

      var onOk = function onOk(v) {
        emit('update:value', _toConsumableArray(currentValue.value));
        state.visible = false;
      };

      var setScrollValue = function setScrollValue(v) {
        currentValue.value = v;
      };

      var setCasecadeScrollValue = function setCasecadeScrollValue(v) {
        // 级联情况下保证数据正确性，滚动过程中只有当最后一级变化时才变更数据
        if (v && currentValue.value) {
          var length = currentValue.value.length;

          if (length === v.length && currentValue.value[length - 1] === v[length - 1]) {
            return;
          }
        }

        setScrollValue(v);
      };

      var onPickerChange = function onPickerChange(v) {
        setScrollValue(v);
        emit('pickerChange', v);
      };

      var onCancel = function onCancel() {
        var _props$value2;

        state.visible = false;
        currentValue.value = (_props$value2 = props.value) !== null && _props$value2 !== void 0 ? _props$value2 : [];
      };

      var getPlaceholder = function getPlaceholder() {
        return props.placeholder || '';
      };

      provide('store', {
        onOk: null
      });
      return {
        onOk: onOk,
        onPickerChange: onPickerChange,
        getSel: getSel,
        getPlaceholder: getPlaceholder,
        state: state,
        onCancel: onCancel,
        setCasecadeScrollValue: setCasecadeScrollValue,
        setScrollValue: setScrollValue,
        getPickerCol: getPickerCol,
        popupProps: popupProps,
        currentValue: currentValue
      };
    },
    render: function render() {
      var _this = this;

      var _this$$props = this.$props,
          popupPrefixCls = _this$$props.popupPrefixCls,
          itemStyle = _this$$props.itemStyle,
          indicatorStyle = _this$$props.indicatorStyle,
          okText = _this$$props.okText,
          cancelText = _this$$props.cancelText,
          extra = _this$$props.extra,
          cascade = _this$$props.cascade,
          prefixCls = _this$$props.prefixCls,
          pickerPrefixCls = _this$$props.pickerPrefixCls,
          data = _this$$props.data,
          cols = _this$$props.cols,
          restProps = _objectWithoutProperties(_this$$props, ["popupPrefixCls", "itemStyle", "indicatorStyle", "okText", "cancelText", "extra", "cascade", "prefixCls", "pickerPrefixCls", "data", "cols"]);

      var _cascader;

      var popupMoreProps = {};

      if (cascade) {
        _cascader = _createVNode(RMCCascader, {
          "prefixCls": prefixCls,
          "pickerPrefixCls": pickerPrefixCls,
          "data": data,
          "cols": cols,
          'value': _this.currentValue,
          "onUpdate:value": function onUpdateValue($event) {
            return _this.currentValue = $event;
          },
          "onChange": this.onPickerChange,
          "onScrollChange": this.setCasecadeScrollValue,
          "pickerItemStyle": itemStyle,
          "indicatorStyle": indicatorStyle
        }, null);
      } else {
        var _slot;

        _cascader = _createVNode(RMCMultiPicker, {
          "style": {
            flexDirection: 'row',
            alignItems: 'center'
          },
          "prefixCls": prefixCls,
          'value': _this.currentValue,
          "onUpdate:value": function onUpdateValue($event) {
            return _this.currentValue = $event;
          },
          "onScrollChange": this.setScrollValue
        }, _isSlot(_slot = this.getPickerCol()) ? _slot : {
          default: function _default() {
            return [_slot];
          }
        });
        popupMoreProps = {
          pickerValueProp: 'value',
          pickerValueChangeProp: 'onValueChange'
        };
      }

      if (isView) {
        return _cascader;
      }

      var props = _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, this.popupProps), restProps), popupMoreProps), {}, {
        prefixCls: popupPrefixCls,
        visible: this.state.visible,
        cascader: _cascader,
        cancelText: cancelText,
        okText: okText,
        onOk: this.onOk,
        onCancel: this.onCancel
      });

      var childExtra = this.getSel() || extra || this.getPlaceholder() || '';
      return _createVNode(RMCPopupCascader, props, {
        cascader: function cascader() {
          return _cascader;
        },
        default: function _default() {
          return _this.$slots.default && _this.$slots.default().map(function (child) {
            var node = cloneVNode(child);
            setProps(node, {
              touchFeedback: true,
              extra: childExtra,
              arrow: 'horizontal',
              onClick: function onClick() {
                _this.state.visible = true;
              }
            });
            return node;
          });
        }
      });
    }
  });
};
export default PickerMixin(false);