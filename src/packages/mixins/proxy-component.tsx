import {computed, defineComponent} from 'vue';

export default defineComponent({
  name: 'ProxyComponent',
  setup($props, {emit, slots, attrs}) {
    const cssClass = computed(() => {
      return {};
    });
    const cssStyle = computed(() => {
      return {};
    });
    const props = computed(() => {
      return {
        ...getSlotProps(),
        ...attrs,
        ...$props,
        ...getProps()
      };
    });
    const slotNames = computed(() => Object.keys(slots));
    const getInputComponent = () => {
      return {};
    };
    const getProps = () => {
      return {};
    };
    const getSlotProps = () => {
      const props: any = {};
      Object.keys(slots).forEach((slotKey: string) => {
        if (slotKey !== 'default') {
          props[slotKey] = slots[slotKey];
        }
      });
      return props;
    };
    return {
      cssClass,
      cssStyle,
      props,
      slotNames,
      getInputComponent,
      getProps,
      getSlotProps
    };
  },
  render() {
    const ProxyComponent: any = this.getInputComponent();
    const props = {...this.props, class: this.cssClass, style: this.cssStyle};
    return <ProxyComponent
        {...props}
        slots={this.$slots}>
      {this.$slots.default?.()}
    </ProxyComponent>;
  }
});
