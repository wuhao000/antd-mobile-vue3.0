import {onBeforeUpdate, PropType, Ref, ref, watch} from 'vue';
import {getOptionProperty} from '../utils/option';
import {getNodeText, isEmptySlot} from '../utils/vnode';
import {unwrapFragment} from '../utils/vue';
import {useBaseInputComponent} from './base-input-component';
import {simpleFormComponentProps} from './simple-form-component';

export const optionsBasedComponentProps = {
  ...simpleFormComponentProps,
  /**
   * 是否可搜索
   */
  searchable: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  filterOption: Function,
  /**
   * 选项对象中作为标签的属性名称
   */
  labelProperty: {type: [String, Function], default: 'label'},
  /**
   * 选项对象中作为值的属性名称
   */
  valueProperty: {type: [String, Function], default: 'value'},
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
  const getOptions = () => {
    return getResolvedOptions(props.options);
  };
  const getResolvedOptions = (options: any[]) => {
    if (options) {
      return options
          .filter(item => {
            if (props.filterOption) {
              return props.filterOption(item);
            }
            let label = getOptionProperty(item, props.labelProperty);
            if (typeof label === 'object') {
              label = getNodeText(label) || '';
            }
            return !searchKeyword.value || label.includes(searchKeyword.value);
          })
          .map(item => {
            return Object.assign({}, item, {
              label: getOptionProperty(item, props.labelProperty),
              value: getOptionProperty(item, props.valueProperty)
            });
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
    getOptions, isReadonly, isDisabled, searchKeyword, stateValue, setStateValue
  };
};
