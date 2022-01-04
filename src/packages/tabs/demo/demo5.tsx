export default {
  render() {
    return <div style={{height: '200px'}}>
      <m-white-space/>
      <m-tabs initialPage={'t2'}
              tabBarPosition="left"
              tabDirection="vertical">
        <m-tab
            title={'1 Tab'}
            key="t1"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '250px',
              backgroundColor: '#fff'
            }}>
          Content of first tab
        </m-tab>
        <m-tab
            title={'2 Tab'}
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
            title={'3 Tab'}
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
};
