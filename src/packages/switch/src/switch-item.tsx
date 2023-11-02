import classnames from 'classnames';
import {defineComponent, PropType, reactive, watch} from 'vue';
import List from '../../list';
import {creatFormComponentProps, useFormComponent} from '../../mixins/form-component';
import Switch from './switch';

const ListItem = List.Item as any;

const switchItem = defineComponent({
  name: 'MSwitchItem',
  props: {
    ...creatFormComponentProps(),
    prefixCls: {
      default: 'am-switch'
    },
    listPrefixCls: {
      default: 'am-list-item'
    },
    switchProps: {
      default: () => {
        return {};
      }
    },
    title: {
      type: [String, Object] as PropType<string>
    }
  },
  setup(props, {emit}) {
    const {isDisabled} = useFormComponent(props, {emit});
    const state = reactive({
      value: props.value
    });
    watch(() => props.value, (value) => {
      state.value = value;
    });
    watch(() => state.value, (value, oldValue) => {
      emit('update:value', value);
      if (value !== oldValue) {
        emit('change', value);
      }
    });

    const onClick = () => {
      if (!props.disabled) {
        emit('click');
      }
    };
    return {
      state, onClick, isDisabled
    };
  },
  render() {
    const {
      listPrefixCls,
      disabled,
      switchProps,
      ...otherProps
    } = this.$props;
    const {prefixCls} = otherProps;
    const wrapCls = classnames(`${prefixCls}-item`, {
      [`${prefixCls}-item-disabled`]: disabled === true
    });

    const extraProps = {
      ...this.$attrs,
      ...switchProps,
      disabled: this.isDisabled,
      value: this.state.value,
      'onUpdate:value': (value) => {
        this.state.value = value;
      },
      onClick: this.onClick
    };
    // @ts-ignore
    const extra = <Switch {...extraProps}/>;
    const listItemProps = {
      ...otherProps,
      disabled: this.isDisabled,
      prefixCls: listPrefixCls,
      class: wrapCls,
      control: extra
    };
    return (
      <ListItem {...listItemProps}>
        {this.$slots.default?.()}
      </ListItem>
    );
  }
});

export default switchItem;
