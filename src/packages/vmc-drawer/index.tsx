import classNames from 'classnames';
import {computed, defineComponent, onMounted, onUpdated, PropType, reactive, ref} from 'vue';
import {getPanDirection} from '../tabs/src';
import {setPxStyle} from '../tabs/src/utils';
import {IGestureStatus} from '../vmc-gesture';

function getOffset(ele) {
  let el = ele;
  let _x = 0;
  let _y = 0;
  while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
    _x += el.offsetLeft - el.scrollLeft;
    _y += el.offsetTop - el.scrollTop;
    el = el.offsetParent;
  }
  return {top: _y, left: _x};
}

const CANCEL_DISTANCE_ON_SCROLL = 20;


const Drawer = defineComponent({
  name: 'Drawer',
  inheritAttrs: false,
  props: {
    prefixCls: {
      type: String as PropType<string>,
      default: 'rmc-drawer'
    },
    sidebarStyle: {
      type: Object as PropType<any>,
      default: () => {
        return {};
      }
    },
    contentStyle: {
      type: Object as PropType<any>,
      default: () => {
        return {};
      }
    },
    overlayStyle: {
      type: Object as PropType<any>,
      default: () => {
        return {};
      }
    },
    dragHandleStyle: {
      type: Object as PropType<any>,
      default: () => {
        return {};
      }
    },
    sidebar: {
      type: Object as PropType<any>
    },
    docked: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    open: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    transitions: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    touch: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    enableDragHandle: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    position: {
      type: String as PropType<'left' | 'right' | 'top' | 'bottom'>,
      default: 'left'
    },
    dragToggleDistance: {
      type: Number as PropType<number>,
      default: 30
    }
  },
  setup(props, {emit}) {
    const state = reactive({
      // the detected width of the sidebar in pixels
      sidebarWidth: 0,
      sidebarHeight: 0,
      sidebarTop: 0,
      dragHandleTop: 0,

      // keep track of touching params
      touchIdentifier: null,
      touchStartX: null,
      touchStartY: null,
      touchCurrentX: null,
      touchCurrentY: null,

      // if touch is supported by the browser
      touchSupported: typeof window === 'object' && 'ontouchstart' in window,
      notTouch: true
    });
    const isMoving = ref(false);
    const sidebarRef = ref(null);
    const dragHandleRef = ref(null);

    const contentRef = computed(() => contentRef.value);
    const overlayRef = computed(() => {
      return overlayRef.value;
    });
    const onPan = computed(() => {
      let lastOffset: number | string = 0;
      let finalOffset = 0;
      let panDirection: string;

      const getLastOffset = () => {
        let offset = +`${lastOffset}`.replace('%', '');
        if (`${lastOffset}`.indexOf('%') >= 0) {
          offset /= 100;
          offset *= overlayRef.value.clientWidth;
        }
        return offset;
      };

      return {
        onPanStart: (status: IGestureStatus) => {
          panDirection = getPanDirection(status.direction);
          isMoving.value = true;
        },
        onPanMove: (status: IGestureStatus) => {
          if (!status.moveStatus) {
            return;
          }
          let offset = getLastOffset();
          offset += panDirection === 'vertical' ? 0 : status.moveStatus.x;
          const canScrollOffset =
              -overlayRef.value.scrollWidth + overlayRef.value.clientWidth;
          offset = Math.min(offset, 0);
          offset = Math.max(offset, canScrollOffset);
          setPxStyle(overlayRef.value, offset, 'px', false, false);
          finalOffset = offset;
        },

        onPanEnd: () => {
          lastOffset = finalOffset;
          // const offsetIndex = this.getOffsetIndex(finalOffset, this.overlayRef.clientWidth);
          isMoving.value = false;
        },
        setCurrentOffset: (offset: number | string) => lastOffset = offset
      };
    });
    const onOverlayClicked = () => {
      if (props.open) {
        // see https://github.com/react-component/drawer/issues/9
        setTimeout(() => {
          emit('open', false, {overlayClicked: true});
        }, 0);
      }
    };
    const onTouchStart = ev => {
      // filter out if a user starts swiping with a second finger
      if (!isTouching()) {
        const touch = ev.targetTouches[0];
        state.touchIdentifier = state.notTouch ? touch.identifier : null;
        state.touchStartX = touch.clientX;
        state.touchStartY = touch.clientY;
        state.touchCurrentX = touch.clientX;
        state.touchCurrentY = touch.clientY;
      }
    };
    const onTouchMove = ev => {
      // ev.preventDefault(); // cannot touchmove with FastClick
      if (isTouching()) {
        for (let ind = 0; ind < ev.targetTouches.length; ind++) {
          // we only care about the finger that we are tracking
          if (ev.targetTouches[ind].identifier === state.touchIdentifier) {
            state.touchCurrentX = ev.targetTouches[ind].clientX;
            state.touchCurrentY = ev.targetTouches[ind].clientY;
            break;
          }
        }
      }
    };
    const onTouchEnd = () => {
      state.notTouch = false;
      if (isTouching()) {
        // trigger a change to open if sidebar has been dragged beyond dragToggleDistance
        const touchWidth = touchSidebarWidth();

        if (props.open && touchWidth < state.sidebarWidth - props.dragToggleDistance ||
            !props.open && touchWidth > props.dragToggleDistance) {
          emit('update:open', !props.open);
        }

        const touchHeight = touchSidebarHeight();

        if (props.open &&
            touchHeight < state.sidebarHeight - props.dragToggleDistance ||
            !props.open && touchHeight > props.dragToggleDistance) {
          emit('update:open', !props.open);
        }

        state.touchIdentifier = null;
        state.touchStartX = null;
        state.touchStartY = null;
        state.touchCurrentX = null;
        state.touchCurrentY = null;
      }
    };
    const onScroll = () => {
      if (isTouching() && inCancelDistanceOnScroll()) {
        state.touchIdentifier = null;
        state.touchStartX = null;
        state.touchStartY = null;
        state.touchCurrentX = null;
        state.touchCurrentY = null;
      }
    };
    const inCancelDistanceOnScroll = () => {
      let cancelDistanceOnScroll;
      switch (props.position) {
        case 'right':
          cancelDistanceOnScroll = Math.abs(state.touchCurrentX - state.touchStartX) <
              CANCEL_DISTANCE_ON_SCROLL;
          break;
        case 'bottom':
          cancelDistanceOnScroll = Math.abs(state.touchCurrentY - state.touchStartY) <
              CANCEL_DISTANCE_ON_SCROLL;
          break;
        case 'top':
          cancelDistanceOnScroll = Math.abs(state.touchStartY - state.touchCurrentY) <
              CANCEL_DISTANCE_ON_SCROLL;
          break;
        case 'left':
        default:
          cancelDistanceOnScroll = Math.abs(state.touchStartX - state.touchCurrentX) <
              CANCEL_DISTANCE_ON_SCROLL;
      }
      return cancelDistanceOnScroll;
    };
    const isTouching = () => {
      return state.touchIdentifier !== null;
    };
    const saveSidebarSize = () => {
      const sidebar = sidebarRef.value as HTMLElement;
      const width = sidebar.offsetWidth;
      const height = sidebar.offsetHeight;
      const sidebarTop = getOffset(sidebarRef.value as HTMLElement).top;
      const dragHandleTop = getOffset(dragHandleRef.value as HTMLElement).top;

      if (width !== state.sidebarWidth) {
        state.sidebarWidth = width;
      }
      if (height !== state.sidebarHeight) {
        state.sidebarHeight = height;
      }
      if (sidebarTop !== state.sidebarTop) {
        state.sidebarTop = sidebarTop;
      }
      if (dragHandleTop !== state.dragHandleTop) {
        state.dragHandleTop = dragHandleTop;
      }
    };
    const touchSidebarWidth = () => {
      // if the sidebar is open and start point of drag is inside the sidebar
      // we will only drag the distance they moved their finger
      // otherwise we will move the sidebar to be below the finger.
      if (props.position === 'right') {
        if (props.open && window.innerWidth - state.touchStartX < state.sidebarWidth) {
          if (state.touchCurrentX > state.touchStartX) {
            return state.sidebarWidth + state.touchStartX - state.touchCurrentX;
          }
          return state.sidebarWidth;
        }
        return Math.min(window.innerWidth - state.touchCurrentX, state.sidebarWidth);
      }

      if (props.position === 'left') {
        if (props.open && state.touchStartX < state.sidebarWidth) {
          if (state.touchCurrentX > state.touchStartX) {
            return state.sidebarWidth;
          }
          return state.sidebarWidth - state.touchStartX + state.touchCurrentX;
        }
        return Math.min(state.touchCurrentX, state.sidebarWidth);
      }
    };
    const touchSidebarHeight = () => {
      // if the sidebar is open and start point of drag is inside the sidebar
      // we will only drag the distance they moved their finger
      // otherwise we will move the sidebar to be below the finger.
      if (props.position === 'bottom') {
        if (props.open &&
            window.innerHeight - state.touchStartY < state.sidebarHeight) {
          if (state.touchCurrentY > state.touchStartY) {
            return state.sidebarHeight + state.touchStartY - state.touchCurrentY;
          }
          return state.sidebarHeight;
        }
        return Math.min(window.innerHeight - state.touchCurrentY, state.sidebarHeight);
      }

      if (props.position === 'top') {
        const touchStartOffsetY = state.touchStartY - state.sidebarTop;
        if (props.open && touchStartOffsetY < state.sidebarHeight) {
          if (state.touchCurrentY > state.touchStartY) {
            return state.sidebarHeight;
          }
          return state.sidebarHeight - state.touchStartY + state.touchCurrentY;
        }
        return Math.min(state.touchCurrentY - state.dragHandleTop,
            state.sidebarHeight);
      }
    };
    const renderStyle = ({sidebarStyle = null, isTouching = null, overlayStyle = null, contentStyle = null}) => {
      if (props.position === 'right' || props.position === 'left') {
        sidebarStyle.transform = `translateX(0%)`;
        sidebarStyle.WebkitTransform = `translateX(0%)`;
        if (isTouching) {
          const percentage = touchSidebarWidth() / state.sidebarWidth;
          // slide open to what we dragged
          if (props.position === 'right') {
            sidebarStyle.transform = `translateX(${(1 - percentage) * 100}%)`;
            sidebarStyle.WebkitTransform = `translateX(${(1 - percentage) * 100}%)`;
          }
          if (props.position === 'left') {
            sidebarStyle.transform = `translateX(-${(1 - percentage) * 100}%)`;
            sidebarStyle.WebkitTransform = `translateX(-${(1 - percentage) * 100}%)`;
          }
          // fade overlay to match distance of drag
          overlayStyle.opacity = percentage;
          overlayStyle.visibility = 'visible';
        }
        if (contentStyle) {
          contentStyle[props.position] = `${state.sidebarWidth}px`;
        }
      }
      if (props.position === 'top' || props.position === 'bottom') {
        sidebarStyle.transform = `translateY(0%)`;
        sidebarStyle.WebkitTransform = `translateY(0%)`;
        if (isTouching) {
          const percentage = touchSidebarHeight() / state.sidebarHeight;
          // slide open to what we dragged
          if (props.position === 'bottom') {
            sidebarStyle.transform = `translateY(${(1 - percentage) * 100}%)`;
            sidebarStyle.WebkitTransform = `translateY(${(1 - percentage) * 100}%)`;
          }
          if (props.position === 'top') {
            sidebarStyle.transform = `translateY(-${(1 - percentage) * 100}%)`;
            sidebarStyle.WebkitTransform = `translateY(-${(1 - percentage) * 100}%)`;
          }
          // fade overlay to match distance of drag
          overlayStyle.opacity = percentage;
          overlayStyle.visibility = 'visible';
        }
        if (contentStyle) {
          contentStyle[props.position] = `${state.sidebarHeight}px`;
        }
      }
    };
    onMounted(() => {
      saveSidebarSize();
    });
    onUpdated(() => {
      // filter out the updates when we're touching
      if (!isTouching()) {
        saveSidebarSize();
      }
    });
    return {
      setSidebar(el) {
        sidebarRef.value = el;
      },
      setDragHandle(el) {
        dragHandleRef.value = el;
      },
      isTouching,
      renderStyle,
      state,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      onScroll,
      onOverlayClicked
    };
  },
  render() {
    const {
      prefixCls, position, transitions,
      touch, enableDragHandle, sidebar, docked, open
    } = this.$props;

    const sidebarStyle: any = {...this.sidebarStyle};
    const contentStyle: any = {...this.contentStyle};
    const overlayStyle: any = {...this.overlayStyle};

    const rootCls = {
      [prefixCls]: true,
      [`${prefixCls}-${position}`]: true
    };
    const rootProps: any = {
      style: this.$attrs.style ?? {}
    };
    const isTouching = this.isTouching();

    if (isTouching) {
      this.renderStyle({sidebarStyle, isTouching: true, overlayStyle});
    } else if (this.docked) {
      if (this.open) {
        rootCls[`${prefixCls}-docked`] = true;
        this.renderStyle({sidebarStyle, contentStyle});
      }
    } else if (this.open && !docked) {
      rootCls[`${prefixCls}-open`] = true;
      this.renderStyle({sidebarStyle});
      overlayStyle.opacity = 1;
      overlayStyle.visibility = 'visible';
    }

    if (isTouching || !transitions) {
      sidebarStyle.transition = undefined;
      sidebarStyle.webkitTransition = undefined;
      contentStyle.transition = undefined;
      overlayStyle.transition = undefined;
    }

    let dragHandle = null;
    if (this.state.touchSupported && touch) {
      if (open) {
        rootProps.onTouchstart = (ev) => {
          this.state.notTouch = true;
          this.onTouchStart(ev);
        };
        rootProps.onTouchmove = this.onTouchMove;
        rootProps.onTouchend = this.onTouchEnd;
        rootProps.onTouchcancel = this.onTouchEnd;
        rootProps.onScroll = this.onScroll;
      } else if (enableDragHandle) {
        dragHandle = (
            <div class={`${prefixCls}-draghandle`} style={this.dragHandleStyle}
                 onTouchstart={this.onTouchStart.bind(this)} onTouchmove={this.onTouchMove.bind(this)}
                 onTouchend={this.onTouchEnd.bind(this)} onTouchcancel={this.onTouchEnd.bind(this)}
                 ref={this.setDragHandle}
            />);
      }
    }
    return (
        <div class={classNames(rootCls)}
             {...rootProps}>
          <div class={`${prefixCls}-sidebar`} style={sidebarStyle}
               ref={this.setSidebar}>
            {sidebar}
          </div>
          <div class={`${prefixCls}-overlay`}
               style={overlayStyle}
               role="presentation"
               ref="overlay"
               onClick={this.onOverlayClicked}
          />
          <div class={`${prefixCls}-content`} style={contentStyle}
               ref="content">
            {dragHandle}
            {this.$slots.default?.()}
          </div>
        </div>
    );
  }
});
export default Drawer;
