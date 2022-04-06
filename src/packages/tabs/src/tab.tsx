import {defineComponent, getCurrentInstance, inject} from 'vue';
import {filterHTMLAttrs} from '../../utils/dom';
import {TabsStore} from './utils';

export default defineComponent({
  name: 'MTab',
  inheritAttrs: false,
  props: {
    title: [String, Object],
    key: String,
    forceRender: Boolean
  },
  setup(props) {
    const instance = getCurrentInstance();
    if (!instance.vnode.key) {
      console.error('Tab key cannot be empty');
    }
    const {registerTab} = inject(TabsStore);
    registerTab({
      key: instance.vnode.key,
      title: props.title,
      forceRender: props.forceRender
    });
    return {};
  },
  render() {
    return <div {...filterHTMLAttrs(this.$attrs)}>
      {this.$slots.default?.()}
    </div>;
  }
});
