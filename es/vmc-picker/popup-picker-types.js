export var PopupPickerProps = {
  picker: {},
  value: {},
  triggerType: {
    type: String,
    default: 'click'
  },
  WrapComponent: {},
  cancelText: {},
  okText: {},
  title: {},
  visible: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  content: {},
  actionTextUnderlayColor: {},
  actionTextActiveOpacity: {},

  /** web only */
  wrapStyle: {},
  prefixCls: {},
  pickerValueProp: {
    type: String
  },
  pickerValueChangeProp: {
    type: String
  },
  transitionName: {},
  popupTransitionName: {},
  maskTransitionName: {}
};