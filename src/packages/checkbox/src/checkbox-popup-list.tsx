import {computed, defineComponent, inject, PropType, ref, Ref, VNode, watch} from 'vue';
import List from '../../list';
import {optionsBasedComponentProps, useOptionsBaseComponent} from '../../mixins/options-based-component';
import Popup from '../../popup';
import SearchBar from '../../search-bar/src/index';
import CheckboxList from './checkbox-list';

export default defineComponent({
  name: 'MCheckboxPopupList',
  props: {
    ...optionsBasedComponentProps,
    title: {
      type: [String, Object] as PropType<string>
    },
    placeholder: {
      type: String as PropType<string>
    },
    clearable: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    separator: {
      type: String as PropType<string>,
      default: '、'
    },
    visible: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    searchable: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  setup(props, {emit, slots, attrs}) {
    const form = inject('list', undefined);
    const {getOptions, searchKeyword, isReadonly, stateValue, isDisabled} = useOptionsBaseComponent(props, {
      emit,
      slots,
      attrs
    }, form);
    const popupVisible: Ref<boolean> = ref(props.visible);
    watch(() => props.visible, (visible: boolean) => {
      popupVisible.value = visible;
    });
    watch(() => popupVisible.value, (popupVisible: boolean) => {
      emit('update:visible', popupVisible);
    });
    const optionText = computed(() => {
      const options = getOptions();
      // @ts-ignore
      const value = stateValue.value;
      const array = [];
      if (value) {
        value.forEach((v, index) => {
          const option = options.find(it => it.value === v);
          if (option) {
            array.push(option.label);
          } else {
            array.push(v);
          }
          if (index < value.length - 1) {
            array.push(props.separator);
          }
        });
      }
      return array;
    });
    const onChange = (value: any[]) => {
      stateValue.value = value;
      emit('update:value', stateValue.value);
      emit('change', stateValue.value);
    };
    const onClick = () => {
      if (!isDisabled.value && !isReadonly.value) {
        popupVisible.value = true;
      }
    };
    const onClear = () => {
      emit('clear');
      emit('update:value', []);
      closePopup();
    };
    const closePopup = () => {
      popupVisible.value = false;
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


    return {
      onChange, stateValue, getOptions,
      onClick, isDisabled, isReadonly, closePopup,
      onClear, renderSearch, popupVisible, optionText
    };
  },
  render() {
    const listProps: any = {
      ...this.$attrs,
      ...this.$props,
      options: this.getOptions()
    };
    const {stateValue, placeholder} = this;
    listProps.title = undefined;
    const cancelButton = <div onClick={this.onClear}
                              class={`am-popup-item am-popup-header-left`}>清除</div> as VNode;
    const slots = {
      extra: () => {
        return <span>{stateValue && stateValue.length ? this.optionText : placeholder}</span>;
      },
      default: () => {
        return <span>{this.title}</span>;
      }
    };
    return [<List.Item onClick={this.onClick}
                       style={this.$attrs.style}
                       class={this.$attrs.class}
                       touchFeedback={!this.isReadonly && !this.isDisabled}
                       required={this.required}
                       text={!!this.optionText}
                       v-slots={slots}
                       disabled={this.isDisabled}>
    </List.Item>,
      <Popup visible={this.isDisabled ? false : this.popupVisible}
             showCancel={this.clearable}
             cancelButton={cancelButton}
             title={this.title}
             onOk={this.closePopup}
             onCancel={this.closePopup}>
        {this.renderSearch()}
        <CheckboxList
          {...listProps}
          maxHeightPercentage={0.7}
          onChange={this.onChange}
        />
      </Popup>];
  }
});
