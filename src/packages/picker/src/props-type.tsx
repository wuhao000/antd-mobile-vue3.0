import {VNode} from 'vue';

export interface PickerData {
  value: string | number;
  label: VNode | string;
  children?: PickerData[];
  class?: any;
  style?: any;
}
