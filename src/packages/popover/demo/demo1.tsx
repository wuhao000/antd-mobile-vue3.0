import {Popover as APopover} from 'ant-design-vue';
import {defineComponent, reactive} from 'vue';
import {Icon, NavBar, Popover} from '../../index';

const Item = Popover.Item;

export default defineComponent({
  name: 'PopoverExample',
  setup() {
    const state = reactive({
      visible: true,
      selected: '',
      maskClosable: true,
      mask: true,
      placement: 'bottomRight' as any
    });
    const onSelect = (opt) => {
      state.visible = false;
      state.selected = opt.props.value;
    };
    const handleVisibleChange = (visible) => {
      state.visible = visible;
    };
    const myImg = (src) => {
      return <img src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`} class="am-icon am-icon-xs" alt=""/>;
    };
    const onItemClick = () => {
      state.visible = false;
    };
    return {
      state,
      onItemClick,
      myImg
    };
  },
  render() {
    const slots = {
      default: () => <div
          style={{
            height: '100%',
            padding: '0 15px',
            marginRight: '-15px',
            display: 'flex',
            alignItems: 'center'
          }}>
        <Icon type="ellipsis"/>
      </div>,
      content: () => <div>
        <Item key="4"
              value="scan"
              onClick={this.onItemClick}
              icon={this.myImg('tOtXhkIWzwotgGSeptou')}>Scan</Item>
        <Item key="5"
              value="special" icon={this.myImg('PKAgAqZWJVNwKsAJSmXd')}
              style={{whiteSpace: 'nowrap'}}>My Qrcode</Item>
        <Item key="6" value="button ct" icon={this.myImg('uQIYTFeRrjPELImDRrPt')}>
          <span style={{marginRight: 5}}>Help</span>
        </Item>
      </div>
    };
    return (<div>
      <NavBar
          mode="light"
          leftContent={this.state.visible.toString()}
          rightContent={
            <Popover
                mask={this.state.mask}
                placement={this.state.placement}
                maskClosable={this.state.maskClosable}
                v-slots={slots}
                v-model={[this.state.visible, 'visible']}>
            </Popover>
          }
      >
        NavBar
      </NavBar>
      <m-white-space/>
      <m-switch-item title="???????????????????????????" vModel={this.state.maskClosable}/>
      <m-switch-item title="?????????????????????" vModel={this.state.mask}/>
      <m-radio-popup-list title="?????????????????????" v-model={this.state.placement} options={[
        {label: '???', value: 'tpo'},
        {label: '???', value: 'bottom'},
        {label: '???', value: 'left'},
        {label: '???', value: 'right'},
        {label: '??????', value: 'topLeft'},
        {label: '??????', value: 'topRight'},
        {label: '??????', value: 'bottomLeft'},
        {label: '??????', value: 'bottomRight'}
      ]}>
      </m-radio-popup-list>
    </div>);
  }
});
