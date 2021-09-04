import {CSSProperties} from 'vue';
import {UIComponent} from './component';

export declare class BadgeComponent extends UIComponent {

  public $props: {
    prefixCls: string;
    hot: boolean;
    size: string;
    overflowCount: number;
    corner: boolean;
    dot: boolean;
    text: string | number;
    textStyle: CSSProperties;
  };
}
