import {defineComponent, getCurrentInstance, PropType} from 'vue';
import {camelAttrs} from './util';

export default defineComponent({
  name: 'VTooltip',
  props: {
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    showCrosshairs: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    showItemMarker: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    showXValue: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    showValueInLegend: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    options: {
      type: Object as PropType<object>,
      default() {
        return {};
      }
    }
  },
  setup(props: any, {emit, slots, attrs}) {
    const options: any = {
      disabled: props.disabled,
      showCrosshairs: props.showCrosshairs,
      showItemMarker: props.showItemMarker,
      showValueInLegend: props.showValueInLegend,
      ...camelAttrs(props.options),
      ...camelAttrs(attrs)
    };
    if (props.showXValue) {
      options.onShow = (ev) => {
        const {items} = ev;
        items[0].name = items[0].title;
      };
    }
    const instance = getCurrentInstance();
    (instance.parent as any).ctx.setTooltip(options);
    return {};
  },
  render() {
  }
});
