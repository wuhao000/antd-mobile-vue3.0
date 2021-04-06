import {defineComponent, getCurrentInstance, onMounted, Ref, ref} from 'vue';

export default defineComponent({
  name: 'Portal',
  props: {
    getContainer: {
      type: Function, default: () => {
        const container = document.createElement('div');
        document.body.appendChild(container);
        return container;
      }
    }
  },
  setup(props, {emit, slots}) {
    const container: Ref<Element> = ref(null);
    if (!container.value) {
      container.value = props.getContainer();
    }
    const instance = getCurrentInstance();
    onMounted(() => {
      container.value.appendChild(instance.vnode.el as HTMLElement);
    });
    return {
      container
    };
  },
  render() {
    if (this.$slots.default && this.$slots.default.length) {
      return this.$slots.default[0];
    } else {
      return <div/>;
    }
  }
});
