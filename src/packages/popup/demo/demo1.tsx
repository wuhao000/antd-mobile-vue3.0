import {defineComponent, ref} from 'vue';
import Popup from '../index';

export default defineComponent({
  setup() {
    const show = ref(true);
    return {
      show,
      onClick() {
        show.value = !show.value;
      }
    };
  },
  render() {
    return <div>
      <m-button
          onClick={this.onClick}>显示
      </m-button>
      <Popup
          confirmLoading={true}
          loadingText={'保存中'}
          title={'这是标题'}
          height={'80%'}
          showCancel={true}
          v-model={[this.show, 'visible']}>
        <div>22222222</div>
      </Popup>
    </div>;
  }
});
