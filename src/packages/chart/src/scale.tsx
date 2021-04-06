import {defineComponent, getCurrentInstance, PropType} from 'vue';
import {camelAttrs} from './util';

export default defineComponent({
  name: 'VScale',
  props: {
    x: {
      type: Boolean as PropType<boolean>
    },
    y: {
      type: Boolean as PropType<boolean>
    },
    field: {
      type: String as PropType<string>
    }
  },
  setup(props, {attrs}) {
    const instance = getCurrentInstance();
    const emitSetting = () => {
      ['x', 'y'].forEach(item => {
        if (props[item]) {
          (instance.parent as any).ctx.setScale({
            [item]: {
              ...camelAttrs(attrs)
            }
          });
          if (props.field) {
            (instance.parent as any).ctx.setField(item, props.field);
          }
        }
      });
    };
    emitSetting();
    return {
      emitSetting
    };
  },
  render() {
  }
});
