import {defineComponent, ref} from 'vue';
import Popup from '../index';

export default defineComponent({
  setup() {
    const show = ref(false);
    const show2 = ref(false);
    return {
      show,
      show2,
      onClick() {
        show.value = !show.value;
      },
      onClick2() {
        show2.value = !show2.value;
      }
    };
  },
  render() {
    return <div>
      <div>
        <m-button
            onClick={this.onClick}>显示
        </m-button>
        <Popup
            loadingText={'保存中'}
            title={'这是标题'}
            height={'80%'}
            showCancel={true}
            v-model={[this.show, 'visible']}>
          <div>22222222</div>
        </Popup>
      </div>
      <div style={{
        position: 'relative'
      }}>
        <m-button
            onClick={this.onClick2}>显示
        </m-button>
        <Popup
            style={{
              marginTop: '47px',
              zIndex: -1
            }}
            showTitle={false}
            getContainer={false}
            height={'30%'}
            placement={'top'}
            v-model={[this.show2, 'visible']}>
          <div>22222222</div>
        </Popup>
      </div>
    </div>;
  }
});
