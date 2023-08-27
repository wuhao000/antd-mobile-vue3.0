import {VNode} from 'vue';
import {Action} from '../../../../types/components/modal';

export interface ModalPropsType<T> {
  title?: string | VNode;
  open: boolean;
  maskClosable?: boolean;
  closable?: boolean;
  footer?: Array<Action<T>>;
  onClose?: () => void;
  transparent?: boolean;
  popup?: boolean;
  animated?: boolean;
  animationType?: any;
  onAnimationEnd?: (open: boolean) => void;
  animateAppear?: boolean;
  operation?: boolean;
}

export type Callback = (valueOrLogin: string, password?: string) => void;
export type CallbackOrActions<T> = Callback | Array<Action<T>>;
