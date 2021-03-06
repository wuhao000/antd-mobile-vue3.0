import {HandleGeneratorInfo} from '../../range/src';
import VcHandle from 'ant-design-vue/es/vc-slider/src/Handle';
import RcSlider from 'ant-design-vue/es/vc-slider/src/Slider';
import {defineComponent, PropType} from 'vue';
import {formComponentProps, useFormComponent} from '../../mixins/form-component';

const Slider = defineComponent({
  install: null,
  name: 'Slider',
  props: {
    ...formComponentProps,
    prefixCls: {
      type: String as PropType<string>,
      default: 'am-slider'
    },
    marks: {},
    dots: {
      type: Boolean as PropType<boolean>
    },
    included: {
      type: Boolean as PropType<boolean>
    },
    handleStyle: {},
    trackStyle: {},
    railStyle: {},
    tipFormatter: {},
    min: {
      type: Number as PropType<number>
    },
    max: {
      type: Number as PropType<number>
    },
    step: {
      type: Number as PropType<number>
    },
    handle: {}
  },
  setup(props, {emit}) {
    const {isDisabled, currentValue} = useFormComponent(props, {emit});
    const handle = (info: HandleGeneratorInfo) => <VcHandle {...info}/>;
    return {isDisabled, handle, currentValue};
  },
  render() {
    const props = Object.assign({}, this.$props, {disabled: this.isDisabled});
    return (
      <div class={`${this.prefixCls}-wrapper`}>
        <RcSlider {...props}
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

export default Slider as any;
