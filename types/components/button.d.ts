import {CSSProperties, VNode} from 'vue';
import {UIComponent} from './component';

export declare class ButtonComponent extends UIComponent {

  public $props: {
    onClick: (...args) => void;
    prefixCls: string;
    role: string;
    inline: boolean;
    icon: string | object | VNode;
    activeClassName: string;
    activeStyle: boolean | CSSProperties;
    type: string;
    size: string;
    disabled: boolean;
    loading: boolean;
  };
}
