import classNames from 'classnames';
import {defineComponent, PropType, ref, Ref} from 'vue';

export default defineComponent({
  name: 'MNotice',
  props: {
    duration: {
      type: Number
    },
    onClose: {
      type: Function as PropType<any>
    },
    children: {},
    prefixCls: {
      type: String
    },
    closable: {
      type: Boolean
    }
  },
  setup(props, {emit, slots}) {
    const closeTimer: Ref<any> = ref(null);
    const componentDidMount = () => {
      startCloseTimer();
    };
    const componentWillUnmount = () => {
      clearCloseTimer();
    };
    const close = () => {
      clearCloseTimer();
      emit('close');
    };
    const startCloseTimer = () => {
      if (props.duration) {
        closeTimer.value = setTimeout(() => {
          close();
        }, props.duration * 1000);
      }
    };
    const clearCloseTimer = () => {
      if (closeTimer.value) {
        clearTimeout(closeTimer.value);
        closeTimer.value = null;
      }
    };


    return {
      closeTimer,
      componentDidMount,
      componentWillUnmount,
      close,
      startCloseTimer,
      clearCloseTimer
    };
  },
  render() {
    const componentClass = `${this.prefixCls}-notice`;
    const className = {
      [`${componentClass}`]: 1,
      [`${componentClass}-closable`]: this.closable
    };
    return (
        <div class={classNames(className)}>
          <div class={`${componentClass}-content`}>{this.$slots.default?.()}</div>
          {this.closable ?
              <a tabindex={0} onClick={this.close} class={`${componentClass}-close`}>
                <span class={`${componentClass}-close-x`}/>
              </a> : null
          }
        </div>
    );
  }
});
