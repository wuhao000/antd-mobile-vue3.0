import {PropType, VNode} from 'vue';

export const PopupPickerProps = {
  picker: {},
  value: {},
  triggerType: {
    type: String as PropType<string>,
    default: 'click'
  },
  WrapComponent: {},
  cancelText: {},
  okText: {},
  title: {},
  open: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  content: {},
  actionTextUnderlayColor: {},
  actionTextActiveOpacity: {},
  /** web only */
  wrapStyle: {},
  prefixCls: {},
  pickerValueProp: {type: String as PropType<string>},
  pickerValueChangeProp: {type: String as PropType<string>},
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
