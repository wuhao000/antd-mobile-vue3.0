import RcCollapse from 'ant-design-vue/es/vc-collapse';
import {defineComponent} from 'vue';

export default defineComponent({
  install: null,
  name: 'MAccordion',
  props: {
    onChange: {},
    prefixCls: {default: 'am-accordion'},
    openAnimation: {},
    accordion: {type: Boolean, default: false},
    activeKey: {type: [String, Array]}
  },
  render() {
    return this.$slots.default ?
      <RcCollapse {...this.$props}>{this.$slots.default()}</RcCollapse> : null;
  }
});
