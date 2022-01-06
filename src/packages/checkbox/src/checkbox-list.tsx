import {defineComponent, getCurrentInstance, inject, onMounted, PropType} from 'vue';
import List from '../../list';
import {optionsBasedComponentProps, useOptionsBaseComponent} from '../../mixins/options-based-component';
import SearchBar from '../../search-bar/src';
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
    },
    onChange: Function
  },
  setup(props, {emit, slots, attrs}) {
    const form = inject('list', undefined);
    const {getOptions, setStateValue, stateValue, searchKeyword, isDisabled} = useOptionsBaseComponent(props, {
      emit,
      attrs,
      slots
    }, form, {
      defaultValue: [],
      propName: 'value'
    });
    const renderOptions = () => {
      const options = getOptions();
      return options.map((option, index) => {
        const optionProps = {};
        return <CheckboxItem
          {...optionProps}
          value={stateValue.value.includes(option.value)}
          key={option.value}
          disabled={option.disabled || isDisabled.value}
          onChange={(checkState) => {
            onChange(checkState, option.value);
          }}>{option.label}</CheckboxItem>;
      });
    };
    const onChange = (checkState: any, value: any) => {
      if (checkState) {
        if (!stateValue.value.includes(value)) {
          setStateValue([...stateValue.value, value]);
        }
      } else {
        setStateValue(stateValue.value.filter(it => it !== value));
      }
    };
    const renderSearch = () => {
      return props.searchable ? <SearchBar
        value={searchKeyword.value}
        {...{
          ['onUpdate:value']: (v) => {
            searchKeyword.value = v;
          }
        }}/> : null;
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
    return {renderOptions, renderSearch};
  },
  render() {
    return <List required={this.required}
                 errorMessage={this.errorMessage}
                 title={this.title}>
      {this.renderSearch()}
      {this.renderOptions()}
    </List>;
  }
});
