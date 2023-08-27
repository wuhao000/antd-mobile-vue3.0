import {createApp, App, VNode} from 'vue';
import closest from '../../utils/closest';
import Modal from './modal';

export default function prompt(
  title: string | VNode,
  message: string | VNode,
  callbackOrActions: Array<{
    text: string, onPress?: (...args: any[]) => any, style?: object
  }> | ((...args: any[]) => any) = [{text: '取消'}, {text: '确认'}],
  type = 'default',
  defaultValue = '',
  placeholders = ['', ''],
  platform = 'ios'
) {
  let closed = false;
  return new Promise((resolve, reject) => {

    const copyDefaultValue = typeof defaultValue === 'string'
      ? defaultValue
      : typeof defaultValue === 'number' ? `${defaultValue}` : '';

    const prefixCls = 'am-modal';

    const data: any = {
      text: copyDefaultValue
    };

    function onChange(e: any) {
      const target = e.target;
      const inputType = target.getAttribute('type');
      if (inputType !== null) {
        data[inputType] = target.value;
      }
    }

    // hotfix issue: https://github.com/ant-design/ant-design-mobile/issues/2177
    function onClick(e: any) {
      const target = e.currentTarget || e.target;
      if (target) {
        target.focus();
      }
    }


    const focusFn = (input: HTMLInputElement | null) => {
      setTimeout(() => {
        if (input) {
          input.focus();
        }
      }, 500);
    };


    const div = document.createElement('div');
    document.body.appendChild(div);
    let modal: App = null;

    function close() {
      if (modal && modal.unmount) {
        modal.unmount();
      }
      if (div && div.parentNode) {
        div.parentNode.removeChild(div);
      }
    }

    function handleConfirm() {
      const {text = '', password = ''} = data;
      const callbackArgs =
        type === 'login-password'
          ? [text, password]
          : type === 'secure-text' ? [password] : [text];
      return resolve(callbackArgs[0]);
    }

    const actions: any[] = typeof callbackOrActions === 'function' ? [{
      text: '取消'
    }, {
      text: '确定', onPress: callbackOrActions
    }] : callbackOrActions.map((item, index) => {
      return {
        text: item.text,
        onPress: item.onPress || (() => {
          if (index === 1) {
            return handleConfirm();
          }
        })
      };
    });

    const footer = actions.map(button => {
      // tslint:disable-next-line:only-arrow-functions
      const orginPress = button.onPress || (() => {
      });
      button.onPress = () => {
        if (closed) {
          return;
        }
        const args = [];
        if (type === 'secure-text') {
          args.push(data['password']);
        } else if (type === 'login-password') {
          args.push(data['text']);
          args.push(data['password']);
        } else {
          args.push(data['text']);
        }
        const res: any = orginPress(...args);
        if (res && res.then) {
          res.then(() => {
            closed = true;
            close();
          })
            .catch(() => {
            });
        } else {
          closed = true;
          close();
        }
      };
      return button;
    });

    function onWrapTouchStart(e: any) {
      // exclude input element for focus
      if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
        return;
      }
      const pNode = closest(e.target as Element, `.${prefixCls}-content`);
      if (!pNode) {
        e.preventDefault();
      }
    }

    modal = createApp({
      methods: {
        createContent() {
          let inputDom;
          switch (type) {
            case 'login-password':
              inputDom = (
                <div class={`${prefixCls}-input-container`}>
                  <div class={`${prefixCls}-input`}>
                    <label>
                      <input
                        type="text"
                        value={data.text}
                        ref={input => focusFn(input as HTMLInputElement)}
                        onClick={onClick}
                        onChange={onChange}
                        placeholder={placeholders[0]}
                      />
                    </label>
                  </div>
                  <div class={`${prefixCls}-input`}>
                    <label>
                      <input
                        type="password"
                        value={data.password}
                        onClick={onClick}
                        onChange={onChange}
                        placeholder={placeholders[1]}
                      />
                    </label>
                  </div>
                </div>
              );
              break;
            case 'secure-text':
              inputDom = (
                <div class={`${prefixCls}-input-container`}>
                  <div class={`${prefixCls}-input`}>
                    <label>
                      <input
                        type="password"
                        value={data.password}
                        ref={input => focusFn(input as HTMLInputElement)}
                        onClick={onClick}
                        onChange={onChange}
                        placeholder={placeholders[0]}
                      />
                    </label>
                  </div>
                </div>
              );
              break;
            case 'default':
            default:
              inputDom = (
                <div class={`${prefixCls}-input-container`}>
                  <div class={`${prefixCls}-input`}>
                    <label>
                      <input
                        type="text"
                        value={data.text}
                        ref={el => {
                          focusFn(el as HTMLInputElement);
                        }}
                        onClick={onClick}
                        onChange={onChange}
                        placeholder={placeholders[0]}
                      />
                    </label>
                  </div>
                </div>
              );
          }
          return (
            <div>
              {message}
              {inputDom}
            </div>
          );
        }
      },
      render() {
        return <Modal
          open
          transparent
          prefixCls={prefixCls}
          title={title}
          closable={false}
          maskClosable={false}
          transitionName="am-zoom"
          footer={footer}
          maskTransitionName="am-fade"
          platform={platform}
          wrapProps={{onTouchStart: onWrapTouchStart}}>
          <div class={`${prefixCls}-propmt-content`}>{this.createContent()}</div>
        </Modal>;
      }
    });
    modal.mount(div);

    return {
      close
    };
  });
}
