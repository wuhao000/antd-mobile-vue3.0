import { mergeProps as _mergeProps, createVNode as _createVNode } from "vue";
import Popup from '../popup';
import PopupMixin from './popup-mixin';

var getModal = function getModal(props, visible, _ref) {
  var getContent = _ref.getContent,
      hide = _ref.hide,
      onCancel = _ref.onCancel,
      onOk = _ref.onOk;
  var content = getContent();
  return _createVNode(Popup, _mergeProps({
    title: props.title,
    visible: visible,
    showCancel: true,
    showOk: true,
    closable: false,
    transitionName: props.transitionName || props.popupTransitionName,
    maskTransitionName: props.maskTransitionName
  }, {
    "onCancel": onCancel,
    "onOk": onOk,
    "style": props.style
  }), {
    default: function _default() {
      return [_createVNode("div", null, [content])];
    }
  });
};

export default PopupMixin(getModal, {
  prefixCls: 'rmc-picker-popup',
  WrapComponent: 'span',
  triggerType: 'onClick',
  pickerValueProp: 'value',
  pickerValueChangeProp: 'onValueChange'
});