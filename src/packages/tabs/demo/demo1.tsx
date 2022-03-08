import {computed, defineComponent} from 'vue';

const tabs2 = [
  {title: 'First Tab', sub: '1'},
  {title: 'Second Tab', sub: '2'},
  {title: 'Third Tab', sub: '3'}
];

export default defineComponent({
  name: 'TabBarExample',
  props: {},
  setup() {
    const tabs = computed(() => {
      return [
        {title: <m-badge text="3">First Tab</m-badge>},
        {title: <m-badge text="今日(20)">Second Tab</m-badge>},
        {title: <m-badge dot={true}>Third Tab</m-badge>}
      ];
    });
    return {tabs};
  },
  render() {
    return <div>
      <m-tabs initialPage={1}
              defaultValue={'tab2'}
              onChange={(tab, index) => {
                console.log('onChange', index, tab);
              }}
              onTabClick={(tab, index) => {
                console.log('onTabClick', index, tab);
              }}
      >
        <m-tab
            title={<m-badge text="3">First Tab</m-badge>}
            key={'tab1'}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '150px',
              backgroundColor: '#fff'
            }}>
          Content of first tab
        </m-tab>
        <m-tab
            title={<m-badge text="今日(20)">Second Tab</m-badge>}
            key={'tab2'}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '150px',
              backgroundColor: '#fff'
            }}>
          Content of second tab
        </m-tab>
        <m-tab
            title={<m-badge dot={true}>Third Tab</m-badge>}
            key={'tab3'}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '150px',
              backgroundColor: '#fff'
            }}>
          Content of third tab
        </m-tab>
      </m-tabs>
      <m-white-space/>
      <m-tabs tabs={tabs2}
              initialPage={1}
              tabBarPosition="bottom"
              renderTab={tab => <span>{tab.title}</span>}
      >
        <m-tab
            title={'First Tab'}
            key={'tab1'}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '150px',
              backgroundColor: '#fff'
            }}>
          Content of first tab
        </m-tab>
        <m-tab
            title={'Second Tab'}
            key={'tab2'}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '150px',
              backgroundColor: '#fff'
            }}>
          Content of second tab
        </m-tab>
        <m-tab
            title={'Third Tab'}
            key={'tab3'}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '150px',
              backgroundColor: '#fff'
            }}>
          Content of third tab
        </m-tab>
      </m-tabs>
      <m-white-space/>
    </div>;
  }
});
