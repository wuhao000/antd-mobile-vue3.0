import VcHandle from 'ant-design-vue/es/vc-slider/src/Handle';
import RcSlider from 'ant-design-vue/es/vc-slider/src/Slider';
import {defineComponent, PropType} from 'vue';
import {creatFormComponentProps, useFormComponent} from '../../mixins/form-component';
import {HandleGeneratorInfo} from '../../range/src';

export default defineComponent({
  install: null,
  name: 'MSlider',
  props: {
    ...creatFormComponentProps(),
    prefixCls: {
      type: String,
      default: 'am-slider'
    },
    marks: {},
    dots: {
      type: Boolean
    },
    included: {
      type: Boolean
    },
    handleStyle: {},
    trackStyle: {},
    railStyle: {},
    tipFormatter: {},
    min: {
      type: Number
    },
    max: {
      type: Number
    },
    step: {
      type: Number
    },
    handle: {},
    onChange: Function
  },
  setup(props, {emit}) {
    const {isDisabled, currentValue} = useFormComponent(props, {emit});
    const handle = (info: HandleGeneratorInfo) => <VcHandle {...info}/>;
    return {isDisabled, handle, currentValue};
  },
  render() {
    const props = Object.assign({}, this.$props, {disabled: this.isDisabled});
    const Slider = RcSlider as any;
    return (
      <div class={`${this.prefixCls}-wrapper`}>
        <Slider {...props}
                value={this.currentValue}
                handle={this.handle}
                included={true}
                onChange={
                  value => {
                    this.currentValue = value;
                  }
                }/>
      </div>
    );
  }
});

