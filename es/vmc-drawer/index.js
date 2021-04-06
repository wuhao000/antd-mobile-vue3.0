import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _typeof from "@babel/runtime/helpers/typeof";
import { mergeProps as _mergeProps, createVNode as _createVNode } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import classNames from 'classnames';
import { computed, defineComponent, onMounted, onUpdated, reactive, ref } from 'vue';
import { getPanDirection } from '../tabs/src';
import { setPxStyle } from '../tabs/src/utils';

function getOffset(ele) {
  var el = ele;
  var _x = 0;
  var _y = 0;

  while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
    _x += el.offsetLeft - el.scrollLeft;
    _y += el.offsetTop - el.scrollTop;
    el = el.offsetParent;
  }

  return {
    top: _y,
    left: _x
  };
}

var CANCEL_DISTANCE_ON_SCROLL = 20;
var Drawer = defineComponent({
  inheritAttrs: false,
  name: 'Drawer',
  props: {
    prefixCls: {
      type: String,
      default: 'rmc-drawer'
    },
    sidebarStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    contentStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    overlayStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    dragHandleStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    sidebar: {
      type: Object
    },
    docked: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: false
    },
    transitions: {
      type: Boolean,
      default: true
    },
    touch: {
      type: Boolean,
      default: true
    },
    enableDragHandle: {
      type: Boolean,
      default: true
    },
    position: {
      type: String,
      default: 'left'
    },
    dragToggleDistance: {
      type: Number,
      default: 30
    }
  },
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var state = reactive({
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
      touchSupported: (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' && 'ontouchstart' in window,
      notTouch: true
    });
    var isMoving = ref(false);
    var sidebarRef = ref(null);
    var dragHandleRef = ref(null);
    var contentRef = computed(function () {
      return contentRef.value;
    });
    var overlayRef = computed(function () {
      return overlayRef.value;
    });
    var onPan = computed(function () {
      var lastOffset = 0;
      var finalOffset = 0;
      var panDirection;

      var getLastOffset = function getLastOffset() {
        var offset = +"".concat(lastOffset).replace('%', '');

        if ("".concat(lastOffset).indexOf('%') >= 0) {
          offset /= 100;
          offset *= overlayRef.value.clientWidth;
        }

        return offset;
      };

      return {
        onPanStart: function onPanStart(status) {
          panDirection = getPanDirection(status.direction);
          isMoving.value = true;
        },
        onPanMove: function onPanMove(status) {
          if (!status.moveStatus) {
            return;
          }

          var offset = getLastOffset();
          offset += panDirection === 'vertical' ? 0 : status.moveStatus.x;
          var canScrollOffset = -overlayRef.value.scrollWidth + overlayRef.value.clientWidth;
          offset = Math.min(offset, 0);
          offset = Math.max(offset, canScrollOffset);
          setPxStyle(overlayRef.value, offset, 'px', false, false);
          finalOffset = offset;
        },
        onPanEnd: function onPanEnd() {
          lastOffset = finalOffset; // const offsetIndex = this.getOffsetIndex(finalOffset, this.overlayRef.clientWidth);

          isMoving.value = false;
        },
        setCurrentOffset: function setCurrentOffset(offset) {
          return lastOffset = offset;
        }
      };
    });

    var onOverlayClicked = function onOverlayClicked() {
      if (props.visible) {
        // see https://github.com/react-component/drawer/issues/9
        setTimeout(function () {
          emit('open', false, {
            overlayClicked: true
          });
        }, 0);
      }
    };

    var onTouchStart = function onTouchStart(ev) {
      // filter out if a user starts swiping with a second finger
      if (!isTouching()) {
        var touch = ev.targetTouches[0];
        state.touchIdentifier = state.notTouch ? touch.identifier : null;
        state.touchStartX = touch.clientX;
        state.touchStartY = touch.clientY;
        state.touchCurrentX = touch.clientX;
        state.touchCurrentY = touch.clientY;
      }
    };

    var onTouchMove = function onTouchMove(ev) {
      // ev.preventDefault(); // cannot touchmove with FastClick
      if (isTouching()) {
        for (var ind = 0; ind < ev.targetTouches.length; ind++) {
          // we only care about the finger that we are tracking
          if (ev.targetTouches[ind].identifier === state.touchIdentifier) {
            state.touchCurrentX = ev.targetTouches[ind].clientX;
            state.touchCurrentY = ev.targetTouches[ind].clientY;
            break;
          }
        }
      }
    };

    var onTouchEnd = function onTouchEnd() {
      state.notTouch = false;

      if (isTouching()) {
        // trigger a change to open if sidebar has been dragged beyond dragToggleDistance
        var touchWidth = touchSidebarWidth();

        if (props.visible && touchWidth < state.sidebarWidth - props.dragToggleDistance || !props.visible && touchWidth > props.dragToggleDistance) {
          emit('update:visible', !props.visible);
        }

        var touchHeight = touchSidebarHeight();

        if (props.visible && touchHeight < state.sidebarHeight - props.dragToggleDistance || !props.visible && touchHeight > props.dragToggleDistance) {
          emit('update:visible', !props.visible);
        }

        state.touchIdentifier = null;
        state.touchStartX = null;
        state.touchStartY = null;
        state.touchCurrentX = null;
        state.touchCurrentY = null;
      }
    };

    var onScroll = function onScroll() {
      if (isTouching() && inCancelDistanceOnScroll()) {
        state.touchIdentifier = null;
        state.touchStartX = null;
        state.touchStartY = null;
        state.touchCurrentX = null;
        state.touchCurrentY = null;
      }
    };

    var inCancelDistanceOnScroll = function inCancelDistanceOnScroll() {
      var cancelDistanceOnScroll;

      switch (props.position) {
        case 'right':
          cancelDistanceOnScroll = Math.abs(state.touchCurrentX - state.touchStartX) < CANCEL_DISTANCE_ON_SCROLL;
          break;

        case 'bottom':
          cancelDistanceOnScroll = Math.abs(state.touchCurrentY - state.touchStartY) < CANCEL_DISTANCE_ON_SCROLL;
          break;

        case 'top':
          cancelDistanceOnScroll = Math.abs(state.touchStartY - state.touchCurrentY) < CANCEL_DISTANCE_ON_SCROLL;
          break;

        case 'left':
        default:
          cancelDistanceOnScroll = Math.abs(state.touchStartX - state.touchCurrentX) < CANCEL_DISTANCE_ON_SCROLL;
      }

      return cancelDistanceOnScroll;
    };

    var isTouching = function isTouching() {
      return state.touchIdentifier !== null;
    };

    var saveSidebarSize = function saveSidebarSize() {
      var sidebar = sidebarRef.value;
      var width = sidebar.offsetWidth;
      var height = sidebar.offsetHeight;
      var sidebarTop = getOffset(sidebarRef.value).top;
      var dragHandleTop = getOffset(dragHandleRef.value).top;

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

    var touchSidebarWidth = function touchSidebarWidth() {
      // if the sidebar is open and start point of drag is inside the sidebar
      // we will only drag the distance they moved their finger
      // otherwise we will move the sidebar to be below the finger.
      if (props.position === 'right') {
        if (props.visible && window.innerWidth - state.touchStartX < state.sidebarWidth) {
          if (state.touchCurrentX > state.touchStartX) {
            return state.sidebarWidth + state.touchStartX - state.touchCurrentX;
          }

          return state.sidebarWidth;
        }

        return Math.min(window.innerWidth - state.touchCurrentX, state.sidebarWidth);
      }

      if (props.position === 'left') {
        if (props.visible && state.touchStartX < state.sidebarWidth) {
          if (state.touchCurrentX > state.touchStartX) {
            return state.sidebarWidth;
          }

          return state.sidebarWidth - state.touchStartX + state.touchCurrentX;
        }

        return Math.min(state.touchCurrentX, state.sidebarWidth);
      }
    };

    var touchSidebarHeight = function touchSidebarHeight() {
      // if the sidebar is open and start point of drag is inside the sidebar
      // we will only drag the distance they moved their finger
      // otherwise we will move the sidebar to be below the finger.
      if (props.position === 'bottom') {
        if (props.visible && window.innerHeight - state.touchStartY < state.sidebarHeight) {
          if (state.touchCurrentY > state.touchStartY) {
            return state.sidebarHeight + state.touchStartY - state.touchCurrentY;
          }

          return state.sidebarHeight;
        }

        return Math.min(window.innerHeight - state.touchCurrentY, state.sidebarHeight);
      }

      if (props.position === 'top') {
        var touchStartOffsetY = state.touchStartY - state.sidebarTop;

        if (props.visible && touchStartOffsetY < state.sidebarHeight) {
          if (state.touchCurrentY > state.touchStartY) {
            return state.sidebarHeight;
          }

          return state.sidebarHeight - state.touchStartY + state.touchCurrentY;
        }

        return Math.min(state.touchCurrentY - state.dragHandleTop, state.sidebarHeight);
      }
    };

    var renderStyle = function renderStyle(_ref2) {
      var _ref2$sidebarStyle = _ref2.sidebarStyle,
          sidebarStyle = _ref2$sidebarStyle === void 0 ? null : _ref2$sidebarStyle,
          _ref2$isTouching = _ref2.isTouching,
          isTouching = _ref2$isTouching === void 0 ? null : _ref2$isTouching,
          _ref2$overlayStyle = _ref2.overlayStyle,
          overlayStyle = _ref2$overlayStyle === void 0 ? null : _ref2$overlayStyle,
          _ref2$contentStyle = _ref2.contentStyle,
          contentStyle = _ref2$contentStyle === void 0 ? null : _ref2$contentStyle;

      if (props.position === 'right' || props.position === 'left') {
        sidebarStyle.transform = "translateX(0%)";
        sidebarStyle.WebkitTransform = "translateX(0%)";

        if (isTouching) {
          var percentage = touchSidebarWidth() / state.sidebarWidth; // slide open to what we dragged

          if (props.position === 'right') {
            sidebarStyle.transform = "translateX(".concat((1 - percentage) * 100, "%)");
            sidebarStyle.WebkitTransform = "translateX(".concat((1 - percentage) * 100, "%)");
          }

          if (props.position === 'left') {
            sidebarStyle.transform = "translateX(-".concat((1 - percentage) * 100, "%)");
            sidebarStyle.WebkitTransform = "translateX(-".concat((1 - percentage) * 100, "%)");
          } // fade overlay to match distance of drag


          overlayStyle.opacity = percentage;
          overlayStyle.visibility = 'visible';
        }

        if (contentStyle) {
          contentStyle[props.position] = "".concat(state.sidebarWidth, "px");
        }
      }

      if (props.position === 'top' || props.position === 'bottom') {
        sidebarStyle.transform = "translateY(0%)";
        sidebarStyle.WebkitTransform = "translateY(0%)";

        if (isTouching) {
          var _percentage = touchSidebarHeight() / state.sidebarHeight; // slide open to what we dragged


          if (props.position === 'bottom') {
            sidebarStyle.transform = "translateY(".concat((1 - _percentage) * 100, "%)");
            sidebarStyle.WebkitTransform = "translateY(".concat((1 - _percentage) * 100, "%)");
          }

          if (props.position === 'top') {
            sidebarStyle.transform = "translateY(-".concat((1 - _percentage) * 100, "%)");
            sidebarStyle.WebkitTransform = "translateY(-".concat((1 - _percentage) * 100, "%)");
          } // fade overlay to match distance of drag


          overlayStyle.opacity = _percentage;
          overlayStyle.visibility = 'visible';
        }

        if (contentStyle) {
          contentStyle[props.position] = "".concat(state.sidebarHeight, "px");
        }
      }
    };

    onMounted(function () {
      saveSidebarSize();
    });
    onUpdated(function () {
      // filter out the updates when we're touching
      if (!isTouching()) {
        saveSidebarSize();
      }
    });
    return {
      setSidebar: function setSidebar(el) {
        sidebarRef.value = el;
      },
      setDragHandle: function setDragHandle(el) {
        dragHandleRef.value = el;
      },
      isTouching: isTouching,
      renderStyle: renderStyle,
      state: state,
      onTouchStart: onTouchStart,
      onTouchMove: onTouchMove,
      onTouchEnd: onTouchEnd,
      onScroll: onScroll,
      onOverlayClicked: onOverlayClicked
    };
  },
  render: function render() {
    var _rootCls,
        _this$$attrs$style,
        _this = this,
        _this$$slots$default,
        _this$$slots;

    var prefixCls = this.prefixCls,
        position = this.position,
        transitions = this.transitions,
        touch = this.touch,
        enableDragHandle = this.enableDragHandle,
        sidebar = this.sidebar,
        docked = this.docked,
        visible = this.visible;

    var sidebarStyle = _objectSpread({}, this.sidebarStyle);

    var contentStyle = _objectSpread({}, this.contentStyle);

    var overlayStyle = _objectSpread({}, this.overlayStyle);

    var rootCls = (_rootCls = {}, _defineProperty(_rootCls, prefixCls, true), _defineProperty(_rootCls, "".concat(prefixCls, "-").concat(position), true), _rootCls);
    var rootProps = {
      style: (_this$$attrs$style = this.$attrs.style) !== null && _this$$attrs$style !== void 0 ? _this$$attrs$style : {}
    };
    var isTouching = this.isTouching();

    if (isTouching) {
      this.renderStyle({
        sidebarStyle: sidebarStyle,
        isTouching: true,
        overlayStyle: overlayStyle
      });
    } else if (this.docked) {
      if (this.visible) {
        rootCls["".concat(prefixCls, "-docked")] = true;
        this.renderStyle({
          sidebarStyle: sidebarStyle,
          contentStyle: contentStyle
        });
      }
    } else if (this.visible && !docked) {
      rootCls["".concat(prefixCls, "-open")] = true;
      this.renderStyle({
        sidebarStyle: sidebarStyle
      });
      overlayStyle.opacity = 1;
      overlayStyle.visibility = 'visible';
    }

    if (isTouching || !transitions) {
      sidebarStyle.transition = undefined;
      sidebarStyle.webkitTransition = undefined;
      contentStyle.transition = undefined;
      overlayStyle.transition = undefined;
    }

    var dragHandle = null;

    if (this.state.touchSupported && touch) {
      if (open) {
        rootProps.onTouchstart = function (ev) {
          _this.state.notTouch = true;

          _this.onTouchStart(ev);
        };

        rootProps.onTouchmove = this.onTouchMove;
        rootProps.onTouchend = this.onTouchEnd;
        rootProps.onTouchcancel = this.onTouchEnd;
        rootProps.onScroll = this.onScroll;
      } else if (enableDragHandle) {
        dragHandle = _createVNode("div", {
          "class": "".concat(prefixCls, "-draghandle"),
          "style": this.dragHandleStyle,
          "onTouchstart": this.onTouchStart.bind(this),
          "onTouchmove": this.onTouchMove.bind(this),
          "onTouchend": this.onTouchEnd.bind(this),
          "onTouchcancel": this.onTouchEnd.bind(this),
          "ref": this.setDragHandle
        }, null);
      }
    }

    return _createVNode("div", _mergeProps({
      "class": classNames(rootCls)
    }, rootProps), [_createVNode("div", {
      "class": "".concat(prefixCls, "-sidebar"),
      "style": sidebarStyle,
      "ref": this.setSidebar
    }, [sidebar]), _createVNode("div", {
      "class": "".concat(prefixCls, "-overlay"),
      "style": overlayStyle,
      "role": "presentation",
      "ref": "overlay",
      "onClick": this.onOverlayClicked
    }, null), _createVNode("div", {
      "class": "".concat(prefixCls, "-content"),
      "style": contentStyle,
      "ref": "content"
    }, [dragHandle, (_this$$slots$default = (_this$$slots = this.$slots).default) === null || _this$$slots$default === void 0 ? void 0 : _this$$slots$default.call(_this$$slots)])]);
  }
});
export default Drawer;