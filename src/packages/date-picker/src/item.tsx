import {defineComponent, inject, PropType, ref} from 'vue';
import List from '../../list';
import {useBaseInputComponent} from '../../mixins/base-input-component';
import {formComponentProps} from '../../mixins/form-component';
import DatePicker from './index';
import classNames from "classnames";

export default defineComponent({
  name: 'MDatePickerItem',
  inheritAttrs: false,
  props: {
    ...formComponentProps,
    title: {
      type: [String, Object] as PropType<string>
    }
  },
  setup(props, {emit, slots, attrs}) {
    const form = inject('list', undefined);
    const {stateValue, isDisabled, cssStyle, isReadonly} = useBaseInputComponent(props, {emit, slots, attrs}, form);
    const localOpen = ref(false);
    return {stateValue, localOpen, isDisabled, isReadonly, cssStyle};
  },
  render() {
    return <DatePicker {...this.$attrs}
                       disabled={this.isDisabled}
                       editable={!this.isReadonly}
                       v-models={[
                         [this.stateValue, 'value'],
                         [this.localOpen, 'open']
                       ]}
                       v-slots={this.$slots}>
      <List.Item title={this.title}
                 touchFeedback={true}
                 onClick={() => {
                   this.localOpen = true;
                 }}
                 style={this.cssStyle}
                 class={classNames('am-date-picker-item', this.$attrs.class as string | Record<string, string>)}
                 required={this.required}
                 disabled={this.isDisabled}
                 error={this.error}
                 errorDisplayType={this.errorDisplayType}
                 errorMessage={this.errorMessage}
                 arrow="horizontal"/>
    </DatePicker>;
  }
});
