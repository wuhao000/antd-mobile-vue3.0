import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { mergeProps as _mergeProps, createVNode as _createVNode } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { defineComponent, provide, ref, watch } from 'vue';
import { getComponentLocale } from '../../utils/getLocale';
import { setProps } from '../../utils/vnode';
import RCDatePicker from '../../vmc-date-picker/date-picker';
import PopupDatePicker from '../../vmc-date-picker/popup';
import defaultLocale from './locale/zh_CN';
import { datePickerProps } from './props-type';
import { formatFn } from './utils';
export var getDatePicker = function getDatePicker(isView) {
  return defineComponent({
    install: null,
    Item: null,
    name: 'MDatePicker',
    props: _objectSpread(_objectSpread({}, datePickerProps), {}, {
      placeholder: {
        type: String,
        default: ''
      },
      prefixCls: {
        type: String,
        default: 'am-picker'
      },
      use12Hours: {
        type: Boolean,
        default: false
      },
      pickerPrefixCls: {
        type: String,
        default: 'am-picker-col'
      },
      popupPrefixCls: {
        type: String,
        default: 'am-picker-popup'
      }
    }),
    setup: function setup(props, _ref) {
      var emit = _ref.emit;
      var scrollValue = ref(props.value);
      var localVisible = ref(props.visible);
      watch(function () {
        return props.visible;
      }, function (visible) {
        localVisible.value = visible;
      });

      var onOk = function onOk() {
        var value = props.value;

        if (scrollValue.value !== undefined) {
          value = scrollValue.value;
        }

        emit('update:value', value);
        emit('change', value);
        emit('ok', value);
      };

      var onVisibleChange = function onVisibleChange(visible) {
        scrollValue.value = undefined;
        localVisible.value = visible;
        emit('update:visible', visible);
      };

      var fixOnOk = function fixOnOk(picker) {
        if (picker) {
          picker.onOk = onOk;
        }
      };

      var onChange = function onChange(v) {
        scrollValue.value = v;

        if (isView) {
          emit('update:value', v);
          emit('change', v);
        }
      };

      var getDate = function getDate() {
        if (typeof props.value === 'number') {
          return new Date(props.value);
        } else {
          return props.value || new Date();
        }
      };

      provide('store', {
        onOk: null
      });
      return {
        scrollValue: scrollValue,
        onOk: onOk,
        onVisibleChange: onVisibleChange,
        fixOnOk: fixOnOk,
        onChange: onChange,
        getDate: getDate,
        localVisible: localVisible
      };
    },
    render: function render() {
      var _this = this;

      var value = this.value,
          popupPrefixCls = this.popupPrefixCls;
      var locale = getComponentLocale(this.$props, null, 'DatePicker', function () {
        return defaultLocale;
      });
      var okText = locale.okText,
          cancelText = locale.cancelText,
          extra = locale.extra,
          DatePickerLocale = locale.DatePickerLocale;
      /**
       * 注意:
       * 受控 表示 通过设置 value 属性、组件的最终状态跟 value 设置值一致。
       * 默认不设置 value 或 只设置 defaultValue 表示非受控。
       *
       * DatePickerView 对外通过 value “只支持 受控” 模式（可以使用 defaultDate 支持 非受控 模式，但不对外）
       * PickerView 对外通过 value “只支持 受控” 模式
       *
       * DatePicker / Picker 对外只有 value 属性 (没有 defaultValue)，
       * 其中 List 展示部分 “只支持 受控” 模式，
       * 弹出的 选择器部分 会随外部 value 改变而变、同时能自由滚动
       * （即不会因为传入的 value 不变而不能滚动 (不像原生 input 的受控行为)）
       *
       */

      var datePickerProps = {
        minuteStep: this.minuteStep,
        locale: DatePickerLocale,
        minDate: this.minDate,
        maxDate: this.maxDate,
        mode: this.mode,
        pickerPrefixCls: this.pickerPrefixCls,
        prefixCls: this.prefixCls,
        value: this.getDate(),
        use12Hours: this.use12Hours,
        onChange: this.onChange
      };

      var datePicker = _createVNode(RCDatePicker, datePickerProps, null);

      if (isView) {
        return datePicker;
      }

      var textValue = value ? formatFn(this, value) : null;
      var childExtra = textValue ? textValue : this.extra || extra || this.placeholder;
      var visible = this.disabled || !this.editable ? false : this.localVisible;
      return _createVNode(PopupDatePicker, _mergeProps({
        "onVisibleChange": this.onVisibleChange,
        "datePicker": datePicker
      }, this.$props, {
        "title": this.title,
        "disabled": this.disabled,
        "editable": this.editable,
        "visible": visible,
        "prefixCls": popupPrefixCls,
        "date": this.getDate(),
        "cancelText": this.cancelText || cancelText,
        "okText": this.okText || okText,
        "ref": this.fixOnOk
      }), {
        default: function _default() {
          return [_this.$slots.default && _this.$slots.default().map(function (it) {
            setProps(it, {
              touchFeedback: true,
              onClick: function onClick() {
                _this.onVisibleChange(true);
              },
              text: !!textValue,
              extra: childExtra,
              arrow: 'horizontal'
            });
            return it;
          })];
        }
      });
    }
  });
};
export default getDatePicker(false);