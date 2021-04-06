import {defineComponent, ref} from 'vue';

export default defineComponent({
  name: 'VArea',
  setup(props, {emit, slots}) {
    const chartName = ref('area');
    return {
      chartName
    };
  }
});
