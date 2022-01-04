import {defineComponent} from 'vue';
import Tabs from '../src';

export default defineComponent({
  name: 'TabsExample',
  props: {},
  setup() {
    const renderContent = (tab) => {
      return (<m-tab
          title={tab.title}
          key={tab.key}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '150px',
            backgroundColor: '#fff'
          }}>
        <p>Content of {tab.title}</p>
      </m-tab>);
    };
    return {
      renderContent
    };
  },
  render() {
    const tabs = [
      {title: '1st Tab', key: '1'},
      {title: '2nd Tab', key: '2'},
      {title: '3rd Tab', key: '3'},
      {title: '4th Tab', key: '4'},
      {title: '5th Tab', key: '5'},
      {title: '6th Tab', key: '6'},
      {title: '7th Tab', key: '7'},
      {title: '8th Tab', key: '8'},
      {title: '9th Tab', key: '9'}
    ];

    return (
        <div>
          <m-white-space/>
          <m-tabs
              renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3}/>}>
            {
              tabs.map(tab => this.renderContent(tab))
            }
          </m-tabs>
          <m-white-space/>
        </div>
    );
  }
});
