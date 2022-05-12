import {App, createApp, VNode} from 'vue';
import closest from '../../utils/closest';
import Modal from './modal';
import {Action} from '../../../../types/components/modal';

export default function alert(
  title: string | VNode,
  message: string | VNode,
  actions = [{text: '确定'}],
  platform = 'ios'
) {
  let closed = false;

  if (!title && !message) {
    // console.log('Must specify either an alert title, or message, or both');
    return {
      close: () => {
      }
    };
  }

  const div: any = document.createElement('div');
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

  return new Promise((resolve, reject) => {
    const footer = actions.map((button: Action<any>, index: number) => {
      // tslint:disable-next-line:only-arrow-functions
      const orginPress = button.onPress || (() => {
      });
      button.onPress = () => {
        if (closed) {
          return;
        }
        const res = orginPress();
        if (res && res.then) {
          res.then(() => {
            closed = true;
            close();
            if (actions.length === 2 && index === 0) {
              reject();
            } else {
              resolve(undefined);
            }
          }).catch((err) => {
            reject(err);
          });
        } else {
          closed = true;
          close();
          if (actions.length === 2 && index === 0) {
            reject();
          } else {
            resolve(undefined);
          }
        }
      };
      return button;
    });
    const prefixCls = 'am-modal';

    function onWrapTouchStart(e: any) {
      if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
        return;
      }
      const pNode = closest(e.target as Element, `.${prefixCls}-footer`);
      if (!pNode) {
        e.preventDefault();
      }
    }

    modal = createApp({
      render() {
        return <Modal
          visible
          transparent
          title={title}
          transitionName="am-zoom"
          closable={false}
          maskClosable={false}
          footer={footer}
          maskTransitionName="am-fade"
          platform={platform}
          wrapProps={{onTouchStart: onWrapTouchStart}}>
          <div class={`${prefixCls}-alert-content`}>{message}</div>
        </Modal>;
      }
    });
    modal.mount(div);
    return {
      close
    };
  });
}
