import {PropType, VNode} from 'vue';

export const PopupPickerProps = {
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
  open: {
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
  pickerValueProp: {type: String},
  pickerValueChangeProp: {type: String},
  transitionName: {},
  popupTransitionName: {},
  maskTransitionName: {}
};

export interface IPopupPickerProps {
  picker?: any;
  value?: any;
  triggerType?: string;
  WrapComponent?: any;
  cancelText?: string | VNode; // React.ReactElement only for web
  okText?: string | VNode; // React.ReactElement only for web
  title?: string | VNode; // React.ReactElement only for web
  open?: boolean;
  disabled?: boolean;
  style?: any;
  onOpenChange?: (open: boolean) => void;
  content?: VNode | string;
  /** react-native only */
  styles?: any;
  actionTextUnderlayColor?: string;
  actionTextActiveOpacity?: number;
  /** web only */
  wrapStyle?: object;
  prefixCls?: string;
  pickerValueProp?: string;
  pickerValueChangeProp?: string;
  transitionName?: string;
  popupTransitionName?: string;
  maskTransitionName?: string;
}
