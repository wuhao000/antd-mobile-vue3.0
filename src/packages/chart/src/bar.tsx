import {defineComponent, PropType, ref} from 'vue';

export default defineComponent({
  name: 'VBar',
  props: {
    direction: {
      type: String as PropType<string>,
      default: 'vertical'
    }
  },
  setup() {
    const chartName = ref('bar');
    return {
      chartName
    };
  }
});
