import {App, createApp, Transition, VNode} from 'vue';
import Icon from '../../icon';
import {notification} from "ant-design-vue";
import {v4} from 'uuid'
import {NotificationArgsProps} from "ant-design-vue/es/notification";

const prefixCls = 'am-toast';

const iconTypes: { [key: string]: string } = {
  info: '',
  success: 'success',
  fail: 'fail',
  offline: 'dislike',
  loading: 'loading'
};

const map = new Map<string, { container: HTMLDivElement; app: App }>();

const destroyAll = () => {
  map.forEach((value, key) => {
    value.app.unmount();
    value.container.remove();
    map.delete(key);
  });
};

const destroy = (key: string) => {
  const record = map.get(key);
  if (!record) {
    return;
  }
  record.app.unmount();
  record.container.remove();
  map.delete(key);
};

function notice(content: string | VNode, type: 'success' | 'info' | 'offline' | 'loading' | 'fail' | 'warning',
                duration = 3, onClose: (() => void) | undefined, mask: boolean = false) {
  const key = v4();
  const div = document.createElement('div');
  destroyAll();
  const options: NotificationArgsProps = {
    key,
    placement: 'top',
    prefixCls,
    message: content,
    icon: iconTypes[type] ? <Icon type={iconTypes[type]} size={'lg'}/> : undefined,
    duration: duration * 1000,
    onClose
  };
  document.body.appendChild(div);
  const app = createApp({
    render() {
      return (
        <Transition key={'fade-in'}>
          <div
            class={{
              [prefixCls]: true,
              [`${prefixCls}-mask`]: mask
            }}
            style="inset: 24px auto auto 50%; transform: translateX(-50%);">
            <div>
              <div class={`${prefixCls}-notice`}>
                <div class={`${prefixCls}-notice-content`}>
                  <div class={`${prefixCls}-notice-with-icon`}>
                    {options.icon ? <span class={`${prefixCls}-notice-icon`}>
                    {options.icon}
                  </span> : undefined}
                    <div class={`${prefixCls}-notice-message`}
                         v-text={content}>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      );
    }
  });
  app.mount(div);
  map.set(key, {
    container: div,
    app
  });
  setTimeout(() => {
    destroy(key);
  }, duration * 100000);
  return {
    hide: () => {
      destroy(key);
    }
  };
}

export default {
  install: (any) => {
  },
  show(content: string | VNode, duration?: number, mask?: boolean) {
    return notice(content, 'info', duration, () => {
    });
  },
  info(
    content: string | VNode,
    duration?: number,
    onClose?: () => void,
    mask: boolean = false
  ) {
    return notice(content, 'info', duration, onClose, mask);
  },
  success(
    content: string | VNode,
    duration?: number,
    onClose?: () => void,
    mask: boolean = false
  ) {
    return notice(content, 'success', duration, onClose, mask);
  },
  fail(
    content: string | VNode,
    duration?: number,
    onClose?: () => void,
    mask: boolean = false
  ) {
    return notice(content, 'fail', duration, onClose, mask);
  },
  offline(
    content: string | VNode,
    duration?: number,
    onClose?: () => void,
    mask: boolean = false
  ) {
    return notice(content, 'offline', duration, onClose, mask);
  },
  loading(content: string | VNode, duration?: number,
          onClose?: () => void, mask?: boolean) {
    return notice(content, 'loading', duration, onClose, mask);
  }
};
