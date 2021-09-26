import VcHandle from 'ant-design-vue/es/vc-slider/src/Handle';
import RcRange from 'ant-design-vue/es/vc-slider/src/Range';
import RcSlider from 'ant-design-vue/es/vc-slider/src/Slider';
import {defineComponent, PropType} from 'vue';
import {formComponentProps, useFormComponent} from '../../mixins/form-component';

export interface HandleGeneratorInfo {
  value: number;
  dragging: boolean;
  index: number;

  [key: string]: any;
}

export default defineComponent({
  name: 'Range',
  props: {
    ...formComponentProps,
    prefixCls: {
      type: String as PropType<string>,
      default: 'am-slider'
    },
    handleStyle: {},
    trackStyle: {},
    railStyle: {},
    onChange: {},
    onAfterChange: {},
    tipFormatter: {},
    pushable: {
      type: Boolean as PropType<boolean>, default: false
    },
    min: {
      type: Number as PropType<number>
    },
    max: {
      type: Number as PropType<number>
    },
    step: {
      type: Number as PropType<number>
    }
  },
  setup(props, ctx) {
    const {currentValue} = useFormComponent(props, ctx);
    const handle = (info: HandleGeneratorInfo) => <VcHandle {...info}/>;
    return {currentValue, handle};
  },
  render() {
    return (
        <div class={`${this.prefixCls}-wrapper`}>
          <RcRange {...this.$props}
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

