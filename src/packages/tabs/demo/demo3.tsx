import {defineComponent} from 'vue';

export default defineComponent({
  name: 'TabBarExample',
  render() {
    return <div>
      <m-white-space/>
      <m-tabs initialPage={2} animated={false} useOnPan={false}>
        <m-tab
            title={'First Tab'}
            key="t1" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '250px',
          backgroundColor: '#fff'
        }}>
          Content of first tab
        </m-tab>
        <m-tab
            title={'Second Tab'}
            key="t2"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '250px',
              backgroundColor: '#fff'
            }}>
          Content of second tab
        </m-tab>
        <m-tab
            title={'Third Tab'}
            key="t3"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '250px',
              backgroundColor: '#fff'
            }}>
          Content of third tab
        </m-tab>
      </m-tabs>
      <m-white-space/>
    </div>;
  }
});
