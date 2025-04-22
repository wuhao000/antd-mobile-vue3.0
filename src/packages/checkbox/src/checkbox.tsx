import RcCheckbox from 'ant-design-vue/es/vc-checkbox/Checkbox';
import classnames from 'classnames';
import { defineComponent, PropType } from 'vue';
import { usePureInput } from '../../mixins/pure-input-component';

export default defineComponent({
  name: 'MCheckbox',
  props: {
    prefixCls: {
      type: String,
      default: 'am-checkbox'
    },
    name: {
      type: String
    },
    wrapLabel: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:value', 'click', 'change'],
  setup(props, { emit, attrs, slots }) {
    const { stateValue, setStateValue } = usePureInput(props, { emit, attrs, slots });
    const onClick = e => {
      e.stopPropagation();
      emit('click', e);
      setStateValue(!stateValue.value);
    };
    return { onClick };
  },
  render() {
    const { prefixCls } = this.$props;
    const wrapCls = classnames(`${prefixCls}-wrapper`);
    const mark = (
      <label class={wrapCls}>
        <RcCheckbox
          onClick={this.onClick}
          checked={this.value}
          {...this.$props} />
        {this.$slots.default?.()}
      </label>
    );
    if (this.wrapLabel) {
      return mark;
    }
    return <RcCheckbox
      onClick={this.onClick}
      checked={this.value}
      {...this.$props}>{this.$slots.default()}</RcCheckbox>;
  }
});
