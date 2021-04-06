import {defineComponent, ref} from 'vue';
import {DatePickerView} from '../../index';

export default defineComponent({
  setup() {
    const value = ref(new Date(2019, 0, 1, 0, 1));
    const value2 = ref(null);
    const onChange = value => {
      value.value = value;
    };
    return {
      value,
      value2,
      onChange
    };
  },
  render() {
    const {value2, value} = this;
    return (<>
      <m-list title="Start datetime">
      <m-list-item>
        <span v-time={value}/>
      </m-list-item>
      <DatePickerView
          v-model={[this.value, 'value']}
      />
    </m-list>
    <m-list title="End datetime">
      <m-list-item>
        <span v-time={value2}/>
      </m-list-item>
      <DatePickerView
          v-model={[this.value2, 'value']}
      />
    </m-list>
    </>);
  }
});
