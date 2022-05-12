import {
  computed,
  defineComponent,
  getCurrentInstance,
  nextTick,
  onBeforeUnmount,
  onMounted,
  PropType,
  Ref,
  ref,
  VNode,
  watch
} from 'vue';
import Badge from '../../badge';
import Popup from '../../popup';
import TouchFeedback from '../../vmc-feedback';

export interface ActionSheetMenu {
  badge: any;
  value: string | number;
  label: string | VNode;
  type: string;
}

export default defineComponent({
  install: null,
  name: 'MActionSheet',
  props: {
    prefixCls: {
      type: String as PropType<string>,
      default: 'am-action-sheet'
    },
    /**
     * 取消按钮文本
     */
    cancelText: {
      type: String as PropType<string>,
      default: '取消'
    },
    /**
     * 是否在点击遮罩层时关闭
     */
    closeOnClickingMask: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    /**
     * 是否在点击按钮后关闭
     */
    closeOnClickingMenu: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    menus: {
      type: [Object, Array] as PropType<any[]>,
      default: () => []
    },
    /**
     * 是否显示取消按钮
     */
    showCancel: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    theme: {
      type: String as PropType<string>,
      default: 'ios'
    },
    value: {
      type: Boolean as PropType<boolean>
    },
    type: {
      type: String as PropType<'normal' | 'share'>,
      default: 'normal'
    },
    title: {
      type: String as PropType<string>
    }
  },
  setup(props, {emit, slots}) {
    const $tabbar: Ref<Element> = ref(null);
    const hasHeaderSlot = ref(false);
    const show = ref(props.value || false);
    const iOSMenuRef = ref(null);
    watch(() => show.value, (val) => {
      emit('input', val);
      if (val) {
        fixIos(-1);
      } else {
        setTimeout(() => {
          fixIos(100);
        }, 200);
      }
    });
    watch(() => props.value, val => {
      show.value = val;
    }, {
      immediate: true
    });
    watch(() => show.value, value => {
      emit('update:value', value);
    });
    const listClassPrefix = computed(() => `${props.prefixCls}-button-list`);
    const cancelClick = () => {
      emit('input', false);
      show.value = false;
    };
    const emitEvent = (event, menu, item) => {
      if (event === 'click-menu' && !/.noop/.test(menu)) {
        let _item = item;
        if (typeof _item === 'object') {
          _item = JSON.parse(JSON.stringify(_item));
        }
        emit(event, menu, _item);
        emit(`${event}-${menu}`);
        props.closeOnClickingMenu && (show.value = false);
      }
    };
    const instance = getCurrentInstance();
    const fixIos = (zIndex) => {
      if (instance.vnode.el.parentNode && (instance.vnode.el.parentNode as Element).className.indexOf('v-transfer-dom') !== -1) {
        return;
      }
      if ($tabbar.value && /iphone/i.test(navigator.userAgent)) {
        ($tabbar.value as HTMLElement).style.zIndex = zIndex;
      }
    };
    const onMenuClick = (text: string | ActionSheetMenu, index) => {
      if (typeof text === 'string') {
        emitEvent('click-menu', index, text);
      } else {
        if (text.type !== 'disabled' && text.type !== 'info') {
          if (text.value || text.value === 0) {
            emitEvent('click-menu', text.value, text);
          } else {
            emitEvent('click-menu', '', text);
            show.value = false;
          }
        }
      }
    };
    const onTransitionEnd = () => {
      emit(show.value ? 'on-after-show' : 'on-after-hide');
    };
    const renderSheet = () => {
      if (props.type === 'share') {
        return <div class={`${props.prefixCls}-content"`}>
          <div class={`${props.prefixCls}-body`}>
            <div class={`${props.prefixCls}-share`}>
              <div class={`${props.prefixCls}-share-list`}>
                {
                  props.menus.map((item, index) => {
                    return <div
                      class={`${props.prefixCls}-share-list-item`}
                      role="button"
                      onClick={() => onMenuClick(item, index)}
                    >
                      <div class={`${props.prefixCls}-share-list-item-icon`}>{item.icon}</div>
                      <div class={`${props.prefixCls}-share-list-item-title`}>
                        {item.title}
                      </div>
                    </div>;
                  })
                }
              </div>
            </div>
          </div>
          {renderButtons()}
        </div>;
      } else {
        return <div ref={(el) => {
          iOSMenuRef.value = el;
        }}>
          <div class="am-action-sheet-content">
            <div class="am-action-sheet-body">
              <div>
                {renderTitle()}
                {renderButtons()}
              </div>
            </div>
          </div>
        </div>;
      }
    };
    const renderButtons = () => {
      return (<div class={listClassPrefix.value} role="group">
        {props.type === 'normal' ? props.menus.map((it, index) => renderMenu(it, index)) : null}
        {props.showCancel ? renderCancelButton() : null}
      </div>);
    };
    const renderTitle = () => {
      return props.title ? <div class={props.prefixCls + '-message'}>{props.title}</div> : null;
    };
    const renderMenu = (menu: string | ActionSheetMenu, index: number) => {
      const MTouchFeedback = TouchFeedback as any;
      const itemClassPrefix = listClassPrefix.value + '-item';
      const classes = {
        [itemClassPrefix]: true,
        [listClassPrefix.value + '-badge']: typeof menu === 'string' ? false : menu.badge
      };
      return <MTouchFeedback
        onClick={() => {
          onMenuClick(menu, index);
        }}
        activeClassName={itemClassPrefix + '-active'}>
        <div class={classes} role="button">
          <span class={itemClassPrefix + '-content'}>{typeof menu === 'string' ? menu : menu.label}</span>
          {typeof menu !== 'string' ? renderBadge(menu.badge) : null}
        </div>
      </MTouchFeedback>;
    };
    const renderBadge = (badge: boolean | any) => {
      if (badge) {
        const badgeProps = typeof badge === 'object' ? badge : {};
        return badge ? <Badge class="am-badge-not-a-wrapper" {...badgeProps}/> : null;
      }
    };
    const renderCancelButton = () => {
      const MTouchFeedback = TouchFeedback as any;
      const itemClassPrefix = listClassPrefix.value + '-item';
      const classes = itemClassPrefix + ` ${props.prefixCls}-cancel-button`;
      return <MTouchFeedback activeClassName={itemClassPrefix + '-active'}>
        <div class={classes} role="button"
             onClick={cancelClick}>
          <span class={itemClassPrefix + '-content'}>取消</span>
          <span class={props.prefixCls + '-cancel-button-mask'}/>
        </div>
      </MTouchFeedback>;
    };
    onMounted(() => {
      hasHeaderSlot.value = !!slots.header?.();
      nextTick(() => {
        $tabbar.value = document.querySelector('.weui-tabbar');
        iOSMenuRef.value && (iOSMenuRef.value as any).addEventListener('transitionend', onTransitionEnd);
      });
    });
    onBeforeUnmount(() => {
      fixIos(100);
      iOSMenuRef.value && (iOSMenuRef.value as any).removeEventListener('transitionend', onTransitionEnd);
    });

    return {
      cancelClick, renderSheet, show
    };
  },
  render() {
    const classes = `${this.prefixCls} ${this.prefixCls}-${this.type}`;
    return <Popup visible={this.show}
                  showTitle={false}
                  onCancel={this.cancelClick}>
      <div class={classes}>
        {this.renderSheet()}
      </div>
    </Popup>;
  }
});
