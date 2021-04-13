import moment from 'moment';


export interface MessageOptions {
  /**
   * content of the message
   * @type any (string | VNode | (h) => VNode)
   */
  content: any;

  /**
   * time(seconds) before auto-cancel, don't cancel if set to 0
   * @default 3
   * @type number
   */
  duration?: number;

  /**
   * type of message
   * @type string
   */
  type?: 'success' | 'info' | 'warning' | 'error' | 'loading';

  /**
   * Customized Icon
   * @type any  (string | VNode | (h) => VNode)
   */
  icon?: any;

  /**
   * Specify a function that will be called when the message is closed
   * @type Function
   */
  onClose?: () => void;
}

export declare class Message {
  public success(content: any, duration?: number, onClose?: () => void): Promise<any>;

  public warning(content: any, duration?: number, onClose?: () => void): Promise<any>;

  public warn(content: any, duration?: number, onClose?: () => void): Promise<any>;

  public info(content: any, duration?: number, onClose?: () => void): Promise<any>;

  public error(content: any, duration?: number, onClose?: () => void): Promise<any>;

  public loading(content: any, duration?: number, onClose?: () => void): Promise<any>;

  public open: (config: MessageOptions) => Promise<any>;
  public config: (options: MessageConfigOptions) => void;
  public destroy: () => void;
}


export interface MessageConfigOptions {
  /**
   * time before auto-cancel, in seconds
   * @default 1.5
   * @type number
   */
  duration?: number;

  /**
   * Return the mount node for Message
   * @default () => document.body
   * @type Function
   */
  getContainer?: () => HTMLElement;

  /**
   * max message show, drop oldest if exceed limit
   * @type number
   */
  maxCount?: number;

  /**
   * distance from top
   * @default '24px'
   * @type string
   */
  top?: string;
}

declare global {
  export const moment: typeof moment;
  export const axios: any;
  export const hljs: any;
  export const aegis: any;
  export const antd: any;
}

