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
  setup(props, {slots}) {
    const instance = getCurrentInstance();
    if (!instance.vnode.key) {
      console.error('Tab key cannot be empty');
    }
    return {};
  },
  render() {
    return <div {...filterHTMLAttrs(this.$attrs)}>
      {this.$slots.default?.()}
    </div>;
  }
});
