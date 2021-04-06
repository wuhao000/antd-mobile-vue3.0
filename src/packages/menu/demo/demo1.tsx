import {defineComponent, reactive} from 'vue';
import './demo1.less';

const data = [
  {
    value: '1',
    label: 'Food',
    children: [
      {
        label: 'All Foods',
        value: '1',
        disabled: false
      },
      {
        label: 'Chinese Food',
        value: '2'
      }, {
        label: 'Hot Pot',
        value: '3'
      }, {
        label: 'Buffet',
        value: '4'
      }, {
        label: 'Fast Food',
        value: '5'
      }, {
        label: 'Snack',
        value: '6'
      }, {
        label: 'Bread',
        value: '7'
      }, {
        label: 'Fruit',
        value: '8'
      }, {
        label: 'Noodle',
        value: '9'
      }, {
        label: 'Leisure Food',
        value: '10'
      }]
  }, {
    value: '2',
    label: 'Supermarket',
    children: [
      {
        label: 'All Supermarkets',
        value: '1'
      }, {
        label: 'Supermarket',
        value: '2',
        disabled: true
      }, {
        label: 'C-Store',
        value: '3'
      }, {
        label: 'Personal Care',
        value: '4'
      }]
  },
  {
    value: '3',
    label: 'Extra',
    isLeaf: true,
    children: [
      {
        label: 'you can not see',
        value: '1'
      }
    ]
  }
];

export default defineComponent({
  name: 'MenuExample',
  props: {},
  setup(props, {emit, slots}) {
    const state = reactive({
      initData: [],
      show: false
    });


    const onChange = (value) => {
      let label = '';
      data.forEach((dataItem) => {
        if (dataItem.value === value[0]) {
          label = dataItem.label;
          if (dataItem.children && value[1]) {
            dataItem.children.forEach((cItem) => {
              if (cItem.value === value[1]) {
                label += ` ${cItem.label}`;
              }
            });
          }
        }
      });
      console.log(label);
    };
    const handleClick = (e) => {
      e.preventDefault(); // Fix event propagation on Android
      state.show = !state.show;
      // mock for async data loading
      if (!state.initData.length) {
        setTimeout(() => {
          state.initData = data;
        }, 500);
      }
    };
    const onMaskClick = () => {
      state.show = false;
    };
    return {
      onChange, state, handleClick, onMaskClick
    };
  },
  render() {
    const {initData, show} = this.state;
    const menuEl = (
        <m-menu
            class="foo-menu"
            data={initData}
            value={['1', '3']}
            onChange={this.onChange}
            height={document.documentElement.clientHeight * 0.6}
        />
    );
    const loadingEl = (
        <div style={{
          width: '100%',
          height: document.documentElement.clientHeight * 0.6,
          display: 'flex',
          justifyContent: 'center'
        }}>
          <m-activity-indicator size="large"/>
        </div>
    );
    return (
        <div class={show ? 'menu-active demo' : 'demo'}>
          <m-nav-bar
              leftContent="Menu"
              mode="light"
              icon={<img src="https://gw.alipayobjects.com/zos/rmsportal/iXVHARNNlmdCGnwWxQPH.svg"
                         class="am-icon am-icon-md" alt=""/>}
              onLeftClick={this.handleClick}
              class="top-nav-bar"
          >
            Here is title
          </m-nav-bar>
          {show ? initData.length ? menuEl : loadingEl : null}
          {show ? <div class="menu-mask" onClick={this.onMaskClick.bind(this)}/> : null}
        </div>
    );
  }
});
