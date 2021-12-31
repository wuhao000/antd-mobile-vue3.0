import classnames from 'classnames';
import {CSSProperties, defineComponent, PropType, reactive, watch} from 'vue';
import getDataAttr from '../../utils/get-data-attr';
import {usePureInput} from "../../mixins/pure-input-component";

const colorRecord: Record<string, string> = {
  default: '#000000d9',
  primary: '#1677ff',
  success: '#00b578',
  warning: '#ff8f1f',
  danger: '#ff3141',
}


export default defineComponent({
  name: 'MTag',
  props: {
    prefixCls: {
      type: String as PropType<string>,
      default: 'am-tag'
    },
    color: {
      type: String as PropType<'default'
        | 'primary'
        | 'success'
        | 'warning'
        | 'danger'
        | string>,
      default: 'default'
    },
    fill: {
      type: String as PropType<'solid' | 'outline'>,
      default: 'solid'
    },
    round: Boolean,
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    selected: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    small: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  setup(props, {emit, attrs}) {
    const {} = usePureInput(props, {emit, attrs})

    const onClick = () => {
      const {disabled} = props;
      if (disabled) {
        return;
      }
      emit('select', !props.selected);
    };
    return {
      onClick
    };
  },
  render() {
    const {
      prefixCls,
      disabled,
      small
    } = this.$props;
    const wrapCls = classnames(prefixCls, {
      [`${prefixCls}-normal`]: !disabled && !this.selected,
      [`${prefixCls}-small`]: small,
      [`${prefixCls}-selected`]: this.selected && !disabled,
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-round`]: this.round,
    });
    const color = colorRecord[this.color] ?? this.color
    const borderColor = this.color === 'default' ? '#d9d9d9' : (color ?? '#ddd')
    const bgColor = this.fill === 'outline' || this.color === 'default' ? 'white' : (color ?? 'white')
    const style: CSSProperties & {
      '--border-color': string
      '--text-color': string
      '--background-color': string
    } = {
      '--border-color': borderColor,
      '--text-color': (this.fill === 'outline' || this.color === 'default') ? color : 'white',
      '--background-color': bgColor,
    }
    return (
      <div
        {...getDataAttr(this.$props)}
        style={style}
        class={wrapCls}
        onClick={this.onClick}>
        <div class={`${prefixCls}-text`}>{this.$slots.default?.()}</div>
      </div>
    );
  }
});
