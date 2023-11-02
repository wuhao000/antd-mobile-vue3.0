import {unwrapFragment} from '../../utils/vue';
import classNames from 'classnames'
import {defineComponent, PropType} from "vue";

const classPrefix = `am-space`

export const Space = defineComponent({
  name: 'MSpace',
  props: {
    direction: {
      type: String as PropType<'horizontal' | 'vertical'>,
      default: 'horizontal'
    },
    align: String as PropType<'start' | 'end' | 'center' | 'baseline'>,
    justify: String as PropType<'start'
      | 'end'
      | 'center'
      | 'between'
      | 'around'
      | 'evenly'
      | 'stretch'>,
    wrap: Boolean,
    block: Boolean,
    onClick: Function as PropType<(event: MouseEvent) => void>
  },
  render() {
    const {direction, onClick} = this;
    return <div
      class={classNames(classPrefix, {
        [`${classPrefix}-wrap`]: this.wrap,
        [`${classPrefix}-block`]: this.block,
        [`${classPrefix}-${direction}`]: true,
        [`${classPrefix}-align-${this.align}`]: !!this.align,
        [`${classPrefix}-justify-${this.justify}`]: !!this.justify,
      })}
      onClick={onClick}
    >
      {unwrapFragment(this.$slots.default?.())?.map(child => {
        return child ? <div class={`${classPrefix}-item`}>{child}</div> : undefined;
      })}
    </div>;
  }
})
