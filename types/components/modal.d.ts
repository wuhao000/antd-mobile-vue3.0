import {VNode} from 'vue';
import {UIComponent} from './component';


export interface Action<T> {
  text: string | VNode;
  onPress?: (...args: any[]) => void | Promise<any>;
  style?: T | string;
}

export declare class ModalComponent extends UIComponent {
  public static alert: (
      title: string | VNode,
      message: string | VNode,
      actions: Array<{
        text: string
      }>,
      platform?: string
  ) => Promise<any>;
  public static confirm: (title: (string | VNode),
                          message: (string | VNode),
                          actions?: {
                            text: string
                          }[],
                          platform?: string) => Promise<any>;
  public static operation: (
      actions: Array<Action<any>>,
      platform?: string
  ) => {
    close: () => void
  };
  public static prompt: (title: (string | VNode),
                         message: (string | VNode),
                         callbackOrActions?: Array<{
                           text: string,
                           style?: object
                         }>,
                         type?: string, defaultValue?: string, placeholders?: string[],
                         platform?: string) => Promise<any>;
}
