import RcCollapse from 'ant-design-vue/lib/vc-collapse';
import {defineComponent, Ref, ref} from 'vue';

export default defineComponent({
  Panel: RcCollapse.Panel,
  install: null,
  name: 'Accordion',
  props: {
    prefixCls: {default: 'am-accordion'},
    openAnimation: {},
    accordion: {type: Boolean, default: false},
    activeKey: {type: [String, Array]}
  },
  render() {
    return this.$slots.default ? <RcCollapse
        {...this.$props}
        onChange={(...args) => {
          this.$emit('change', ...args);
        }}
    >{this.$slots.default()}</RcCollapse> : null;
  }
});
