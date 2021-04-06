import {defineComponent, getCurrentInstance, PropType, Ref, ref} from 'vue';
import {camelAttrs} from './util';

const defaultShapeMap = {
  line: 'line',
  point: 'circle',
  area: 'area'
};

export default defineComponent({
  name: 'VChartMixin',
  props: {
    colors: {
      type: [String, Array] as PropType<any>
    },
    seriesField: {
      type: String as PropType<string>
    },
    adjust: {
      type: [String, Object] as PropType<any>
    }
  },
  setup(props, {emit, attrs, slots}) {
    const chartName: Ref<string> = ref(null);

    const instance = getCurrentInstance();
    (instance.parent as any).set(chartName.value, {
      shape: defaultShapeMap[chartName.value] || '',
      ...props,
      ...camelAttrs(attrs)
    });
    return {
      chartName
    };
  },
  render() {
    return null;
  }
});
