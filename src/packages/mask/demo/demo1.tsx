import {defineComponent, ref} from 'vue';
import {Button, Mask, Space} from '../../';
import DemoBlock from '../../../components/demo-wrapper';
import {useState} from '../../utils/use-state';
import './demo1.less';

// 基础用法
const Simple = defineComponent({
  setup() {
    const open = ref(false);
    return {
      open
    };
  },
  render() {
    return (
        <>
          <Button onClick={() => this.open = true}>显示遮罩层</Button>
          <Mask open={this.open} onMaskClick={() => this.open = false}/>
        </>
    );
  }
});

// 自定义内容
const WithContent = defineComponent({
  setup() {
    const open = ref(false);
    return {open};
  },
  render() {
    return (
        <>
      <Mask open={this.open} onMaskClick={() => this.open = false}>
        <div class={'overlayContent'}>内容</div>
      </Mask>
      <Button onClick={() => this.open = true}>显示带内容的遮罩层</Button>
    </>
    );
  }
});

// 遮罩层的颜色深度 - 深一些
const Thick = defineComponent({
  setup() {
    const open = ref(false);
    return {open};
  },
  render() {
    return (
        <>
      <Mask
        open={this.open}
          onMaskClick={() => this.open = false}
          opacity="thick"
      />
      <Button onClick={() => this.open = true}>显示深一些的遮罩层</Button>
    </>
    );
  }
});

// 遮罩层的颜色深度 - 浅一些
const Thin = defineComponent({
  setup() {
    const open = ref(false);
    return {open};
  },
  render() {
    return (
        <>
      <Mask
        open={this.open}
          onMaskClick={() => this.open = false}
          opacity="thin"
      />
      <Button onClick={() => this.open = true}>显示浅一些的遮罩层</Button>
    </>
    );
  }
});

// 遮罩层的颜色深度 - 自定义
const CustomOpacity = defineComponent({
  setup() {
    const open = ref(false);
    return {open};
  },
  render() {
    return (<>
      <Mask
        open={this.open}
          onMaskClick={() => this.open = false}
          opacity={1}
      />
      <Button onClick={() => this.open = true}>显示自定义透明度的遮罩层</Button>
    </>);
  }
});

// 白色的遮罩层
const White = defineComponent({
  setup() {
    const [open, setOpen] = useState(false);
    return {open, setOpen};
  },
  render() {
    return (
        <>
      <Button onClick={() => this.setOpen(true)}>显示白色的遮罩层</Button>
      <Mask
          color="white"
          open={this.open}
          onMaskClick={() => this.setOpen(false)}
      />
    </>
    );
  }
});

export default () => {
  return (
      <>
      <DemoBlock title="基础用法">
        <Simple/>
      </DemoBlock>

      <DemoBlock title="遮罩层的颜色深度">
        <Space wrap>
          <Thin/>
          <Thick/>
          <CustomOpacity/>
        </Space>
      </DemoBlock>

      <DemoBlock title="白色的遮罩层">
        <White/>
      </DemoBlock>

      <DemoBlock title="自定义内容">
        <WithContent/>
      </DemoBlock>
    </>
  );
};

