import {defineComponent, getCurrentInstance, PropType} from 'vue';
import {camelAttrs} from './util';

export default defineComponent({
  name: 'VLegend',
  props: {
    options: {
      type: Object as PropType<any>,
      default() {
        return {};
      }
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  setup(props: any, {emit, attrs, slots}) {
    const instance = getCurrentInstance();
    (instance.parent as any).ctx.setLegend({
      ...props.options,
      disabled: props.disabled,
      ...camelAttrs(attrs)
    });
    return {};
  },
  render() {
  }
});
