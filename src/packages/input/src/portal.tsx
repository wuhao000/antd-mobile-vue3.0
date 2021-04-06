import {defineComponent, getCurrentInstance, onMounted, PropType, Ref, ref} from 'vue';

export default defineComponent({
  name: 'Portal',
  props: {
    getContainer: {
      type: Function as PropType<() => any>,
      required: true}
  },
  setup(props, {emit, slots}) {
    const container: Ref<Element> = ref(null);
    container.value = props.getContainer();
    const instance = getCurrentInstance();
    onMounted(() => {
      container.value.appendChild(instance.vnode.el as HTMLElement);
    });
    return {
      container
    };
  },
  render() {
    return this.$slots.default?.();
  }
});
