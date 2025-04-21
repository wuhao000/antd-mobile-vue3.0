import {computed, defineComponent, inject, PropType, ref, VNode, watch} from "vue";
import List from '../../list';
import CascaderView, {CascaderOption, CascaderValue, CascaderValueExtend} from "../../cascader-view";
import Popup from "../../popup";
import {optionsBasedComponentProps, useOptionsBaseComponent} from "../../mixins/options-based-component";
import classNames from "classnames";
import {getOptionProperty} from "../../utils/option";

export default defineComponent({
  name: 'MCascader',
  props: {
    ...optionsBasedComponentProps,
    title: [String, Object] as PropType<string | VNode>,
    disabled: Boolean,
    options: Array as PropType<CascaderOption[]>,
    value: Array as PropType<CascaderValue[]>,
    animated: Boolean,
    loadData: Function,
    clearable: Boolean,
    defaultValue: {
      type: Array as PropType<CascaderValue[]>,
      default: () => []
    },
    onChange: Function as PropType<(value: CascaderValue[], extend: CascaderValueExtend) => void>,
    placeholder: {
      type: String,
      default: '请选择'
    },
    multiple: Boolean
  },
  setup(props, {emit, slots, attrs}) {
    const form = inject('list', undefined);
    const {getOptions, searchKeyword, isReadonly, isDisabled} = useOptionsBaseComponent(props, {
      emit,
      slots,
      attrs
    }, form);
    const stateValue = ref();

    watch(() => props.value, () => {
      if (props.value) {
        stateValue.value = [...props.value];
      } else {
        stateValue.value = [];
      }
    }, {immediate: true})

    const optionText = computed(() => {
      if (props.value) {
        let options = props.options;
        const selected = [];
        props.value.forEach(v => {
          const option = options.find(it => getOptionProperty(it, props.valueProperty) === v);
          selected.push(option);
          options = option?.children || [];
        });

        return selected.map(it => getOptionProperty(it, props.labelProperty)).join(' / ');
      } else {
        return undefined;
      }
    });
    const popupOpen = ref(false);
    const onClick = () => {

      if (!isDisabled.value && !isReadonly.value) {
        popupOpen.value = true;
      }
    }
    const confirm = () => {
      popupOpen.value = false;
      emit('update:value', stateValue.value);
    }

    const close = () => {
      popupOpen.value = false;
    }
    const onClear = () => {
      stateValue.value = [];
      confirm();
    }
    return {
      optionText,
      popupOpen,
      confirm,
      stateValue,
      close,
      isDisabled,
      isReadonly,
      onClick,
      onClear
    }
  },
  render() {
    const cancelButton = <div onClick={this.onClear}
                              class={`am-popup-item am-popup-header-left`}>清除</div> as VNode;
    return [<List.Item
      disabled={this.disabled}
      onClick={this.onClick}
      error={this.error}
      errorMessage={this.errorMessage}
      arrow={'horizontal'}
      errorDisplayType={this.errorDisplayType}
      style={this.$attrs.style}
      class={classNames(this.$attrs.class as string | Record<string, string>, {
        'am-checkbox-popup-list': true,
        'am-checkbox-popup-list-focus': this.isDisabled ? false : this.popupOpen
      })}
      touchFeedback={!this.isReadonly && !this.isDisabled}
      required={this.required}
      text={!!this.optionText}
      v-slots={{
        default: () => this.title,
        control: () => <div>{this.optionText}</div>
      }}
    />, <Popup open={this.disabled ? false : this.popupOpen}
               showCancel={this.clearable}
               cancelButton={cancelButton}
               title={this.title}
               onOk={this.confirm}
               onCancel={this.close}>
      <CascaderView
        options={this.options}
        animated={this.animated}
        defaultValue={this.defaultValue}
        loadData={this.loadData}
        v-model={[this.stateValue, 'value']}
        placeholder={this.placeholder}
        multiple={this.multiple}
        disabled={this.disabled}
      />
    </Popup>]
  }
})
