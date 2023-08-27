import {computed, defineComponent, inject, PropType, ref, Ref, VNode, watch} from 'vue';
import List from '../../list';
import {optionsBasedComponentProps, useOptionsBaseComponent} from '../../mixins/options-based-component';
import Popup from '../../popup';
import SearchBar from '../../search-bar/src/index';
import CheckboxList from './checkbox-list';
import omit from "omit.js";
import classNames from "classnames";

export default defineComponent({
  name: 'MCheckboxPopupList',
  props: {
    ...optionsBasedComponentProps,
    title: {
      type: [String, Object] as PropType<string>
    },
    placeholder: {
      type: String as PropType<string>,
      default: '请选择'
    },
    clearable: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    separator: {
      type: String as PropType<string>,
      default: '、'
    },
    open: {
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
    const popupOpen: Ref<boolean> = ref(props.open);
    watch(() => props.open, (open: boolean) => {
      popupOpen.value = open;
    });
    watch(() => popupOpen.value, (open: boolean) => {
      emit('update:open', open);
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
        popupOpen.value = true;
      }
    };
    const onClear = () => {
      emit('clear');
      emit('update:value', []);
      closePopup();
    };
    const closePopup = () => {
      popupOpen.value = false;
    };
    return {
      onChange, stateValue, getOptions,
      onClick, isDisabled, isReadonly, closePopup,
      onClear, popupOpen, optionText
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
      control: () => {
        return <span class={{
          [`am-list-item-placeholder`]: !stateValue || stateValue.length === 0
        }}>{stateValue && stateValue.length ? this.optionText : placeholder}</span>;
      },
      default: () => {
        return <span>{this.title}</span>;
      }
    };
    return [<List.Item onClick={this.onClick}
                       error={this.error}
                       errorMessage={this.errorMessage}
                       arrow={'horizontal'}
                       errorDisplayType={this.errorDisplayType}
                       style={this.$attrs.style}
                       class={classNames(this.$attrs.class as string | Record<string, string>, 'am-checkbox-popup-list')}
                       touchFeedback={!this.isReadonly && !this.isDisabled}
                       required={this.required}
                       text={!!this.optionText}
                       v-slots={slots}
                       disabled={this.isDisabled}>
    </List.Item>,
      <Popup open={this.isDisabled ? false : this.popupOpen}
             showCancel={this.clearable}
             cancelButton={cancelButton}
             title={this.title}
             onOk={this.closePopup}
             onCancel={this.closePopup}>
        <CheckboxList
          {...omit(listProps, ['errorMessage', 'error', 'errorDisplayType'])}
          maxHeightPercentage={0.7}
          onChange={this.onChange}
        />
      </Popup>];
  }
});
