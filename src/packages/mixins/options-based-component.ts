import {computed, onBeforeUpdate, Prop, PropType, Ref, ref, watch} from 'vue';
import {getOptionProperty} from '../utils/option';
import {getNodeText, isEmptySlot} from '../utils/vnode';
import {unwrapFragment} from '../utils/vue';
import {useBaseInputComponent} from './base-input-component';
import {simpleFormComponentProps} from './simple-form-component';


const getFlattenOptions = (options) => {
  return options.reduce((acc, option) => {
    const children = option.children || [];
    acc.push(option);
    if (children.length) {
      acc.push(...getFlattenOptions(children));
    }
    return acc;
  }, [])
}

export const optionsBasedComponentProps = {
  ...simpleFormComponentProps,
  /**
   * 是否可搜索
   */
  searchable: {
    type: Boolean,
    default: false
  },
  filterOption: Function,
  /**
   * 选项对象中作为标签的属性名称
   */
  labelProperty: {type: [String, Function] as PropType<string | ((option: any) => any)>, default: 'label'},
  /**
   * 选项对象中作为值的属性名称
   */
  valueProperty: {type: [String, Function] as PropType<string | ((option: any) => any)>, default: 'value'} as Prop<string | ((option) => any)>,
  /**
   * 选项数据
   */
  options: {type: Array}
};
export const useOptionsBaseComponent = (props, {emit, attrs, slots}, form, options: {
  defaultValue: any,
  propName: string
} = {
  defaultValue: undefined,
  propName: 'value'
}) => {
  const {isDisabled, setStateValue, stateValue, isReadonly} =
    useBaseInputComponent(props, {emit, attrs, slots}, form, options);
  const searchKeyword: Ref<string> = ref('');

  watch(() => props.searchText, searchText => {
    searchKeyword.value = searchText;
  });

  watch(() => searchKeyword.value, keyword => {
    emit('search', keyword);
  });

  const flattenOptions = computed(() => getFlattenOptions(props.options ?? []))

  const valueOptionMap = computed(() => {
    return Object.fromEntries(
      flattenOptions.value.map(item => [getOptionProperty(item, props.valueProperty), item])
    )
  });

  const valueParentIdMap = computed(() => {
    const res = {};
    flattenOptions.value.filter(it => it.children?.length).forEach(parent => {
      parent.children.forEach(child => {
        res[getOptionProperty(child, props.valueProperty)] = getOptionProperty(parent, props.valueProperty)
      });
    });
    return res;
  });

  const optionFilter = item => {
    if (props.filterOption) {
      return props.filterOption(item);
    }
    let label = getOptionProperty(item, props.labelProperty);
    if (typeof label === 'object') {
      label = getNodeText(label) || '';
    }
    return !searchKeyword.value || label.includes(searchKeyword.value);
  };

  const filteredValues = computed(() => {
    const directMatchValues =  flattenOptions.value.filter(optionFilter).map(it => getOptionProperty(it, props.valueProperty));
    const parentValues = [];
    directMatchValues.forEach(value => {
      let currentValue = value;
      while (valueParentIdMap.value[currentValue]) {
        parentValues.push(valueParentIdMap.value[currentValue]);
        currentValue = valueParentIdMap.value[currentValue];
      }
    });
    return [...directMatchValues, ...parentValues];
  });

  const getOptions = () => {
    return getResolvedOptions(props.options);
  };

  const getResolvedOptions = (options: any[]) => {
    if (options) {
      return options
        .filter(optionFilter)
        .map(item => {
          return {
            ...item,
            label: getOptionProperty(item, props.labelProperty),
            value: getOptionProperty(item, props.valueProperty)
          };
        });
    } else {
      return [];
    }
  };
  const setProps = () => {
    if (!isEmptySlot(slots.default)) {
      unwrapFragment(slots.default()).forEach(node => {
        if (node.props.disabled === undefined) {
          node.props.disabled = isDisabled.value;
        }
        if (node.props.readonly === undefined) {
          node.props.readonly = isReadonly.value;
        }
      });
    }
  };
  onBeforeUpdate(() => {
    setProps();
  });
  setProps();
  return {
    getOptions,
    isReadonly,
    isDisabled,
    searchKeyword,
    valueParentIdMap,
    stateValue,
    setStateValue,
    flattenOptions,
    valueOptionMap,
    filteredValues
  };
};
