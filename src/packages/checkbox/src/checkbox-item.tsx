import classnames from 'classnames';
import {defineComponent, PropType} from 'vue';
import List from '../../list';
import Checkbox from './checkbox';
import {usePureInput} from "../../mixins/pure-input-component";

export default defineComponent({
  name: 'MCheckboxItem',
  props: {
    thumbStyle: {
      type: Object as PropType<object>,
      default: () => ({})
    },
    listPrefixCls: {
      type: String,
      default: 'am-list-item'
    },
    prefixCls: {
      type: String,
      default: 'am-checkbox'
    },
    name: {
      type: String
    },
    wrapLabel: {
      type: Boolean,
      default: false
    },
    checkboxProps: {
      type: Object as PropType<object>,
      default: () => {
        return {};
      }
    },
    extra: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readOnly: {
      type: Boolean
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  emits: ['change', 'update:value'],
  setup(props, {emit, attrs, slots}) {
    const {stateValue, setStateValue} = usePureInput(props, {emit, attrs, slots})
    const onChange = () => {
      // do nothing
    };
    const onClick = () => {
      if (!props.disabled && !props.readOnly) {
        setStateValue(!stateValue.value);
      }
    };
    return {stateValue, onChange, onClick};
  },
  render() {
    const {
      listPrefixCls,
      disabled,
      readOnly,
      checkboxProps,
      ...restProps
    } = this.$props;
    const {prefixCls} = restProps;
    const wrapCls = classnames(`${prefixCls}-item`, {
      [`${prefixCls}-item-disabled`]: disabled === true,
      [`${prefixCls}-item-readonly`]: readOnly === true
    });

    const extraProps: any = {};
    ['name', 'defaultChecked', 'checked', 'onChange', 'disabled'].forEach(i => {
      if (i in this.$props) {
        extraProps[i] = this.$props[i];
      }
    });
    const thumb = <Checkbox
      {...{
        ...checkboxProps,
        ...extraProps,
        value: this.stateValue
      }}
      style={this.thumbStyle}
      onChange={this.onChange}/>;
    return (
      <List.Item
        {...restProps}
        touchFeedback={!this.disabled}
        onClick={this.onClick}
        prefixCls={listPrefixCls}
        class={wrapCls}
        thumb={thumb}>
        {this.$slots.default()}
      </List.Item>
    );
  }
});
