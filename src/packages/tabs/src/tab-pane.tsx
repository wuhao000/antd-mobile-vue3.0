import {defineComponent, onBeforeUpdate, PropType, ref, Ref, VNode, watchEffect} from 'vue';
import {filterHTMLAttrs} from '../../utils/dom';
import {getPxStyle, getTransformPropValue, TabsStore} from './utils';

export default defineComponent({
  inheritAttrs: false,
  name: 'TabPane',
  props: {
    role: {
      type: String
    },
    title: {
      type: [String, Object] as PropType<string | VNode>
    },
    active: {
      type: Boolean
    },
    fixX: {
      type: Boolean,
      default: true
    },
    fixY: {
      type: Boolean,
      default: true
    },
    forceRender: Boolean
  },
  setup(props) {
    const layout: Ref<HTMLDivElement> = ref(null);
    const offsetX = ref(0);
    const offsetY = ref(0);
    const setLayout = (div: any) => {
      layout.value = div;
    };
    onBeforeUpdate(() => {
      if (props.active) {
        offsetX.value = 0;
        offsetY.value = 0;
      } else {
        offsetX.value = layout.value.scrollLeft;
        offsetY.value = layout.value.scrollTop;
      }
    });
    return {
      setLayout,
      offsetX, offsetY
    };
  },
  render() {
    const {fixX, fixY} = this.$props;
    const style = {
      ...(fixX && this.offsetX ? getTransformPropValue(getPxStyle(-this.offsetX, 'px', false)) : {}),
      ...(fixY && this.offsetY ? getTransformPropValue(getPxStyle(-this.offsetY, 'px', true)) : {})
    };
    return <div
      {...filterHTMLAttrs(this.$attrs)}
      style={style}
      ref={this.setLayout}>
      {this.active || this.forceRender ? this.$slots.default() : undefined}
    </div>;
  }
});
