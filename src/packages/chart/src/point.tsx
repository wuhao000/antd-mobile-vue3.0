import {defineComponent, getCurrentInstance, PropType} from 'vue';

export default defineComponent({
  name: 'VPoint',
  props: {
    styles: {
      type: Object as PropType<any>
    },
    colors: {
      type: Array as PropType<any[]>
    },
    seriesField: {
      type: String as PropType<string>
    }
  },
  setup(props, {emit, attrs, slots}) {
    const instance = getCurrentInstance();
    (instance.parent as any).ctx.setPoint({
      ...props,
      ...attrs
    });
    return {};
  },
  render() {
  }
});
