import {App, createApp, Transition, VNode} from 'vue';
import Icon from '../../icon';
import {v4} from 'uuid'
import {NotificationArgsProps} from "ant-design-vue/es/notification";
import {isNull} from "../../utils/util";

const prefixCls = 'am-toast';

const iconTypes: { [key: string]: string } = {
  info: '',
  success: 'success',
  fail: 'fail',
  offline: 'dislike',
  loading: 'loading'
};

interface ToastProps {
  content?: string | VNode;
  type?: 'success' | 'info' | 'offline' | 'loading' | 'fail' | 'warning';
  duration: number;
  onClose?: (() => void) | undefined,
  mask: boolean,
  position?: 'top' | 'bottom' | 'center'
}

const DEFAULT_CONFIG: ToastProps = {
  duration: 3,
  mask: false,
  position: 'center'
}

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

const offset = {
  top: 20,
  center: 50,
  bottom: 80
};

function notice(props: ToastProps) {
  Object.keys(DEFAULT_CONFIG).forEach(key => {
    if (isNull(props[key])) {
      props[key] = DEFAULT_CONFIG[key]
    }
  });
  const {
    content,
    type,
    duration,
    onClose,
    mask,
    position
  } = props;
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
          <div>
            <div class={['am-mask', 'am-toast-mask']}
                 style={{
                   pointerEvents: mask ? 'all' : 'none'
                 }}>
              <div class="am-mask-content">
                <div class="am-toast-wrap">
                  <div class="am-toast-main am-toast-main-icon" style={{top: `${offset[position] ?? 50}%`}}>
                    <div class="am-toast-icon">
                      {options.icon ? <span class={`${prefixCls}-notice-icon`}>{options.icon}</span> : undefined}
                    </div>
                    <div class="am-auto-center">
                      <div class="am-auto-center-content"><span>{content}</span></div>
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
  }, duration * 1000);
  return {
    hide: () => {
      destroy(key);
    }
  };
}

export default {
  install: () => {
  },
  show(props: ToastProps) {
    return notice(props);
  },
  info(
    content: string | VNode,
    duration?: number,
    onClose?: () => void,
    mask: boolean = false
  ) {
    return notice({
      content,
      type: 'info',
      duration,
      onClose,
      mask
    });
  },
  success(
    content: string | VNode,
    duration?: number,
    onClose?: () => void,
    mask: boolean = false
  ) {
    return notice({
      content, type: 'success', duration, onClose, mask
    });
  },
  fail(
    content: string | VNode,
    duration?: number,
    onClose?: () => void,
    mask: boolean = false
  ) {
    return notice({
      content, type: 'fail', duration, onClose, mask
    });
  },
  offline(
    content: string | VNode,
    duration?: number,
    onClose?: () => void,
    mask: boolean = false
  ) {
    return notice({
      content, type: 'offline', duration, onClose, mask
    });
  },
  loading(content: string | VNode, duration?: number,
          onClose?: () => void, mask?: boolean) {
    return notice({
      content, type: 'loading', duration, onClose, mask
    });
  },
  config: (props: Partial<Pick<ToastProps, 'duration' | 'onClose' | 'mask' | 'type' | 'position'>>) => {
    Object.keys(props).forEach(key => {
      DEFAULT_CONFIG[key] = props[key];
    });
  }
};
