import {PropType} from 'vue';


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
  indicatorStyle: {},
  indicatorClassName: {
    type: String as PropType<string>
  },
  defaultValue: {}
};
