import {ActionSheetMenu} from '../src';
import {defineComponent, ref} from 'vue';
import ActionSheet from '../index';

const BUTTONS = ['Operation1', 'Operation2', 'Operation2', 'Delete', 'Cancel'];

export default defineComponent({
  name: 'Demo1',
  setup(props, {emit, slots}) {
    const dataList = ref([
      {url: 'OpHiXAcYzmPQHcdlLFrc', title: '发送给朋友'},
      {url: 'wvEzCMiDZjthhAOcwTOu', title: '新浪微博'},
      {url: 'cTTayShKtEIdQVEMuiWt', title: '生活圈'},
      {url: 'umnHwvEgSyQtXlZjNJTt', title: '微信好友'},
      {url: 'SxpunpETIwdxNjcJamwB', title: 'QQ'}
    ].map(obj => ({
      icon: <img src={`https://gw.alipayobjects.com/zos/rmsportal/${obj.url}.png`} alt={obj.title}
                 style={{width: '36px'}}/>,
      title: obj.title
    })));
    const show1 = ref(false);
    const show2 = ref(false);
    const show3 = ref(false);
    const show4 = ref(false);


    return {
      dataList,
      show1, show2, show3, show4
    };
  },
  render() {
    return <>
      {
        // @ts-ignore
        <ActionSheet onClickMenu={(m, v) => {
          console.log(m, v);
        }}
                     title="I am description, description, description"
                     v-model={[this.show1, 'value']} menus={BUTTONS}/>
      }
      <m-button onClick={() => {
        this.show1 = true;
      }}>showActionSheet</m-button>
      <m-white-space/>
      <m-button onClick={() => {
        this.show2 = true;
      }}>showActionSheet&Badge</m-button>
      <m-white-space/>
      <ActionSheet v-model={[this.show2, 'value']}
                   menus={[{
                     label: 'Operation1',
                     badge: {
                       index: 1,
                       dot: true,
                     }
                   }, {
                     label: 'Operation2',
                     badge: {
                       index: 2,
                       text: 3100,
                     }
                   }, {
                     label: 'Operation3',
                     badge: {
                       index: 3,
                       text: '推荐',
                     },
                   }, {
                     label: 'Operation4',
                     badge: {
                       index: 4,
                       text: '···',
                     }
                   }, {
                     label: 'Operation5'
                   }, {
                     label: 'Delete'
                   }, {
                     label: 'Cancel'
                   }] as ActionSheetMenu[]}/>
      <m-button onClick={() => {
        this.show3 = true;
      }}>showShareActionSheet</m-button>
      <m-white-space/>
      <m-button onClick={() => {
        this.show4 = true;
      }}>showShareActionSheetMultipleLine</m-button>
      <m-white-space/>
      {
        // @ts-ignore
        <ActionSheet type="share" v-model={[this.show3, 'value']} menus={this.dataList}/>
      }
      <ActionSheet value={this.show4} menus={[{label: 'a'}, {label: 'b'}]}>
      </ActionSheet>
    </>;
  }
});
