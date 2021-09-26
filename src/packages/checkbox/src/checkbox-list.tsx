import {defineComponent, getCurrentInstance, inject, onMounted, PropType, watch} from 'vue';
import List from '../../list';
import {optionsBasedComponentProps, useOptionsBaseComponent} from '../../mixins/options-based-component';
import CheckboxItem from './checkbox-item';

export default defineComponent({
  name: 'MCheckboxList',
  props: {
    ...optionsBasedComponentProps,
    value: {
      type: Array as PropType<any[]>
    },
    title: {
      type: String as PropType<string>
    },
    maxHeightPercentage: {
      type: Number as PropType<number>
    }
  },
  setup(props, {emit, slots, attrs}) {
    const form = inject('list', undefined);
    const {getOptions, stateValue, isDisabled} = useOptionsBaseComponent(props, {emit, attrs, slots}, form, {
      defaultValue: [],
      propName: 'value'
    });
    const renderOptions = () => {
      const options = getOptions();
      return options.map(option => {
        return <CheckboxItem
            value={stateValue.value.includes(option.value)}
            disabled={option.disabled || isDisabled.value}
            onChange={(checkState) => {
              onChange(checkState, option.value);
            }}>{option.label}</CheckboxItem>;
      });
    };
    watch(() => props.value, (v) => {
      stateValue.value = v;
    });
    const onChange = (checkState: any, value: any) => {
      if (checkState) {
        if (!stateValue.value.includes(value)) {
          stateValue.value = [...stateValue.value, value];
        }
      } else {
        stateValue.value = stateValue.value.filter(it => it !== value);
      }
    };
    const instance = getCurrentInstance();
    onMounted(() => {
      if (props.maxHeightPercentage) {
        const windowHeight = document.body.clientHeight;
        const maxHeight = props.maxHeightPercentage;
        if (instance.vnode.el.clientHeight > windowHeight * maxHeight) {
          (instance.vnode.el as HTMLElement).style.height = windowHeight * maxHeight + 'px';
        }
      }
    });
    return {renderOptions};
  },
  render() {
    return <List required={this.required}
                 title={this.title}>
      {this.renderOptions()}
    </List>;
  }
});