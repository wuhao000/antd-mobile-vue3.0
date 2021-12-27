import {defineComponent, getCurrentInstance, inject, onMounted, PropType, ref, watch} from 'vue';
import List from '../../list';
import {optionsBasedComponentProps, useOptionsBaseComponent} from '../../mixins/options-based-component';
import SearchBar from '../../search-bar/src';
import RadioItem from './radio-item';
import {filterHTMLAttrs} from "../../utils/dom";

export default defineComponent({
  name: 'MRadioList',
  inheritAttrs: false,
  props: {
    ...optionsBasedComponentProps,
    value: {},
    title: {
      type: String as PropType<string>
    },
    maxHeightPercentage: {
      type: Number as PropType<number>
    }
  },
  setup(props, {emit, slots, attrs}) {
    const instance = getCurrentInstance();
    const form = inject('list', undefined);
    const {getOptions, stateValue, setStateValue, searchKeyword, isDisabled} = useOptionsBaseComponent(props, {emit, slots, attrs}, form);
    const renderOptions = () => {
      const options = getOptions();
      if (options) {
        return options.map((option, index) => {
          const optionProps = {};
          if (index === 0) {
            Object.assign(optionProps, {
              error: props.error,
              errorDisplayType: props.errorDisplayType,
              errorMessage: props.errorMessage
            });
          }
          return <RadioItem
            {...optionProps}
            disabled={option.disabled || isDisabled.value}
            value={stateValue.value === option.value}
            key={option.value}
            onChange={(checkState) => {
              onChange(checkState, option.value);
            }}>{option.label}</RadioItem>;
        });
      } else {
        return [];
      }
    };
    const onChange = (checkState: any, value: any) => {
      setStateValue(value);
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
    onMounted(() => {
      if (props.maxHeightPercentage) {
        const windowHeight = document.body.clientHeight;
        const maxHeight = props.maxHeightPercentage;
        if (instance.vnode.el.clientHeight > windowHeight * maxHeight) {
          (instance.vnode.el as HTMLElement).style.height = windowHeight * maxHeight + 'px';
        }
      }
    });
    return {
      renderOptions, renderSearch
    };
  },
  render() {
    return <List
      {...filterHTMLAttrs(this.$attrs)}
      required={this.required}
      title={this.title}
    >
      {this.renderSearch()}
      {this.renderOptions()}
    </List>;
  }
});
