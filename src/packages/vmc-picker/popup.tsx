import Popup from '../popup';
import PopupMixin from './popup-mixin';

const getModal = (props, visible: boolean, {getContent, hide, onCancel, onOk}) => {
  const content = getContent();
  return <Popup
      {...{
        title: props.title,
        visible,
        showCancel: true,
        showOk: true,
        closable: false,
        transitionName: props.transitionName || props.popupTransitionName,
        maskTransitionName: props.maskTransitionName
      }}
      getContainer={'body'}
      onCancel={onCancel}
      onOk={onOk}
      style={props.style}>
    <div>{content}</div>
  </Popup>;
};

export default PopupMixin(getModal, {
  prefixCls: 'rmc-picker-popup',
  WrapComponent: 'span',
  triggerType: 'onClick',
  pickerValueProp: 'value',
  pickerValueChangeProp: 'onValueChange'
}) as any;
