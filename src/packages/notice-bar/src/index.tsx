import classnames from 'classnames';
import { defineComponent, PropType, ref, VNode } from 'vue';
import Icon from '../../icon';
import Marquee, { MarqueeProps } from './marquee';

export default defineComponent({
  inheritAttrs: false,
  install: null,
  name: 'MNoticeBar',
  props: {
    marqueeProps: {
      type: Object as PropType<MarqueeProps>
    },
    prefixCls: {
      type: String,
      default: 'am-notice-bar'
    },
    mode: {
      type: String as PropType<'closable' | 'link'>,
      default: ''
    },
    icon: {
      type: [String, Object] as PropType<string | VNode>
    },
    action: {
      type: Object as PropType<VNode>
    }
  },
  emits: ['click'],
  setup(props, { emit }) {
    const show = ref(true);

    const onClick = () => {
      const { mode } = props;
      emit('click');
      if (mode === 'closable') {
        show.value = false;
      }
    };

    return {
      onClick, show
    };
  },
  render() {
    const {
      mode,
      prefixCls,
      action,
      marqueeProps
    } = this.$props;
    const icon = this.$slots.icon?.() ?? this.icon ?? <Icon type="voice" size="xxs" />;
    const extraProps: Record<string, unknown> = {};
    let operationDom: VNode = null;
    if (mode === 'closable') {
      operationDom = (
        <div
          class={`${prefixCls}-operation`}
          onClick={this.onClick}
          role="button"
          aria-label="close">
          {this.$slots.action?.() ?? action ?? <Icon type="cross" size="md" />}
        </div>
      );
    } else {
      if (mode === 'link') {
        operationDom = (
          <div
            class={`${prefixCls}-operation`}
            role="button"
            aria-label="go to detail"
          >
            {action ? action : <Icon type="right" size="md" />}
          </div>
        );
      }
      extraProps.onClick = this.onClick;
    }

    const wrapCls = classnames(prefixCls);

    return this.show ? (
      <div
        {...this.$attrs}
        class={wrapCls}
        onClick={(e) => {
          if (extraProps.onClick) {
            (extraProps.onClick as (e) => void)(e);
          }
        }} role="alert">
        {icon && (
          // tslint:disable-next-line:jsx-no-multiline-js
          <div class={`${prefixCls}-icon`} aria-hidden="true">
            {icon}
          </div>
        )}
        <div class={`${prefixCls}-content`}>
          <Marquee
            {...marqueeProps}
            prefixCls={prefixCls}
            text={this.$slots.default?.()?.[0]}
          />
        </div>
        {operationDom}
      </div>
    ) : null;
  }
});
