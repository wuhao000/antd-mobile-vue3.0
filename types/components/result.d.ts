import {VNode} from 'vue';
import {UIComponent} from './component';

export declare class ResultComponent extends UIComponent {
  public $props: {
    prefixCls: string;
    imgUrl: string;
    img: string | VNode;
    title: string | VNode;
    message: string | VNode;
    buttonText: string;
    buttonType: string;
  };
}
