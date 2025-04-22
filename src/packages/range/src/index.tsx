import VcHandle from 'ant-design-vue/es/vc-slider/src/Handle';
import RcRange from 'ant-design-vue/es/vc-slider/src/Range';
import { CSSProperties, defineComponent, PropType } from 'vue';
import {creatFormComponentProps, useFormComponent} from '../../mixins/form-component';

export interface HandleGeneratorInfo {
  value: number;
  dragging: boolean;
  index: number;

  [key: string]: any;
}

export default defineComponent({
  name: 'Range',
  props: {
    ...creatFormComponentProps(),
    prefixCls: {
      type: String,
      default: 'am-slider'
    },
    handleStyle: Object as PropType<CSSProperties>,
    trackStyle: Object as PropType<CSSProperties>,
    railStyle: Object as PropType<CSSProperties>,
    onChange: Function,
    onAfterChange: Function,
    tipFormatter: {},
    pushable: {
      type: Boolean,
      default: false
    },
    min: {
      type: Number
    },
    max: {
      type: Number
    },
    step: {
      type: Number
    }
  },
  setup(props, ctx) {
    const {currentValue} = useFormComponent(props, ctx);
    const handle = (info: HandleGeneratorInfo) => <VcHandle {...info}/>;
    return {currentValue, handle};
  },
  render() {
    const Range = RcRange as any;
    return (
      <div class={`${this.prefixCls}-wrapper`}>
        <Range {...this.$props}
               handle={this.handle}
               value={this.currentValue}
               pushable={this.pushable}
               onChange={v => {
                 this.currentValue = v;
               }}/>
      </div>
    );
  }
});

