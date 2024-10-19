import RcCheckbox from 'ant-design-vue/es/vc-checkbox/Checkbox';
import classnames from 'classnames';
import {defineComponent, PropType, ref} from 'vue';


export default defineComponent({
  name: 'MRadio',
  props: {
    onChange: {},
    prefixCls: {
      type: String as PropType<string>,
      default: 'am-radio'
    },
    listPrefixCls: {
      type: String as PropType<string>
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    name: {
      type: String as PropType<string>
    },
    wrapLabel: {
      default: true
    },
    value: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  setup(props, {emit}) {
    const checked = ref(props.value || false);
    const onClick = () => {
      checked.value = !checked.value;
      emit('click', checked.value);
    };
    return {
      onClick
    };
  },
  render() {
    const {...restProps} = this.$props;
    const {prefixCls} = restProps;
    const wrapCls = classnames(`${prefixCls}-wrapper`);
    if ('class' in restProps) {
      // Todo https://github.com/developit/preact-compat/issues/422
      /* tslint:disable:no-string-literal */
      delete (restProps as any)['class'];
    }
    const mark = (
        <label class={wrapCls}
               onClick={this.onClick}>
          <RcCheckbox {...this.$props}
                      checked={this.value}
                      type="radio"/>
          {this.$slots.default?.()}
        </label>
    );
    if (this.wrapLabel) {
      return mark;
    }
    return <RcCheckbox
        {...this.$props as any}
        type="radio"
        checked={this.value}>{this.$slots.default?.()}</RcCheckbox>;
  }
});
