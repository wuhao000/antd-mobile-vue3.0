import {defineComponent} from 'vue';
import './demo-wrapper.less';

export default defineComponent({
  props: {
    title: {
      type: [String, Object]
    },
    background: {type: String, default: 'transparent'},
    padding: String
  },
  render() {
    return <div class="demo-preview-item" style={{
      padding: this.padding ?? '12px 0'
    }}>
      <div class="demo-title">
        {this.title}
      </div>
      <div class="demo-container" style={{
        padding: '12px',
        background: this.background ?? 'white'
      }}>
        {this.$slots.default?.()}
      </div>
    </div>;
  }
});
