import {defineComponent, PropType, ref} from 'vue';
import List from '../../list';
import {useBaseInputComponent} from '../../mixins/base-input-component';
import {formComponentProps} from '../../mixins/form-component';
import DatePicker from './index';

export default defineComponent({
  name: 'DatePickerItem',
  props: {
    ...formComponentProps,
    title: {
      type: [String, Object] as PropType<string>
    }
  },
  setup(props, {emit, slots, attrs}) {
    const {stateValue, isDisabled, cssStyle, isReadonly} = useBaseInputComponent(props, {emit, slots, attrs});
    const localVisible = ref(false);
    return {stateValue, localVisible, isDisabled, isReadonly, cssStyle};
  },
  render() {
    return <DatePicker {...this.$attrs}
                       disabled={this.isDisabled}
                       editable={!this.isReadonly}
                       v-models={[
                         [this.stateValue, 'value'],
                         [this.localVisible, 'visible']
                       ]}
                       v-slots={this.$slots}
                       style={this.cssStyle}>
      <List.Item title={this.title}
                 touchFeedback={true}
                 onClick={() => {
                   this.localVisible = true;
                 }}
                 required={this.required}
                 disabled={this.isDisabled}
                 error={this.error}
                 errorDisplayType={this.errorDisplayType}
                 errorMessage={this.errorMessage}
                 arrow="horizontal"/>
    </DatePicker>;
  }
});
