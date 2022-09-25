import classNames from 'classnames';
import {
  computed,
  CSSProperties,
  defineComponent,
  getCurrentInstance,
  inject,
  onBeforeUnmount,
  PropType,
  ref,
  VNode
} from 'vue';
import Popover from '../../popover';
import toast from '../../toast';
import {filterHTMLAttrs} from '../../utils/dom';
import {isEmptySlot} from '../../utils/vnode';
import TouchFeedback from '../../vmc-feedback';

export const Brief = defineComponent({
  name: 'MListItemBrief',
  props: {
    prefixCls: {},
    role: {}
  },
  render() {
    return (
      <div class="am-list-brief">
        {this.$slots.default()}
      </div>
    );
  }
});

const Item = defineComponent({
  inheritAttrs: false,
  name: 'MListItem',
  props: {
    onClick: {},
    text: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    prefixCls: {
      default: 'am-list-item'
    },
    role: {
      type: String as PropType<string>
    },
    platform: {
      type: String as PropType<'android' | 'ios'>,
      default: 'iOS'
    },
    thumb: {
      type: [String, Object] as PropType<string | object>
    },
    extra: {
      type: [String, Object] as PropType<string | VNode>
    },
    control: {
      type: [String, Object] as PropType<string | VNode>
    },
    extraPosition: {
      type: String as PropType<'left' | 'center' | 'right'>,
      default: 'right'
    },
    activeStyle: {
      type: Object as PropType<any>
    },
    multipleLine: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    error: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    errorMessage: {
      type: String as PropType<string>
    },
    errorDisplayType: {
      type: String as PropType<'toast' | 'popover' | 'text'>,
      default: 'text'
    },
    disabled: {
      type: Boolean as PropType<false>,
      default: false
    },
    align: {
      type: String as PropType<'top' | 'middle' | 'bottom'>,
      default: 'middle'
    },
    wrap: {
      type: Boolean as PropType<boolean>
    },
    arrow: {
      type: String as PropType<'horizontal' | 'down' | 'up' | 'empty' | ''>
    },
    title: {
      type: [String, Object] as PropType<string | VNode>,
      default: ''
    },
    labelPosition: {
      type: String as PropType<'top' | 'left'>,
      default: 'left'
    },
    contentStyle: {
      type: Object as PropType<CSSProperties>,
      default: () => {
        return {};
      }
    },
    extraStyle: {
      type: Object as PropType<CSSProperties>,
      default: () => {
        return {};
      }
    },
    touchFeedback: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    required: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    suffix: {}
  },
  setup(props, {emit, slots}) {
    const debounceTimeout = ref(null);
    const coverRippleStyle: any = ref({display: 'none'});
    const rippleClicked = ref(false);
    const list: any = inject('list', undefined);
    const showErrorPopover = ref(false);
    const instance = getCurrentInstance();
    const actualError = computed(() => props.error ?? instance.parent['error'] ?? false);
    const actualErrorMessage = computed(() => props.errorMessage || instance.parent['errorMessage']);
    const actualDisabled = computed(() => props.disabled);
    const layout = computed(() => list?.layout ?? 'horizontal')
    const actualErrorDisplayType = computed(() => {
      if (layout.value === 'vertical') {
        return 'text';
      }
      return props.errorDisplayType ?? instance.parent['errorDisplayType']
    });
    const onClick = (ev: any) => {
      ev.stopPropagation();
      const isAndroid = props.platform === 'android';
      if (isAndroid) {
        if (debounceTimeout.value) {
          clearTimeout(debounceTimeout.value);
          debounceTimeout.value = null;
        }
        const Item = ev.currentTarget;
        const RippleWidth = Math.max(Item.offsetHeight, Item.offsetWidth);
        const ClientRect = ev.currentTarget.getBoundingClientRect();
        const pointX = ev.clientX - ClientRect.left - Item.offsetWidth / 2;
        const pointY = ev.clientY - ClientRect.top - Item.offsetWidth / 2;
        coverRippleStyle.value = {
          width: `${RippleWidth}px`,
          height: `${RippleWidth}px`,
          left: `${pointX}px`,
          top: `${pointY}px`
        };
        rippleClicked.value = true;
        debounceTimeout.value = setTimeout(() => {
          coverRippleStyle.value = {display: 'none'};
          rippleClicked.value = false;
        }, 1000);
      }
      emit('click');
    };
    const renderExtra = () => {
      const extra = [];
      extra.push(actualError.value && actualErrorDisplayType.value !== 'text' ? (
        <div
          class={`${props.prefixCls}-error-extra`}
          onClick={(e) => {
            e.stopPropagation();
            if (actualErrorMessage.value) {
              if (actualErrorDisplayType.value === 'toast') {
                toast.fail(actualErrorMessage.value);
              }
              if (actualErrorDisplayType.value === 'popover' && !showErrorPopover.value) {
                showErrorPopover.value = true;
              }
            }
            emit('error-click', e);
            emit('errorClick', e);
          }}>
          {
            actualErrorDisplayType.value === 'popover'
              ? <Popover v-model={[showErrorPopover.value, 'value']}
                         mask={false}
                         v-slots={{
                           content: () => <Popover.Item>
                             {actualErrorMessage.value}
                           </Popover.Item>
                         }}
              >
              </Popover> : null
          }
        </div>

      ) : null)
      const hasExtra = !isEmptySlot(slots.extra) || props.extra || (actualError.value && actualErrorMessage.value);
      if (hasExtra) {
        extra.push(<div style={props.extraStyle}
                        class={classNames(`${props.prefixCls}-extra`, {
                          [`${props.prefixCls}-extra-text`]: props.text
                        })}>{slots.extra?.() || props.extra}
          {
            actualErrorDisplayType.value === 'text' && actualError.value && actualErrorMessage.value ?
              <div>
                {actualErrorMessage.value}
              </div> : null
          }
        </div>)
      }
      return extra
    };
    const renderThumb = () => {
      const {thumb, prefixCls} = props;
      if (slots.thumb) {
        return <div class={`${prefixCls}-thumb`}>{slots.thumb()}</div>;
      } else if (thumb) {
        return <div class={`${prefixCls}-thumb`}>
          {typeof thumb === 'string' ? <img src={thumb}/> : thumb}
        </div>;
      } else if (props.required) {
        return <div class={`${prefixCls}-required`}/>;
      } else {
        return null;
      }
    };
    const renderLabel = () => {
      if (!isEmptySlot(slots.default)) {
        return (
          <div class={`${props.prefixCls}-title`}
               style={props.contentStyle}>
            {renderThumb()}
            {slots.default()}
          </div>
        );
      } else if (props.title) {
        return (
          <div class={`${props.prefixCls}-title`}
               style={props.contentStyle}>
            {renderThumb()}
            {props.title}</div>
        );
      } else {
        return renderThumb();
      }
    };
    const renderControl = () => (slots.control || props.control) ?
      <div class={props.prefixCls + '-control'}>{slots.control?.() || props.control}</div> : null;
    onBeforeUnmount(() => {
      if (debounceTimeout.value) {
        clearTimeout(debounceTimeout.value);
        debounceTimeout.value = null;
      }
    });
    return {
      coverRippleStyle, rippleClicked,
      actualErrorDisplayType,
      actualError, actualDisabled,
      onClick, renderThumb,
      renderLabel, renderControl,
      renderExtra, actualErrorMessage,
      list, layout
    };
  },
  render() {
    const {
      prefixCls,
      activeStyle,
      align,
      wrap,
      disabled,
      multipleLine,
      arrow,
      actualError
    } = this;
    const {coverRippleStyle, rippleClicked} = this;
    const section = this.$parent['section'];
    const wrapCls = classNames(prefixCls,
      `${prefixCls}-label-${this.labelPosition}`,
      this.$attrs.class as string | Record<string, string> ?? '',
      `${prefixCls}-${this.layout}`,
      {
        [`${prefixCls}-disabled`]: this.actualDisabled,
        [`${prefixCls}-error`]: actualError,
        [`${prefixCls}-error-text`]: actualError && this.actualErrorDisplayType === 'text',
        [`${prefixCls}-top`]: align === 'top',
        [`${prefixCls}-middle`]: align === 'middle',
        [`${prefixCls}-bottom`]: align === 'bottom',
        [`${prefixCls}-section`]: section,
        [`${prefixCls}-extra-left`]: this.extraPosition === 'left',
        [`${prefixCls}-extra-center`]: this.extraPosition === 'center',
        [`${prefixCls}-extra-right`]: this.extraPosition === 'right'
      });

    const rippleCls = classNames(`${prefixCls}-ripple`, {
      [`${prefixCls}-ripple-animate`]: rippleClicked
    });

    const lineCls = classNames(`${prefixCls}-line`, {
      [`${prefixCls}-line-multiple`]: multipleLine,
      [`${prefixCls}-line-wrap`]: wrap
    });

    const arrowCls = classNames(`${prefixCls}-arrow`, {
      [`${prefixCls}-arrow-horizontal`]: arrow === 'horizontal',
      [`${prefixCls}-arrow-vertical`]: arrow === 'down' || arrow === 'up',
      [`${prefixCls}-arrow-vertical-up`]: arrow === 'up'
    });
    const content = (
      <div {...filterHTMLAttrs(this.$attrs)}
           onClick={this.onClick}
           class={wrapCls}>
        <div class={lineCls}>
          <div class={`${prefixCls}-content`}>
            {this.renderLabel()}
            {this.renderControl()}
            {this.renderExtra()}
          </div>
          {arrow && <div class={arrowCls}
                         aria-hidden="true"/>}
          {this.$slots.suffix || this.suffix ? <div class={this.prefixCls + '-suffix'}>
            {this.$slots.suffix?.() || this.suffix}
          </div> : null}
        </div>
        <div style={coverRippleStyle} class={rippleCls}/>
      </div>
    );
    const feedbackDisabled = disabled || !this.onClick || !this.touchFeedback || (this.list && !this.list.touchFeedback);
    return (
      <TouchFeedback
        disabled={feedbackDisabled}
        activeStyle={activeStyle}
        activeClassName={`${prefixCls}-active`}>
        {content}
      </TouchFeedback>
    );
  }
});

export default Item;
