import {VNode} from 'vue';
import {Action} from '../../src/packages/modal/src/props-type';
import {UIComponent} from './component';

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
