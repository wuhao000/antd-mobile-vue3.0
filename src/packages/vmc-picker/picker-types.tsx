import {CSSProperties, PropType} from 'vue';


export default {
  disabled: {
    type: Boolean,
    default: false
  },
  value: {},
  itemStyle: {type: Object as PropType<object>},
  /** web only */
  prefixCls: {
    type: String
  },
  indicatorStyle: {
    type: Object as PropType<CSSProperties>
  },
  indicatorClassName: {
    type: String
  },
  defaultValue: {}
};
