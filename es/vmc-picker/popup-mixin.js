import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { createVNode as _createVNode } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { defineComponent, reactive, ref, watch } from 'vue';
import { cloneVNodes, setListeners, setProps } from '../utils/vnode';
import { PopupPickerProps } from './popup-picker-types';
export default function PopupMixin(getModal, newProps) {
  return defineComponent({
    name: 'PopupMixin',
    props: _objectSpread({}, PopupPickerProps),
    setup: function setup(props, _ref) {
      var emit = _ref.emit,
          slots = _ref.slots;
      var picker = ref(null);
      var state = reactive({
        pickerValue: props.value !== undefined ? props.value : null,
        visible: props.visible || false
      });
      watch(function () {
        return state.visible;
      }, function (visible) {
        emit('visible-change', visible);
      });
      watch(function () {
        return props.value;
      }, function (value) {
        state.pickerValue = value;
      });
      watch(function () {
        return props.visible;
      }, function (value) {
        setVisibleState(value);
      });

      var onPickerChange = function onPickerChange(pickerValue) {
        if (state.pickerValue !== pickerValue) {
          state.pickerValue = pickerValue;
          var pickerValueChangeProp = props.pickerValueChangeProp;

          if (picker && picker.props[pickerValueChangeProp]) {
            picker.props[pickerValueChangeProp](pickerValue);
          }
        }
      };

      var saveRef = function saveRef(picker) {
        picker.value = picker;
      };

      var setVisibleState = function setVisibleState(visible) {
        state.visible = visible;

        if (!visible) {
          state.pickerValue = null;
        }
      };

      var fireVisibleChange = function fireVisibleChange(visible) {
        if (state.visible !== visible) {
          setVisibleState(visible);
          emit('visible-change', visible);
          emit('update:visible', visible);
        }
      };

      var onTriggerClick = function onTriggerClick(e) {
        var child = slots.default()[0];
        var childProps = child.props || {};

        if (childProps[props.triggerType]) {
          childProps[props.triggerType](e);
        }

        fireVisibleChange(!state.visible);
      };

      var onOk = function onOk() {
        emit('ok');
        fireVisibleChange(false);
      };

      var getContent = function getContent() {
        if (slots.picker) {
          var _setProps;

          var localPicker = slots.picker()[0];
          var pickerValue = state.pickerValue;

          if (pickerValue === null) {
            pickerValue = props.value;
          }

          setProps(picker.value, (_setProps = {}, _defineProperty(_setProps, props.pickerValueProp, pickerValue), _defineProperty(_setProps, props.pickerValueChangeProp, onPickerChange), _setProps)); // localPicker.ref = 'picker';

          return localPicker;
        }

        if (picker.value) {
          var _cloneVNodes;

          var _pickerValue = state.pickerValue;

          if (_pickerValue === null) {
            _pickerValue = props.value;
          }

          return cloneVNodes(picker.value, (_cloneVNodes = {}, _defineProperty(_cloneVNodes, props.pickerValueProp, _pickerValue), _defineProperty(_cloneVNodes, props.pickerValueChangeProp, onPickerChange), _defineProperty(_cloneVNodes, "ref", saveRef), _cloneVNodes));
        } else {
          return props.picker;
        }
      };

      var onCancel = function onCancel() {
        fireVisibleChange(false);
        emit('cancel');
      };

      var hide = function hide() {
        fireVisibleChange(false);
        emit('hide');
      };

      return {
        getContent: getContent,
        onOk: onOk,
        hide: hide,
        onCancel: onCancel,
        state: state,
        onTriggerClick: onTriggerClick
      };
    },
    render: function render() {
      var _this = this;

      var props = this.$props;
      var children = this.$slots.default();

      if (!children) {
        return getModal(props, this.state.visible, {
          getContent: this.getContent,
          onOk: this.onOk,
          hide: this.hide,
          onCancel: this.onCancel
        });
      }

      var disabled = this.$props.disabled;

      if (!disabled) {
        children.forEach(function (child) {
          setListeners(child, _defineProperty({}, _this.triggerType, _this.onTriggerClick));
        });
      }

      var modal = getModal(props, this.state.visible, {
        getContent: this.getContent,
        onOk: this.onOk,
        hide: this.hide,
        onCancel: this.onCancel
      });
      return _createVNode("div", {
        "style": props.wrapStyle
      }, [children, modal]);
    }
  });
}