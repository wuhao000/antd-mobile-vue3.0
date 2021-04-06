import {defineComponent, getCurrentInstance, PropType} from 'vue';
import {camelAttrs} from './util';

export default defineComponent({
  name: 'VAxis',
  props: {
    x: {
      type: Boolean as PropType<boolean>
    },
    y: {
      type: Boolean as PropType<boolean>
    },
    field: {
      type: String as PropType<string>
    },
    disabled: {
      type: Boolean as PropType<boolean>
    },
    autoAlign: {
      type: Boolean as PropType<boolean>
    },
    options: {
      type: Object as PropType<object>,
      default() {
        return {};
      }
    }
  },
  setup(props: any, {emit, slots, attrs}) {
    const instance = getCurrentInstance();
    const _options = {
      ...props,
      ...props.options,
      ...camelAttrs(attrs)
    };
    console.log(instance.parent);
    (instance.parent as any).ctx.setAxis(_options);
    return {};
  }
});
