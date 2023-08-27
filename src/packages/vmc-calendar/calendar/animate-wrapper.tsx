import {defineComponent} from 'vue';

export default defineComponent({
  name: 'AnimateWrapper',
  props: {
    open: {type: Boolean},
    displayType: {type: String}
  },
  render() {
    const {displayType, open} = this.$props;
    return <div
      class="animate"
      style={{display: open ? displayType : 'none'}}>
      {open && this.$slots.default?.()}
    </div>;
  }
});
