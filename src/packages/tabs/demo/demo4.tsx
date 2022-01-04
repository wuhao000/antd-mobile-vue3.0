export default {
  render() {
    return <div>
      <m-white-space/>
      <div style={{height: '200px'}}>
        <m-tabs initialPage={'t2'}>
          <m-tab
              title={'First Tab'}
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
      </div>
    </div>;
  }
};
