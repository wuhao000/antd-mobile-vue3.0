import {VNode} from 'vue';
import {UIComponent} from './component';

export declare class CalendarItemComponent extends UIComponent {
}

export declare class CalendarViewComponent extends UIComponent {
  public $props: CalendarProps & {
    prefixCls: string;
    timePickerPrefixCls: string;
    timePickerPickerPrefixCls: string;
  };
}

interface CalendarProps {
  defaultTimeValue: Date;
  value: Date[];
  defaultValue: Date[];
  displayMode: boolean;
  enterDirection: string;
  getDateExtra: (...args) => any;
  infiniteOpt: boolean;
  initialMonths: number;
  locale: any;
  maxDate: Date;
  minDate: Date;
  onSelect: (...args) => any;
  pickTime: boolean;
  prefixCls: string;
  renderHeader: (...args) => VNode;
  renderShortcut: (...args) => VNode;
  rowSize: any;
  showHeader: boolean;
  showShortcut: boolean;
  timePickerPickerPrefixCls: string;
  timePickerPrefixCls: string;
  title: string;
  type: string;
  visible: boolean;
}

export declare class CalendarComponent extends UIComponent {
  public static View: CalendarViewComponent;
  public static Item: CalendarItemComponent;

  public $props: CalendarProps & {
    prefixCls: string;
    timePickerPrefixCls: string;
    timePickerPickerPrefixCls: string;
  };
}
