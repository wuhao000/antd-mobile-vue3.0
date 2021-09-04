import {UIComponent} from './component';

export declare class AccordionComponent extends UIComponent {
  public $props: {
    onChange: (...args) => void;
    prefixCls: string;
    openAnimation: string | { [key: string]: unknown };
    accordion: boolean;
    activeKey: string | string[];
  };
}
