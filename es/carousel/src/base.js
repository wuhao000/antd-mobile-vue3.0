import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { mergeProps as _mergeProps, createVNode as _createVNode } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { unwrapFragment } from '../../utils/vue';
import ExecutionEnvironment from 'exenv';
import requestAnimationFrame from 'raf';
import { defineComponent, onBeforeUnmount, onBeforeUpdate, onMounted, reactive, ref, watch } from 'vue';
import decorators from './decorators';
'use strict'; // from https://github.com/chenglou/tween-functions


function easeOutCirc(t, b, _c, d) {
  var c = _c - b;
  var t2 = t; // 差之毫厘，谬之千里

  return c * Math.sqrt(1 - (t2 = t2 / d - 1) * t2) + b;
}

function linear(t, b, _c, d) {
  var c = _c - b;
  return c * t / d + b;
}

function filterNotEmpty(nodes) {
  var n = [];
  nodes.forEach(function (it) {
    if (!(it instanceof Text) || it.textContent) {
      n.push(it);
    }
  });
  return n;
}

var DEFAULT_STACK_BEHAVIOR = 'ADDITIVE';
var DEFAULT_DURATION = 300;
var DEFAULT_DELAY = 0;
var stackBehavior = {
  ADDITIVE: 'ADDITIVE',
  DESTRUCTIVE: 'DESTRUCTIVE'
};

var addEvent = function addEvent(elem, type, eventHandle) {
  if (elem === null || typeof elem === 'undefined') {
    return;
  }

  if (elem.addEventListener.bind(elem)) {
    elem.addEventListener(type, eventHandle, false);
  } else if (elem.attachEvent) {
    elem.attachEvent('on' + type, eventHandle);
  } else {
    elem['on' + type] = eventHandle;
  }
};

var removeEvent = function removeEvent(elem, type, eventHandle) {
  if (elem === null || typeof elem === 'undefined') {
    return;
  }

  if (elem.removeEventListener.bind(elem)) {
    elem.removeEventListener(type, eventHandle, false);
  } else if (elem.detachEvent) {
    elem.detachEvent('on' + type, eventHandle);
  } else {
    elem['on' + type] = null;
  }
};

var CarouselBase = defineComponent({
  name: 'CarouselBase',
  inheritAttrs: false,
  props: {
    afterSlide: {
      type: Function,
      default: function _default() {
        return function () {};
      }
    },
    autoplay: {
      type: Boolean,
      default: false
    },
    resetAutoplay: {
      type: Boolean,
      default: true
    },
    swipeSpeed: {
      type: Number,
      default: 12
    },
    autoplayInterval: {
      type: Number,
      default: 3000
    },
    beforeSlide: {
      type: Function,
      default: function _default() {
        return function () {};
      }
    },
    cellAlign: {
      default: 'left'
    },
    cellSpacing: {
      default: 0
    },
    data: {
      default: function _default() {
        return function () {};
      }
    },
    decorators: {
      default: function _default() {
        return decorators;
      }
    },
    dragging: {
      type: Boolean,
      default: true
    },
    easing: {
      default: function _default() {
        return easeOutCirc;
      }
    },
    edgeEasing: {
      default: function _default() {
        return linear;
      }
    },
    framePadding: {
      default: '0px'
    },
    frameOverflow: {
      default: 'hidden'
    },
    initialSlideHeight: {
      type: Number
    },
    initialSlideWidth: {},
    slideIndex: {
      default: 0
    },
    slidesToShow: {
      default: 1
    },
    slidesToScroll: {
      type: [Number, String],
      default: 1
    },
    slideWidth: {
      default: 1
    },
    speed: {
      default: 500
    },
    swiping: {
      type: Boolean,
      default: true
    },
    vertical: {
      type: Boolean,
      default: false
    },
    width: {
      default: '100%'
    },
    wrapAround: {
      type: Boolean,
      default: false
    }
  },
  setup: function setup(props, _ref) {
    var _this = this;

    var emit = _ref.emit,
        slots = _ref.slots;
    var touchObject = ref({});
    var autoplayPaused = ref(null);
    var clickSafe = ref(true);
    var autoplayID = ref(null);

    var _rafID = ref(null);

    var state = reactive({
      slidesToShow: props.slidesToShow,
      slideHeight: 0,
      currentSlide: props.slideIndex,
      dragging: false,
      frameWidth: 0,
      left: 0,
      slideCount: 0,
      lidesToShow: 0,
      slidesToScroll: typeof props.slidesToScroll === 'number' ? props.slidesToScroll : 1,
      slideWidth: 0,
      top: 0,
      tweenQueue: []
    });
    watch(function () {
      return props.slideIndex;
    }, function (value) {
      if (value !== state.currentSlide) {
        goToSlide(value);
      }
    });
    watch(function () {
      return props.autoplay;
    }, function (value) {
      if (value) {
        startAutoplay();
      } else {
        stopAutoplay();
      }
    });

    var setState = function setState(object, callback) {
      Object.keys(object).forEach(function (key) {
        state[key] = object[key];
      });

      if (callback) {
        callback();
      }
    };

    var tweenState = function tweenState(path, _ref2) {
      var easing = _ref2.easing,
          duration = _ref2.duration,
          delay = _ref2.delay,
          beginValue = _ref2.beginValue,
          endValue = _ref2.endValue,
          onEnd = _ref2.onEnd,
          configSB = _ref2.stackBehavior;
      var cursor = state;
      var stateName; // see comment below on pash hash

      var pathHash;

      if (typeof path === 'string') {
        stateName = path;
        pathHash = path;
      } else {
        for (var i = 0; i < path.length - 1; i++) {
          cursor = cursor[path[i]];
        }

        stateName = path[path.length - 1];
        pathHash = path.join('|');
      } // see the reasoning for these defaults at the top of file


      var newConfig = {
        easing: easing,
        duration: duration == null ? DEFAULT_DURATION : duration,
        delay: delay == null ? DEFAULT_DELAY : delay,
        beginValue: beginValue == null ? cursor[stateName] : beginValue,
        endValue: endValue,
        onEnd: onEnd,
        stackBehavior: configSB || DEFAULT_STACK_BEHAVIOR
      };
      var newTweenQueue = state.tweenQueue;

      if (newConfig.stackBehavior === stackBehavior.DESTRUCTIVE) {
        newTweenQueue = state.tweenQueue.filter(function (item) {
          return item.pathHash !== pathHash;
        });
      } // we store path hash, so that during value retrieval we can use hash
      // comparison to find the path. See the kind of shitty thing you have to
      // do when you don't have value comparison for collections?


      newTweenQueue.push({
        pathHash: pathHash,
        config: newConfig,
        initTime: Date.now() + newConfig.delay
      }); // sorry for mutating. For perf reasons we don't want to deep clone.
      // guys, can we please all start using persistent collections so that
      // we can stop worrying about nonesense like this

      cursor[stateName] = newConfig.endValue;

      if (newTweenQueue.length === 1) {
        _rafID.value = requestAnimationFrame(_rafCb.bind(_this));
      } // this will also include the above mutated update


      state.tweenQueue = newTweenQueue;
    };

    var getTweeningValue = function getTweeningValue(path) {
      var tweeningValue;
      var pathHash;

      if (typeof path === 'string') {
        tweeningValue = state[path];
        pathHash = path;
      } else {
        tweeningValue = state;

        for (var i = 0; i < path.length; i++) {
          tweeningValue = tweeningValue[path[i]];
        }

        pathHash = path.join('|');
      }

      var now = Date.now();

      for (var _i = 0; _i < state.tweenQueue.length; _i++) {
        var _state$tweenQueue$_i = state.tweenQueue[_i],
            itemPathHash = _state$tweenQueue$_i.pathHash,
            initTime = _state$tweenQueue$_i.initTime,
            config = _state$tweenQueue$_i.config;

        if (itemPathHash !== pathHash) {
          continue;
        }

        var progressTime = now - initTime > config.duration ? config.duration : Math.max(0, now - initTime); // `now - initTime` can be negative if initTime is scheduled in the
        // future by a delay. In this case we take 0
        // if duration is 0, consider that as jumping to endValue directly. This
        // is needed because the easing functino might have undefined behavior for
        // duration = 0

        var easeValue = config.duration === 0 ? config.endValue : config.easing(progressTime, config.beginValue, config.endValue, config.duration // TODO: some funcs accept a 5th param
        );
        var contrib = easeValue - config.endValue;
        tweeningValue += contrib;
      }

      return tweeningValue;
    };

    var _rafCb = function _rafCb() {
      if (state.tweenQueue.length === 0) {
        return;
      }

      var now = Date.now();
      var newTweenQueue = [];

      for (var i = 0; i < state.tweenQueue.length; i++) {
        var item = state.tweenQueue[i];
        var initTime = item.initTime,
            config = item.config;

        if (now - initTime < config.duration) {
          newTweenQueue.push(item);
        } else {
          if (config.onEnd) {
            config.onEnd();
          }
        }
      } // onEnd might trigger a parent callback that removes this component
      // -1 means we've canceled it in componentWillUnmount


      if (_rafID.value === -1) {
        return;
      }

      state.tweenQueue = newTweenQueue;
      _rafID.value = requestAnimationFrame(_rafCb);
    };

    var getTouchEvents = function getTouchEvents() {
      if (props.swiping === false) {
        return null;
      }

      return {
        onTouchstart: function onTouchstart(e) {
          touchObject.value = {
            startX: e.touches[0].pageX,
            startY: e.touches[0].pageY
          };
          handleMouseOver();
        },
        onTouchmove: function onTouchmove(e) {
          var direction = swipeDirection(touchObject.value.startX, e.touches[0].pageX, touchObject.value.startY, e.touches[0].pageY);

          if (direction !== 0) {
            e.preventDefault();
          }

          var length = props.vertical ? Math.round(Math.sqrt(Math.pow(e.touches[0].pageY - touchObject.value.startY, 2))) : Math.round(Math.sqrt(Math.pow(e.touches[0].pageX - touchObject.value.startX, 2)));
          touchObject.value = {
            startX: touchObject.value.startX,
            startY: touchObject.value.startY,
            endX: e.touches[0].pageX,
            endY: e.touches[0].pageY,
            length: length,
            direction: direction
          };
          setState({
            left: props.vertical ? 0 : getTargetLeft(touchObject.value.length * touchObject.value.direction),
            top: props.vertical ? getTargetLeft(touchObject.value.length * touchObject.value.direction) : 0
          });
        },
        onTouchend: function onTouchend(e) {
          handleSwipe(e);
          handleMouseOut();
        },
        onTouchcancel: function onTouchcancel(e) {
          handleSwipe(e);
        }
      };
    };

    var getMouseEvents = function getMouseEvents() {
      if (props.dragging === false) {
        return null;
      }

      return {
        onMouseover: function onMouseover() {
          handleMouseOver();
        },
        onMouseout: function onMouseout() {
          handleMouseOut();
        },
        onMousedown: function onMousedown(e) {
          touchObject.value = {
            startX: e.clientX,
            startY: e.clientY
          };
          setState({
            dragging: true
          });
        },
        onMousemove: function onMousemove(e) {
          if (!state.dragging) {
            return;
          }

          var direction = swipeDirection(touchObject.value.startX, e.clientX, touchObject.value.startY, e.clientY);

          if (direction !== 0) {
            e.preventDefault();
          }

          var length = props.vertical ? Math.round(Math.sqrt(Math.pow(e.clientY - touchObject.value.startY, 2))) : Math.round(Math.sqrt(Math.pow(e.clientX - touchObject.value.startX, 2)));
          touchObject.value = {
            startX: touchObject.value.startX,
            startY: touchObject.value.startY,
            endX: e.clientX,
            endY: e.clientY,
            length: length,
            direction: direction
          };
          setState({
            left: props.vertical ? 0 : getTargetLeft(touchObject.value.length * touchObject.value.direction),
            top: props.vertical ? getTargetLeft(touchObject.value.length * touchObject.value.direction) : 0
          });
        },
        onMouseup: function onMouseup(e) {
          if (!state.dragging) {
            return;
          }

          handleSwipe(e);
        },
        onMouseleave: function onMouseleave(e) {
          if (!state.dragging) {
            return;
          }

          handleSwipe(e);
        }
      };
    };

    var handleMouseOver = function handleMouseOver() {
      if (props.autoplay) {
        autoplayPaused.value = true;
        stopAutoplay();
      }
    };

    var handleMouseOut = function handleMouseOut() {
      if (props.autoplay && autoplayPaused.value) {
        startAutoplay();
        autoplayPaused.value = null;
      }
    };

    var handleClick = function handleClick(e) {
      if (clickSafe.value === true) {
        e.preventDefault();
        e.stopPropagation();

        if (e.nativeEvent) {
          e.nativeEvent.stopPropagation();
        }
      }
    };

    var handleSwipe = function handleSwipe(_) {
      clickSafe.value = !!(typeof touchObject.value.length !== 'undefined' && touchObject.value.length > 44);
      var slidesToShow = props.slidesToShow;
      var slidesToScroll = props.slidesToScroll,
          swipeSpeed = props.swipeSpeed; // var slidesToShow = this.slidesToShow;

      if (slidesToScroll === 'auto') {
        state.lidesToShow = state.slidesToScroll;
      }

      if (childrenCount() > 1 && touchObject.value.length > state.slideWidth / slidesToShow / swipeSpeed) {
        if (touchObject.value.direction === 1) {
          if (state.currentSlide >= childrenCount() - slidesToShow && !props.wrapAround) {
            animateSlide(props.edgeEasing);
          } else {
            nextSlide();
          }
        } else if (touchObject.value.direction === -1) {
          if (state.currentSlide <= 0 && !props.wrapAround) {
            animateSlide(props.edgeEasing);
          } else {
            previousSlide();
          }
        }
      } else {
        goToSlide(state.currentSlide);
      }

      touchObject.value = {};
      state.dragging = false;
    };

    var swipeDirection = function swipeDirection(x1, x2, y1, y2) {
      var xDist = x1 - x2;
      var yDist = y1 - y2;
      var r = Math.atan2(yDist, xDist);
      var swipeAngle = Math.round(r * 180 / Math.PI);

      if (swipeAngle < 0) {
        swipeAngle = 360 - Math.abs(swipeAngle);
      }

      if (swipeAngle <= 45 && swipeAngle >= 0) {
        return 1;
      }

      if (swipeAngle <= 360 && swipeAngle >= 315) {
        return 1;
      }

      if (swipeAngle >= 135 && swipeAngle <= 225) {
        return -1;
      }

      if (props.vertical === true) {
        if (swipeAngle >= 35 && swipeAngle <= 135) {
          return 1;
        } else {
          return -1;
        }
      }

      return 0;
    };

    var autoplayIterator = function autoplayIterator() {
      if (props.wrapAround) {
        return nextSlide();
      }

      if (state.currentSlide !== state.slideCount - state.slidesToShow) {
        nextSlide();
      } else {
        stopAutoplay();
      }
    };

    var startAutoplay = function startAutoplay() {
      if (childrenCount() <= 1) {
        return;
      }

      autoplayID.value = setInterval(autoplayIterator, props.autoplayInterval);
    };

    var resetAutoplayFun = function resetAutoplayFun() {
      if (props.resetAutoplay && props.autoplay && !autoplayPaused.value) {
        // by warmhug
        stopAutoplay();
        startAutoplay();
      }
    };

    var stopAutoplay = function stopAutoplay() {
      if (autoplayID.value) {
        clearInterval(autoplayID.value);
      }
    };

    var goToSlide = function goToSlide(index) {
      var beforeSlide = props.beforeSlide,
          afterSlide = props.afterSlide;

      if (index >= childrenCount() || index < 0) {
        if (!props.wrapAround) {
          return;
        }

        if (index >= childrenCount()) {
          beforeSlide(state.currentSlide, 0);
          return setState({
            currentSlide: 0
          }, function () {
            animateSlide(null, null, getTargetLeft(null, index), function () {
              animateSlide(null, 0.01);
              afterSlide(0);
              resetAutoplayFun();
              setExternalData();
            });
          });
        } else {
          var endSlide = childrenCount() - state.slidesToScroll;
          beforeSlide(state.currentSlide, endSlide);
          return setState({
            currentSlide: endSlide
          }, function () {
            animateSlide(null, null, getTargetLeft(null, index), function () {
              animateSlide(null, 0.01);
              afterSlide(endSlide);
              resetAutoplayFun();
              setExternalData();
            });
          });
        }
      }

      beforeSlide(state.currentSlide, index);
      state.currentSlide = index;
      animateSlide();
      props.afterSlide(index);
      resetAutoplayFun();
      setExternalData();
    };

    var nextSlide = function nextSlide() {
      var count = childrenCount();
      var slidesToShow = props.slidesToShow;

      if (props.slidesToScroll === 'auto') {
        slidesToShow = state.slidesToScroll;
      }

      if (state.currentSlide >= count - slidesToShow && !props.wrapAround) {
        return;
      }

      if (props.wrapAround) {
        goToSlide(state.currentSlide + state.slidesToScroll);
      } else {
        if (props.slideWidth !== 1) {
          return goToSlide(state.currentSlide + state.slidesToScroll);
        }

        goToSlide(Math.min(state.currentSlide + state.slidesToScroll, count - slidesToShow));
      }
    };

    var previousSlide = function previousSlide() {
      if (state.currentSlide <= 0 && !props.wrapAround) {
        return;
      }

      if (props.wrapAround) {
        goToSlide(state.currentSlide - state.slidesToScroll);
      } else {
        goToSlide(Math.max(0, state.currentSlide - state.slidesToScroll));
      }
    };

    var animateSlide = function animateSlide(easing, duration, endValue, callback) {
      tweenState(props.vertical ? 'top' : 'left', {
        easing: easing || props.easing,
        duration: duration || props.speed,
        endValue: endValue || getTargetLeft(),
        delay: null,
        beginValue: null,
        onEnd: callback || null,
        stackBehavior: stackBehavior
      });
    };

    var getTargetLeft = function getTargetLeft(touchOffset, slide) {
      var offset;
      var target = slide || state.currentSlide;
      var cellSpacing = props.cellSpacing;

      switch (props.cellAlign) {
        case 'left':
          {
            offset = 0;
            offset -= cellSpacing * target;
            break;
          }

        case 'center':
          {
            offset = (state.frameWidth - state.slideWidth) / 2;
            offset -= cellSpacing * target;
            break;
          }

        case 'right':
          {
            offset = state.frameWidth - state.slideWidth;
            offset -= cellSpacing * target;
            break;
          }

        default:
          break;
      }

      var left = state.slideWidth * target;
      var lastSlide = state.currentSlide > 0 && target + state.slidesToScroll >= state.slideCount;

      if (lastSlide && props.slideWidth !== 1 && !props.wrapAround && props.slidesToScroll === 'auto') {
        left = state.slideWidth * state.slideCount - state.frameWidth;
        offset = 0;
        offset -= cellSpacing * (state.slideCount - 1);
      }

      offset -= touchOffset || 0;
      return (left - offset) * -1;
    };

    var bindEvents = function bindEvents() {
      if (ExecutionEnvironment.canUseDOM) {
        addEvent(window, 'resize', onResize.bind(_this));
        addEvent(document, 'readystatechange', onReadyStateChange.bind(_this));
      }
    };

    var onResize = function onResize() {
      setDimensions();
    };

    var onReadyStateChange = function onReadyStateChange() {
      setDimensions();
    };

    var unbindEvents = function unbindEvents() {
      if (ExecutionEnvironment.canUseDOM) {
        removeEvent(window, 'resize', onResize.bind(_this));
        removeEvent(document, 'readystatechange', onReadyStateChange.bind(_this));
      }
    };

    var formatChildren = function formatChildren(children) {
      var realChildren = unwrapFragment(children);
      var positionValue = props.vertical ? getTweeningValue('top') : getTweeningValue('left');
      return realChildren.map(function (child, index) {
        return _createVNode("li", {
          "class": "slider-slide",
          "style": getSlideStyles(index, positionValue),
          "key": index
        }, [child]);
      });
    };

    var setInitialDimensions = function setInitialDimensions() {
      var vertical = props.vertical,
          initialSlideHeight = props.initialSlideHeight,
          initialSlideWidth = props.initialSlideWidth,
          slidesToShow = props.slidesToShow,
          cellSpacing = props.cellSpacing;
      var slideWidth = vertical ? initialSlideHeight || 0 : initialSlideWidth || 0;
      var slideHeight = initialSlideHeight ? initialSlideHeight * slidesToShow : 0;
      var frameHeight = slideHeight + cellSpacing * (slidesToShow - 1);
      setState({
        slideHeight: slideHeight,
        frameWidth: vertical ? frameHeight : '100%',
        slideCount: childrenCount(),
        slideWidth: slideWidth
      }, function () {
        setLeft();
        setExternalData();
      });
    };

    var frameRef = ref(null);

    var setDimensions = function setDimensions() {
      var frameWidth;
      var frameHeight;
      var slideHeight;
      var slideWidth;
      var slidesToScroll = props.slidesToScroll;
      var frame = frameRef.value;
      var firstSlide = filterNotEmpty(frame && frame.childNodes[0].childNodes)[0];

      if (firstSlide) {
        firstSlide.style.height = 'auto';
        slideHeight = props.vertical ? firstSlide.offsetHeight * props.slidesToShow : firstSlide.offsetHeight;
      } else {
        slideHeight = 100;
      }

      if (typeof props.slideWidth !== 'number') {
        slideWidth = parseInt(props.slideWidth, 10);
      } else {
        if (props.vertical) {
          slideWidth = slideHeight / props.slidesToShow * props.slideWidth;
        } else {
          if (frame) {
            slideWidth = frame.offsetWidth / props.slidesToShow * props.slideWidth;
          }
        }
      }

      if (!props.vertical) {
        slideWidth -= props.cellSpacing * ((100 - 100 / props.slidesToShow) / 100);
      }

      frameHeight = slideHeight + props.cellSpacing * (props.slidesToShow - 1);

      if (frame) {
        frameWidth = props.vertical ? frameHeight : frame.offsetWidth;
      }

      if (props.slidesToScroll === 'auto') {
        state.slidesToScroll = Math.floor(frameWidth / (slideWidth + props.cellSpacing));
      }

      setState({
        slideHeight: slideHeight,
        frameWidth: frameWidth,
        slideWidth: slideWidth,
        slidesToScroll: slidesToScroll,
        left: props.vertical ? 0 : getTargetLeft(),
        top: props.vertical ? getTargetLeft() : 0
      }, function () {
        setLeft();
      });
    };

    var setLeft = function setLeft() {
      setState({
        left: props.vertical ? 0 : getTargetLeft(),
        top: props.vertical ? getTargetLeft() : 0
      });
    };

    var setExternalData = function setExternalData() {
      if (props.data) {
        props.data();
      }
    };

    var childrenCount = function childrenCount() {
      return unwrapFragment(slots.default()).length || 0;
    };

    var getListStyles = function getListStyles() {
      var listWidth = state.slideWidth * childrenCount();
      var cellSpacing = props.cellSpacing;
      var spacingOffset = cellSpacing * childrenCount();
      var transform = 'translate3d(' + getTweeningValue('left') + 'px, ' + getTweeningValue('top') + 'px, 0)';
      return {
        transform: transform,
        WebkitTransform: transform,
        msTransform: 'translate(' + getTweeningValue('left') + 'px, ' + getTweeningValue('top') + 'px)',
        position: 'relative',
        display: 'block',
        margin: props.vertical ? cellSpacing / 2 * -1 + 'px 0px' : '0px ' + cellSpacing / 2 * -1 + 'px',
        padding: 0,
        height: props.vertical ? listWidth + spacingOffset + 'px' : state.slideHeight + 'px',
        width: props.vertical ? 'auto' : listWidth + spacingOffset + 'px',
        cursor: state.dragging ? 'pointer' : 'inherit',
        boxSizing: 'border-box',
        MozBoxSizing: 'border-box'
      };
    };

    var getFrameStyles = function getFrameStyles() {
      return {
        position: 'relative',
        display: 'block',
        overflow: props.frameOverflow,
        height: props.vertical ? state.frameWidth + 'px' || 'initial' : 'auto',
        margin: props.framePadding,
        padding: 0,
        transform: 'translate3d(0, 0, 0)',
        WebkitTransform: 'translate3d(0, 0, 0)',
        msTransform: 'translate(0, 0)',
        boxSizing: 'border-box',
        MozBoxSizing: 'border-box'
      };
    };

    var getSlideStyles = function getSlideStyles(index, positionValue) {
      var targetPosition = getSlideTargetPosition(index, positionValue);
      var cellSpacing = props.cellSpacing;
      return {
        position: 'absolute',
        left: props.vertical ? 0 : targetPosition + 'px',
        top: props.vertical ? targetPosition + 'px' : 0,
        display: props.vertical ? 'block' : 'inline-block',
        listStyleType: 'none',
        verticalAlign: 'top',
        width: props.vertical ? '100%' : state.slideWidth + 'px',
        height: 'auto',
        boxSizing: 'border-box',
        MozBoxSizing: 'border-box',
        marginLeft: props.vertical ? 'auto' : cellSpacing / 2 + 'px',
        marginRight: props.vertical ? 'auto' : cellSpacing / 2 + 'px',
        marginTop: props.vertical ? cellSpacing / 2 + 'px' : 'auto',
        marginBottom: props.vertical ? cellSpacing / 2 + 'px' : 'auto'
      };
    };

    var getSlideTargetPosition = function getSlideTargetPosition(index, positionValue) {
      var slidesToShow = state.frameWidth / state.slideWidth;
      var targetPosition = (state.slideWidth + props.cellSpacing) * index;
      var end = (state.slideWidth + props.cellSpacing) * slidesToShow * -1;

      if (props.wrapAround) {
        var slidesBefore = Math.ceil(positionValue / state.slideWidth);

        if (state.slideCount - slidesBefore <= index) {
          return (state.slideWidth + props.cellSpacing) * (state.slideCount - index) * -1;
        }

        var slidesAfter = Math.ceil((Math.abs(positionValue) - Math.abs(end)) / state.slideWidth);

        if (state.slideWidth !== 1) {
          slidesAfter = Math.ceil((Math.abs(positionValue) - state.slideWidth) / state.slideWidth);
        }

        if (index <= slidesAfter - 1) {
          return (state.slideWidth + props.cellSpacing) * (state.slideCount + index);
        }
      }

      return targetPosition;
    };

    var getSliderStyles = function getSliderStyles() {
      return {
        position: 'relative',
        display: 'block',
        width: props.width,
        height: 'auto',
        boxSizing: 'border-box',
        MozBoxSizing: 'border-box',
        visibility: state.slideWidth ? 'visible' : 'hidden'
      };
    };

    var getStyleTagStyles = function getStyleTagStyles() {
      return '.slider-slide > img {width: 100%; display: block;}';
    };

    var getDecoratorStyles = function getDecoratorStyles(position) {
      switch (position) {
        case 'TopLeft':
          {
            return {
              position: 'absolute',
              top: 0,
              left: 0
            };
          }

        case 'TopCenter':
          {
            return {
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              WebkitTransform: 'translateX(-50%)',
              msTransform: 'translateX(-50%)'
            };
          }

        case 'TopRight':
          {
            return {
              position: 'absolute',
              top: 0,
              right: 0
            };
          }

        case 'CenterLeft':
          {
            return {
              position: 'absolute',
              top: '50%',
              left: 0,
              transform: 'translateY(-50%)',
              WebkitTransform: 'translateY(-50%)',
              msTransform: 'translateY(-50%)'
            };
          }

        case 'CenterCenter':
          {
            return {
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
              WebkitTransform: 'translate(-50%, -50%)',
              msTransform: 'translate(-50%, -50%)'
            };
          }

        case 'CenterRight':
          {
            return {
              position: 'absolute',
              top: '50%',
              right: 0,
              transform: 'translateY(-50%)',
              WebkitTransform: 'translateY(-50%)',
              msTransform: 'translateY(-50%)'
            };
          }

        case 'BottomLeft':
          {
            return {
              position: 'absolute',
              bottom: 0,
              left: 0
            };
          }

        case 'BottomCenter':
          {
            return {
              position: 'absolute',
              bottom: 0,
              width: '100%',
              textAlign: 'center'
            };
          }

        case 'BottomRight':
          {
            return {
              position: 'absolute',
              bottom: 0,
              right: 0
            };
          }

        default:
          {
            return {
              position: 'absolute',
              top: 0,
              left: 0
            };
          }
      }
    };

    {
      setInitialDimensions();
    }
    onMounted(function () {
      setDimensions();
      bindEvents();
      setExternalData();

      if (props.autoplay) {
        startAutoplay();
      }
    });
    onBeforeUnmount(function () {
      unbindEvents();
      stopAutoplay();
      requestAnimationFrame.cancel(_rafID.value);
      _rafID.value = -1;
    });
    onBeforeUpdate(function () {
      setDimensions();
    });
    return {
      state: state,
      childrenCount: childrenCount,
      getTouchEvents: getTouchEvents,
      getMouseEvents: getMouseEvents,
      getStyleTagStyles: getStyleTagStyles,
      handleClick: handleClick,
      getDecoratorStyles: getDecoratorStyles,
      nextSlide: nextSlide,
      previousSlide: previousSlide,
      goToSlide: goToSlide,
      getSliderStyles: getSliderStyles,
      formatChildren: formatChildren,
      getFrameStyles: getFrameStyles,
      getListStyles: getListStyles,
      setFrameRef: function setFrameRef(el) {
        frameRef.value = el;
      }
    };
  },
  render: function render() {
    var _this2 = this;

    this.state.slideCount = this.childrenCount();
    var children = this.childrenCount() > 1 ? this.formatChildren(this.$slots.default()) : this.$slots.default();
    return _createVNode("div", {
      "class": "slider",
      "ref": "slider",
      "style": _objectSpread({}, this.getSliderStyles())
    }, [_createVNode("div", _mergeProps({
      "class": "slider-frame",
      "ref": this.setFrameRef,
      "style": this.getFrameStyles()
    }, _objectSpread(_objectSpread({}, this.getTouchEvents()), this.getMouseEvents()), {
      "onClick": this.handleClick.bind(this)
    }), [_createVNode("ul", {
      "class": "slider-list",
      "ref": "list",
      "style": this.getListStyles()
    }, [children])]), this.decorators ? this.decorators.map(function (Decorator, index) {
      return _createVNode("div", {
        "style": _objectSpread(_objectSpread({}, _this2.getDecoratorStyles(Decorator.position)), Decorator.style || {}),
        "class": 'slider-decorator-' + index,
        "key": index
      }, [_createVNode(Decorator.component, {
        currentSlide: _this2.state.currentSlide,
        slideCount: _this2.state.slideCount,
        frameWidth: _this2.state.frameWidth,
        slideWidth: _this2.state.slideWidth,
        slidesToScroll: _this2.state.slidesToScroll,
        cellSpacing: _this2.cellSpacing,
        slidesToShow: _this2.slidesToShow,
        wrapAround: _this2.wrapAround,
        nextSlide: _this2.nextSlide,
        previousSlide: _this2.previousSlide,
        goToSlide: _this2.goToSlide
      }, null)]);
    }) : null]);
  }
});
export default CarouselBase;