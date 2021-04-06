import {defineComponent, getCurrentInstance, PropType} from 'vue';
import {camelAttrs} from './util';

const types = ['line', 'text', 'tag', 'rect', 'html', 'arc'];

export default defineComponent({
  name: 'VGuide',
  props: {
    type: {
      type: String as PropType<string>,
      validator(val) {
        return types.filter(type => type === val).length === 1;
      }
    },
    options: {
      type: Object as PropType<any>,
      default() {
        return {};
      }
    },
    top: {
      type: Boolean as PropType<boolean>
    },
    withPoint: {
      type: Boolean as PropType<boolean>,
      default: true
    }
  },
  setup(props: any, {attrs}) {
    const instance = getCurrentInstance();
    (instance.parent as any).ctx.addGuide({
      type: props.type,
      options: {
        top: props.top,
        withPoint: props.withPoint,
        ...camelAttrs(props.options),
        ...camelAttrs(attrs)
      }
    });
    return {};
  },
  render() {
  }
});
