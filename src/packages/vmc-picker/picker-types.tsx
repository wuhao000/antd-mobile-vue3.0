import {CSSProperties, PropType} from 'vue';


export default {
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  value: {},
  itemStyle: {type: Object as PropType<object>},
  /** web only */
  prefixCls: {
    type: String as PropType<string>
  },
  indicatorStyle: {
    type: Object as PropType<CSSProperties>
  },
  indicatorClassName: {
    type: String as PropType<string>
  },
  defaultValue: {}
};
