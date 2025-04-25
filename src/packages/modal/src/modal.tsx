import Dialog from 'ant-design-vue/es/vc-dialog';
import classnames from 'classnames';
import { CSSProperties, defineComponent, PropType } from 'vue';
import { Action } from '../../../../types/components/modal';
import Button from '../../button';
import Popup from '../../popup';
import TouchFeedback from '../../vmc-feedback';

export default defineComponent({
  alert: null,
  confirm: null,
  prompt: null,
  operation: null,
  install: null,
  name: 'MModal',
  props: {
    prefixCls: {
      default: 'am-modal'
    },
    transitionName: {
      type: String
    },
    maskTransitionName: {
      type: String
    },
    wrapClassName: {
      type: String
    },
    onText: {
      type: String
    },
    closeText: {
      type: String
    },
    wrapProps: {},
    loading: Boolean,
    platform: {
      type: String,
      default: 'ios'
    },
    bodyStyle: {
      type: Object as PropType<CSSProperties>
    },
    title: {
      type: [String, Object]
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    closable: {
      type: Boolean,
      default: false
    },
    footer: {
      type: Array,
      default: () => {
        return [];
      }
    },
    onClose: {
      type: Function
    },
    onOk: {
      type: Function
    },
    transparent: {
      type: Boolean,
      default: true
    },
    popup: {
      type: [Boolean, String],
      default: false
    },
    animated: {
      type: Boolean,
      default: true
    },
    animationType: {
      type: String as PropType<any>,
      default: 'slide-down'
    },
    onAnimationEnd: {},
    animateAppear: {
      type: Boolean
    },
    operation: {
      type: Boolean,
      default: false
    },
    open: Boolean
  },
  setup() {
    const renderFooterButton = (button: Action<any>, prefixCls: string | undefined, i: number) => {
      let buttonStyle = {};
      if (button.style) {
        buttonStyle = button.style;
        if (typeof buttonStyle === 'string') {
          const styleMap: {
            [key: string]: object;
          } = {
            cancel: {},
            default: {},
            destructive: { color: 'red' }
          };
          buttonStyle = styleMap[buttonStyle] || {};
        }
      }

      const onClickFn = (e: any) => {
        e.preventDefault();
        if (button.onPress) {
          button.onPress();
        }
      };

      return (
        // @ts-ignore
        <TouchFeedback activeClassName={`${prefixCls}-button-active`} key={i}>
          <a
            class={`${prefixCls}-button`}
            role="button"
            style={buttonStyle}
            onClick={onClickFn}>
            {button.text || `Button`}
          </a>
        </TouchFeedback>
      );
    };
    return {
      renderFooterButton
    };
  },
  render() {
    const {
      loading,
      prefixCls,
      wrapClassName,
      transitionName,
      maskTransitionName,
      platform,
      footer = [],
      operation,
      animated,
      transparent,
      popup,
      animationType,
      ...restProps
    } = this.$props;

    const buttonCount = footer.length + (this.onOk ? 1 : 0) + (this.onClose ? 1 : 0);

    const btnGroupClass = classnames(
      `${prefixCls}-button-group-${
        buttonCount > 1 && !operation ? 'h' : 'v'
      }`,
      `${prefixCls}-button-group-${operation ? 'operation' : 'normal'}`
    );
    const footerDom = (footer.length || this.onOk || this.onClose) ? (
      <div class={btnGroupClass} role="group">
        {footer.map((button, i) =>
          // tslint:disable-next-line:jsx-no-multiline-js
          this.renderFooterButton(button as Action<any>, prefixCls, i)
        )}
        {
          this.onClose && <Button
            disabled={loading}
            prefixCls="am-modal-button" onClick={(e) => {
              this.$emit('close', e);
            }}>{this.closeText ?? '关闭'}</Button>
        }
        {
          this.onOk && <Button
            loading={loading}
            prefixCls="am-modal-button" onClick={(e) => {
              this.$emit('ok', e);
            }}>{this.onText ?? '确定'}</Button>
        }
      </div>
    ) : null;

    let transName;
    let maskTransName;
    if (animated) {
      // tslint:disable-next-line:prefer-conditional-expression
      if (transparent) {
        transName = maskTransName = 'am-fade';
      } else {
        transName = maskTransName = 'am-slide-up';
      }
      if (popup) {
        transName =
          animationType === 'slide-up' ? 'am-slide-up' : 'am-slide-down';
        maskTransName = 'am-fade';
      }
    }

    const wrapCls = classnames(wrapClassName, {
      [`${prefixCls}-wrap-popup`]: popup
    });
    const cls = classnames(this.$attrs.class as string | Record<string, string>, {
      [`${prefixCls}-transparent`]: transparent,
      [`${prefixCls}-popup`]: popup,
      [`${prefixCls}-operation`]: operation,
      [`${prefixCls}-popup-${animationType}`]: popup && animationType,
      [`${prefixCls}-android`]: platform === 'android'
    });
    if (this.popup) {
      const placement = typeof this.popup === 'string' ? this.popup : 'bottom';
      return (
        <Popup
          placement={placement}
          showOk={false}
          open={this.open}
          title={this.title as any}
          maskClosable={this.closable}
          class={cls}
          onOk={(e) => {
            this.$emit('ok', e);
          }}
          onCancel={this.onClose || ((e) => {
            this.$emit('close', e);
          })}>
          {this.$slots.default?.()}
        </Popup>
      );
    }
    restProps['onUpdate:open'] = (v) => {
      this.$emit('update:open', v);
    };
    return (
      <Dialog
        {...restProps}
        maskClosable={this.maskClosable}
        visible={this.open}
        prefixCls={prefixCls}
        title={this.title}
        class={cls}
        onClose={this.onClose as any || ((e) => {
          this.$emit('update:visible', false);
          this.$emit('close', e);
        })}
        wrapClassName={wrapCls}
        transitionName={transitionName || transName}
        maskTransitionName={maskTransitionName || maskTransName}
        footer={footerDom}
        v-slots={{
          default: this.$slots.default
        }}
      />
    );
  }
});
