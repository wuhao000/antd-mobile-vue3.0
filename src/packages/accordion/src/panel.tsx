import {defineComponent, PropType, VNode} from 'vue';

export default defineComponent({
  name: 'CollapsePanel',
  props: {
    key: String,
    title: [String, Object] as PropType<string | VNode>,
    disabled: Boolean,
    forceRender: Boolean,
    destroyOnClose: Boolean,
    onClick: Function,
    arrow: [Object, Function] as PropType<VNode | ((active: boolean) => VNode)>
  }
});
