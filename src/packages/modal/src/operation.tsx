import {createApp, App} from 'vue';
import closest from '../../utils/closest';
import Modal from './modal';
import {Action} from './props-type';

export default function operation(
  actions = [{text: '确定'}],
  platform = 'ios'
) {
  let closed = false;

  const prefixCls = 'am-modal';
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

  const footer = actions.map((button: Action<any>) => {
    // tslint:disable-next-line:only-arrow-functions
    const orginPress = button.onPress || (() => {
    });
    button.onPress = () => {
      if (closed) {
        return;
      }

      const res = orginPress();
      if (res && res.then) {
        res
          .then(() => {
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
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target as Element, `.am-modal-footer`);
    if (!pNode) {
      e.preventDefault();
    }
  }

  modal = createApp({
    render() {
      // @ts-ignore
      return <Modal
        visible={true}
        operation
        transparent
        prefixCls={prefixCls}
        transitionName="am-zoom"
        closable={false}
        maskClosable={true}
        onClose={close}
        footer={footer}
        maskTransitionName="am-fade"
        class="am-modal-operation"
        platform={platform}
        wrapProps={{onTouchStart: onWrapTouchStart}}
      >{this.$slots.default?.()}</Modal>;
    }
  });
  modal.mount(div);

  return {
    close
  };
}
