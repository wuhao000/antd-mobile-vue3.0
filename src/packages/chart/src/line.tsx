import {defineComponent, ref} from 'vue';

export default defineComponent({
  name: 'VLine',
  setup(props, {emit, slots}) {
    const chartName = ref('line');
    return {
      chartName
    };
  }
});
