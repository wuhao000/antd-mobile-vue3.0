import {VNode} from 'vue';
import {UIComponent} from './component';

export declare class ActionSheetComponent extends UIComponent {
  public $props: {
    prefixCls: string;
    /**
     * 取消按钮文本
     */
    cancelText: string | VNode;
    /**
     * 是否在点击遮罩层时关闭
     */
    closeOnClickingMask: boolean;
    /**
     * 是否在点击按钮后关闭
     */
    closeOnClickingMenu: boolean;
    menus: any;
    /**
     * 是否显示取消按钮
     */
    showCancel: boolean;
    theme: string;
    value: boolean;
    type: 'normal' | 'share';
    title: string | VNode;
  };
}
