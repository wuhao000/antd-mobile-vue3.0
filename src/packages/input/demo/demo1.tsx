import {defineComponent, reactive} from 'vue';
import List from '../../list';
import InputItem from '../index';

// 通过自定义 moneyKeyboardWrapProps 修复虚拟键盘滚动穿透问题
// https://github.com/ant-design/ant-design-mobile/issues/307
// https://github.com/ant-design/ant-design-mobile/issues/163
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
  moneyKeyboardWrapProps = {
    onTouchStart: e => e.preventDefault()
  };
}

export default defineComponent({
  name: 'H5NumberInputExample',
  setup() {
    const state = reactive({
      type: 'money' as any
    });
    return {
      state
    };
  },
  render() {
    const {type} = this.state;
    return (
        <div>
          <List>
            <InputItem
                type={type}
                value={100}
                placeholder="start from left"
                clearable
                moneyKeyboardAlign="left"
                moneyKeyboardWrapProps={moneyKeyboardWrapProps}
            >光标在左</InputItem>
            <InputItem
                type={type}
                placeholder="start from right"
                clearable
                onChange={(v) => {
                  console.log('onChange', v);
                }}
                onBlur={(v) => {
                  console.log('onBlur', v);
                }}
                moneyKeyboardWrapProps={moneyKeyboardWrapProps}
            >光标在右</InputItem>
            <InputItem
                type={type}
                placeholder="money format"
                ref="input"
                onConfirm={v => console.log('onVirtualKeyboardConfirm:', v)}
                clearable
                moneyKeyboardWrapProps={moneyKeyboardWrapProps}
            >数字键盘</InputItem>
            <List.Item>
              <div
                  style={{width: '100%', color: '#108ee9', textAlign: 'center'}}
                  onClick={() => (this.$refs.input as any).focus()}
              >
                click to focus
              </div>
            </List.Item>
          </List>
        </div>
    );
  }
});
