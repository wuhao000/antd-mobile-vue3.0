import {defineComponent, PropType} from 'vue';
import List from '../../list';
import {creatFormComponentProps, useFormComponent} from '../../mixins/form-component';
import Slider from './index';

export default defineComponent({
  install: null,
  name: 'MSliderItem',
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
    maximumTrackStyle: {},
    minimumTrackStyle: {},
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
    title: {
      type: [String, Object] as PropType<string>
    }
  },
  setup(props, {emit}) {
    const {isDisabled, currentValue} = useFormComponent(props, {emit});
    return {isDisabled, currentValue};
  },
  render() {
    return (
      <List.Item multipleLine
                 class={'am-slider-item'}
                 control={
                   <Slider {...this.$props}
                           disabled={this.isDisabled}
                           style={{
                             marginLeft: '8px'
                           }}
                           value={this.currentValue}
                           onChange={
                             v => {
                               this.currentValue = v;
                             }
                           }/>
                 }
                 disabled={this.isDisabled}>
        {this.title}
      </List.Item>
    );
  }
});
