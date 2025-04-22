import classnames from 'classnames';
import defaultLocale from './locale/zh_CN';
import {defineComponent, PropType, reactive, watch} from 'vue';
import Button from '../../button';
import Flex from '../../flex';
import {getComponentLocale} from '../../utils/getLocale';

export default defineComponent({
  install: null,
  name: 'MPagination',
  props: {
    prefixCls: {
      type: String,
      default: 'am-pagination'
    },
    mode: {
      default: 'button'
    },
    simple: {
      type: Boolean,
      default: false
    },
    value: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    },
    prevText: {
      type: String
    },
    nextText: {
      type: String
    }
  },
  setup(props, {emit, slots}) {
    const state = reactive({
      current: props.value
    });
    watch(() => props.value, (value: number) => {
      if (state.current !== value) {
        state.current = value;
      }
    });

    const onChange = (p: number) => {
      state.current = p;
      emit('update:value', p);
    };


    return {
      state, onChange
    };
  },
  render() {
    const {prefixCls, mode, total, simple} = this;
    const {current} = this.state;
    const locale = getComponentLocale(
      this.$props,
      this.$root,
      'Pagination',
      defaultLocale
    );
    const {prevText, nextText} = locale;

    let markup = (
      <Flex>
        <Flex.Item
          class={`${prefixCls}-wrap-btn ${prefixCls}-wrap-btn-prev`}>
          <Button
            inline
            disabled={current <= 1}
            onClick={() => this.onChange(current - 1)}
          >
            {this.$slots.prevText?.() ?? this.$slots['prev-text']?.() ?? prevText}
          </Button>
        </Flex.Item>
        {this.$slots.default ? (
          <Flex.Item>{this.$slots.default?.()}</Flex.Item>
        ) : (
          !simple && (
            <Flex.Item class={`${prefixCls}-wrap`} aria-live="assertive">
              <span class="active">{current}</span>/<span>{total}</span>
            </Flex.Item>
          )
        )}
        <Flex.Item
          class={`${prefixCls}-wrap-btn ${prefixCls}-wrap-btn-next`}
        >
          <Button
            inline
            disabled={current >= total}
            onClick={() => this.onChange(this.state.current + 1)}
          >
            {this.$slots.nextText?.() ?? this.$slots['next-text']?.() ?? nextText}
          </Button>
        </Flex.Item>
      </Flex>
    );
    if (mode === 'number') {
      markup = (
        <div class={`${prefixCls}-wrap`}>
          <span class="active">{current}</span>/<span>{total}</span>
        </div>
      );
    } else if (mode === 'pointer') {
      const arr: any = [];
      for (let i = 0; i < total; i++) {
        arr.push(
          <div
            key={`dot-${i}`}
            class={classnames(`${prefixCls}-wrap-dot`, {
              [`${prefixCls}-wrap-dot-active`]: i + 1 === current
            })}
          >
            <span/>
          </div>
        );
      }
      markup = <div class={`${prefixCls}-wrap`}>{arr}</div>;
    }
    const cls = classnames(prefixCls);
    return (
      <div class={cls}>
        {markup}
      </div>
    );
  }
});
