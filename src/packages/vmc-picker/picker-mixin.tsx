import {PickerData} from '../picker/src/props-type';
import {defineComponent, PropType} from 'vue';

const PickerItem = defineComponent({
  name: 'PickerItem',
  props: {
    value: {},
    label: {}
  }
});

export default function PickerMixin(ComposedComponent) {
  return defineComponent({
    name: 'PickerMixin',
    props: {
      data: {type: Array as PropType<Array<{ label: any, value: any, [key: string]: any }>>, required: true},
      value: {},
      disabled: {
        type: Boolean,
        default: false
      },
      itemStyle: {},
      prefixCls: {},
      indicatorStyle: {},
      indicatorClassName: {},
      defaultValue: {},
      noAnimate: {}
    },
    setup(props, {slots}) {
      const select = (value, itemHeight, scrollTo) => {
        for (let i = 0, len = props.data.length; i < len; i++) {
          if (props.data[i].value === value) {
            selectByIndex(i, itemHeight, scrollTo);
            return;
          }
        }
        selectByIndex(0, itemHeight, scrollTo);
      };
      const selectByIndex = (index, itemHeight, zscrollTo) => {
        if (index < 0 || index >= props.data.length || !itemHeight) {
          return;
        }
        zscrollTo(index * itemHeight);
      };
      const computeChildIndex = (top, itemHeight, childrenLength) => {
        const index = Math.round(top / itemHeight);
        return Math.min(index, childrenLength - 1);
      };
      const doScrollingComplete = (top, itemHeight, fireValueChange) => {
        const index = computeChildIndex(top, itemHeight, props.data.length);
        const child: PickerData = props.data[index];
        if (child) {
          fireValueChange(child.value);
        } else if (console.warn) {
          console.warn('child not found', props.data, index);
        }
      };

      return {
        doScrollingComplete, computeChildIndex, select
      };
    },
    render() {
      return (
          <ComposedComponent {
                               ...{
                                 ...this.$props,
                                 ...this.$attrs,
                                 doScrollingComplete: this.doScrollingComplete,
                                 computeChildIndex: this.computeChildIndex,
                                 select: this.select
                               }
                             }>{this.$slots.default?.()}</ComposedComponent>
      );
    }
  });
}
