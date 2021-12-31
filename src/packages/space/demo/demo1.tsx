import Button  from '../../button'
import Space from '../';
import DemoWrapper from "../../../components/demo-wrapper";

export default () => {
  return (
    <>
      <DemoWrapper title='水平方向的间距'>
        <Space>
          <Button>按钮1</Button>
          <Button>按钮2</Button>
          <Button>按钮3</Button>
        </Space>
      </DemoWrapper>

      <DemoWrapper title='换行'>
        <Space wrap>
          <Button>按钮1</Button>
          <Button>按钮2</Button>
          <Button>按钮3</Button>
          <Button>按钮4</Button>
          <Button>按钮5</Button>
          <Button>按钮6</Button>
          <Button>按钮7</Button>
          <Button>按钮8</Button>
          <Button>按钮9</Button>
          <Button>按钮10</Button>
          <Button>按钮11</Button>
        </Space>
      </DemoWrapper>

      <DemoWrapper title='垂直方向的间距'>
        <Space direction='vertical'>
          <Button>按钮1</Button>
          <Button>按钮2</Button>
          <Button>按钮3</Button>
        </Space>
      </DemoWrapper>

      <DemoWrapper title='自定义间距大小'>
        <Space style={{ '--gap': '24px' }}>
          <Button>按钮1</Button>
          <Button>按钮2</Button>
          <Button>按钮3</Button>
        </Space>
      </DemoWrapper>

      <DemoWrapper title='渲染为块级元素'>
        <Space direction='vertical' block>
          <Button>按钮1</Button>
          <Button>按钮2</Button>
          <Button>按钮3</Button>
        </Space>
      </DemoWrapper>

      <DemoWrapper title='主轴对齐方式'>
        <Space justify='center' block>
          <Button>1</Button>
          <Button>
            2<br />2
          </Button>
          <Button>
            3<br />3<br />3
          </Button>
        </Space>
      </DemoWrapper>

      <DemoWrapper title='交叉轴对齐方式'>
        <Space align='end'>
          <Button>1</Button>
          <Button>
            2<br />2
          </Button>
          <Button>
            3<br />3<br />3
          </Button>
        </Space>
      </DemoWrapper>
    </>
  )
}
