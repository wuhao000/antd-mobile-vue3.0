import {defineComponent, PropType, VNode} from 'vue';
import List from '../../list';
import {formComponentProps, useFormComponent} from '../../mixins/form-component';
import Range from './index';

const RangeItem = defineComponent({
  name: 'MRangeItem',
  props: {
    ...formComponentProps,
    title: {
      type: [String, Object] as PropType<string | VNode>
    },
  },
  setup(props, {emit}) {
    const {isDisabled, currentValue} = useFormComponent(props, {emit});
    return {isDisabled, currentValue};
  },
  render() {
    return <List.Item multipleLine
                      class={'am-range-item'}
                      error={this.error}
                      errorMessage={this.errorMessage}
                      errorDisplayType={this.errorDisplayType}
                      control={<Range {...Object.assign({}, this.$attrs, this.$props)}
                                      style={{
                                        marginLeft: '8px'
                                      }}
                                      disabled={this.isDisabled}
                                      value={this.currentValue}
                                      {...{
                                        onChange: v => {
                                          this.currentValue = v;
                                        }
                                      }}/>}
                      disabled={this.isDisabled}>
      {this.title}
    </List.Item>;
  }
});

export default RangeItem;
