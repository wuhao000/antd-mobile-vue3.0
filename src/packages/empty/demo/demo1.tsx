import Empty from '../';
import Icon from '../../icon';
import DemoBlock from '../../../components/demo-wrapper';

export default () => {
  return (
      <>
      <DemoBlock title="基础用法">
        <Empty/>
      </DemoBlock>

      <DemoBlock title="描述文字">
        <Empty description="暂无数据"/>
      </DemoBlock>

      <DemoBlock title="自定义样式">
        <Empty
            style={{padding: '64px 0'}}
            imageStyle={{width: 128}}
            description="暂无数据"
        />
      </DemoBlock>

      <DemoBlock title="自定义图片">
        <Empty
            style={{padding: '64px 0'}}
            image={
              <Icon
                  type={'success'}
                  style={{
                    color: 'var(--adm-color-light)',
                    fontSize: 48
                  }}
              />
            }
            description="暂无数据"
        />
      </DemoBlock>
    </>
  );
};

