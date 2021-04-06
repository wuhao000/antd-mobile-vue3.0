import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import { mergeProps as _mergeProps, createVNode as _createVNode } from "vue";
import { filterHTMLAttrs } from '../../utils/dom';
import classNames from 'classnames';
import { computed, defineComponent, getCurrentInstance, onBeforeUnmount, onMounted, onUpdated, ref } from 'vue';
import Icon from '../../icon';
import { getScrollEventTarget, getScrollTop } from './util';

function setTransform(nodeStyle, value) {
  nodeStyle.transform = value;
  nodeStyle.webkitTransform = value;
  nodeStyle.MozTransform = value;
}

var isWebView = typeof navigator !== 'undefined' && /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent);
var DOWN = 'down';
var UP = 'up';
var INDICATOR = {
  activate: 'release',
  deactivate: 'pull',
  release: 'loading',
  finish: 'finish'
};
var supportsPassive = false;

try {
  var opts = Object.defineProperty({}, 'passive', {
    get: function get() {
      supportsPassive = true;
    }
  });
  window.addEventListener('test', null, opts);
} catch (e) {// empty
}

var willPreventDefault = supportsPassive ? {
  passive: false
} : false; // const willNotPreventDefault = supportsPassive ? { passive: true } : false;

export default defineComponent({
  inheritAttrs: false,
  name: 'PullToRefresh',
  props: {
    activateText: {
      type: String,
      default: '松开刷新'
    },
    deactivateText: {
      type: String,
      default: '取消刷新'
    },
    finishText: {
      type: String,
      default: '刷新完成'
    },
    getScrollContainer: {
      default: function _default() {
        return function () {
          return undefined;
        };
      }
    },
    direction: {
      type: String,
      default: DOWN
    },
    value: {},
    distanceToRefresh: {
      type: Number,
      default: 35
    },
    prefixCls: {
      type: String,
      default: 'am-pull-to-refresh'
    },
    damping: {
      type: Number,
      default: 80
    },
    indicatorHeight: {
      type: Number,
      default: 40
    },
    className: {}
  },
  setup: function setup(props, _ref) {
    var _this = this;

    var emit = _ref.emit;
    var currSt = ref('deactivate');
    var dragOnEdge = ref(false);
    var scrollEl = ref(null);

    var _to = ref(null);

    var _ScreenY = ref(null);

    var _startScreenY = ref(null);

    var _lastScreenY = ref(null);

    var _timer = ref(null);

    var _isMounted = ref(false);

    var containerRef = ref(null);
    var contentRef = ref(null);
    var indicator = computed(function () {
      return {
        activate: props.activateText,
        deactivate: props.deactivateText,
        release: _createVNode(Icon, {
          "type": 'loading'
        }, null),
        finish: props.finishText
      };
    });

    var triggerPullToRefresh = function triggerPullToRefresh() {
      // 在初始化时、用代码 自动 触发 pullToRefresh
      // 注意：当 direction 为 up 时，当 visible length < content length 时、则看不到效果
      // 添加this._isMounted的判断，否则组建一实例化，currSt就会是finish
      if (!dragOnEdge.value && _isMounted.value) {
        if (props.value) {
          if (props.direction === UP) {
            _lastScreenY.value = -props.distanceToRefresh - 1;
          }

          if (props.direction === DOWN) {
            _lastScreenY.value = props.distanceToRefresh + 1;
          } // change dom need after setState


          currSt.value = 'release';
          setContentStyle(_lastScreenY.value);
        } else {
          currSt.value = 'finish';
          reset();
        }
      }
    };

    var init = function init(ele) {
      if (!ele) {
        // like return in destroy fn ???!!
        return;
      }

      _to.value = {
        touchstart: onTouchStart.bind(_this).bind(_this, ele),
        touchmove: onTouchMove.bind(_this).bind(_this, ele),
        touchend: onTouchEnd.bind(_this).bind(_this, ele),
        touchcancel: onTouchEnd.bind(_this).bind(_this, ele)
      };
      Object.keys(_to.value).forEach(function (key) {
        ele.addEventListener(key, _to.value[key], willPreventDefault);
      });
    };

    var destroy = function destroy(ele) {
      if (!_to.value || !ele) {
        // componentWillUnmount fire before componentDidMount, like forceUpdate ???!!
        return;
      }

      Object.keys(_to.value).forEach(function (key) {
        ele.removeEventListener(key, _to.value[key]);
      });
    };

    var onTouchStart = function onTouchStart(_ele, e) {
      _ScreenY.value = _startScreenY.value = e.touches[0].screenY; // 一开始 value 为 true 时 this._lastScreenY 有值

      _lastScreenY.value = _lastScreenY.value || 0;
    };

    var isEdge = function isEdge() {
      var direction = props.direction;
      var container = props.getScrollContainer() || containerRef.value;

      if (container && container === document.body) {
        // In chrome61 `document.body.scrollTop` is invalid
        var scrollNode = document.scrollingElement ? document.scrollingElement : document.body;

        if (direction === UP) {
          return scrollNode.scrollHeight - scrollNode.scrollTop <= window.innerHeight;
        }

        if (direction === DOWN) {
          return scrollNode.scrollTop <= 0;
        }
      }

      var scrollTop = getScrollTop(scrollEl.value);

      if (direction === UP) {
        return scrollEl.value.scrollHeight - scrollTop === scrollEl.value.clientHeight;
      }

      if (direction === DOWN) {
        return scrollTop <= 0;
      }

      return undefined;
    };

    var dampingFunc = function dampingFunc(dy) {
      if (Math.abs(_lastScreenY.value) > props.damping) {
        return 0;
      }

      var ratio = Math.abs(_ScreenY.value - _startScreenY.value) / window.screen.height;
      return dy * (1 - ratio) * 0.6;
    };

    var onTouchMove = function onTouchMove(ele, e) {
      // 使用 pageY 对比有问题
      var _screenY = e.touches[0].screenY; // 拖动方向不符合的不处理

      if (props.direction === UP && _startScreenY.value < _screenY || props.direction === DOWN && _startScreenY.value > _screenY) {
        return;
      }

      if (isEdge()) {
        if (!dragOnEdge.value) {
          // 当用户开始往上滑的时候isEdge还是false的话，会导致this._ScreenY不是想要的，只有当isEdge为true时，再上滑，才有意义
          // 下面这行代码解决了上面这个问题
          _ScreenY.value = _startScreenY.value = e.touches[0].screenY;
          dragOnEdge.value = true;
        }

        e.preventDefault(); // add stopPropagation with fastclick will trigger content onClick event. why?
        // ref https://github.com/ant-design/ant-design-mobile/issues/2141
        // e.stopPropagation();

        var _diff = Math.round(_screenY - _ScreenY.value);

        _ScreenY.value = _screenY;
        _lastScreenY.value += dampingFunc(_diff);
        setContentStyle(_lastScreenY.value);

        if (Math.abs(_lastScreenY.value) < props.distanceToRefresh) {
          if (currSt.value !== 'deactivate') {
            currSt.value = 'deactivate';
          }
        } else {
          if (currSt.value === 'deactivate') {
            currSt.value = 'activate';
          }
        } // https://github.com/ant-design/ant-design-mobile/issues/573#issuecomment-339560829
        // iOS UIWebView issue, It seems no problem in WKWebView


        if (isWebView && e.changedTouches[0].clientY < 0) {
          onTouchEnd();
        }
      }
    };

    var onTouchEnd = function onTouchEnd() {
      if (dragOnEdge.value) {
        dragOnEdge.value = false;
      }

      if (currSt.value === 'activate') {
        currSt.value = 'release';
        _timer.value = setTimeout(function () {
          if (!props.value) {
            currSt.value = 'finish';
            reset();
          }

          _timer.value = undefined;
        }, 1000);
        setContentStyle(props.indicatorHeight);
        emit('refresh');
        emit('update:value', true);
      } else {
        reset();
      }
    };

    var reset = function reset() {
      _lastScreenY.value = 0;
      setContentStyle(0);
    };

    var setContentStyle = function setContentStyle(ty) {
      // todos: Why sometimes do not have `this.contentRef` ?
      if (contentRef.value) {
        setTransform(contentRef.value.style, "translate3d(0px,".concat(ty, "px,0)"));
      }
    };

    onUpdated(function () {
      if (!props.value) {
        // triggerPullToRefresh 需要尽可能减少 setState 次数
        triggerPullToRefresh();
      }
    });
    var instance = getCurrentInstance();
    onMounted(function () {
      scrollEl.value = getScrollEventTarget(instance.vnode.el); // `getScrollContainer` most likely return React.Node at the next tick. Need setTimeout

      setTimeout(function () {
        init(props.getScrollContainer() || containerRef.value);
        triggerPullToRefresh();
        _isMounted.value = true;
      });
    });
    onBeforeUnmount(function () {
      // Should have no setTimeout here!
      destroy(props.getScrollContainer() || containerRef.value);
    });
    return {
      setContainerRef: function setContainerRef(el) {
        containerRef.value = el;
      },
      setContentRef: function setContentRef(el) {
        contentRef.value = el;
      },
      indicator: indicator,
      dragOnEdge: dragOnEdge,
      currSt: currSt
    };
  },
  render: function render() {
    var _this2 = this;

    var prefixCls = this.prefixCls,
        getScrollContainer = this.getScrollContainer,
        direction = this.direction,
        value = this.value,
        indicator = this.indicator,
        distanceToRefresh = this.distanceToRefresh,
        restProps = _objectWithoutProperties(this, ["prefixCls", "getScrollContainer", "direction", "value", "indicator", "distanceToRefresh"]);

    var renderChildren = _createVNode("div", null, [this.$slots.default()]);

    var renderRefresh = function renderRefresh(cls) {
      var cla = classNames(cls, !_this2.dragOnEdge && "".concat(prefixCls, "-transition"));
      return _createVNode("div", {
        "class": "".concat(prefixCls, "-content-wrapper")
      }, [_createVNode("div", {
        "class": cla,
        "ref": _this2.setContentRef
      }, [direction === UP ? renderChildren : null, _createVNode("div", {
        "class": "".concat(prefixCls, "-indicator")
      }, [indicator[_this2.currSt] || INDICATOR[_this2.currSt]]), direction === DOWN ? renderChildren : null])]);
    };

    if (getScrollContainer()) {
      return renderRefresh("".concat(prefixCls, "-content ").concat(prefixCls, "-").concat(direction));
    }

    return _createVNode("div", _mergeProps({
      "ref": this.setContainerRef,
      "class": classNames(this.className, prefixCls, "".concat(prefixCls, "-").concat(direction))
    }, filterHTMLAttrs(restProps)), [renderRefresh("".concat(prefixCls, "-content"))]);
  }
});