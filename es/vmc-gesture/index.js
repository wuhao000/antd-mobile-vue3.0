import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/* tslint:disable:no-console */
import { cloneVNode, defineComponent, ref } from 'vue';
import { DIRECTION_ALL, DIRECTION_HORIZONTAL, DIRECTION_VERTICAL, PRESS } from './config';
import { calcMoveStatus, calcMutliFingerStatus, calcRotation, getDirectionEventName, getEventName, getMovingDirection, now, shouldTriggerDirection, shouldTriggerSwipe } from './util';
var directionMap = {
  all: DIRECTION_ALL,
  vertical: DIRECTION_VERTICAL,
  horizontal: DIRECTION_HORIZONTAL
};
var Gesture = defineComponent({
  name: 'Gesture',
  props: {
    enableRotate: {
      type: Boolean,
      default: false
    },
    enablePinch: {
      type: Boolean,
      default: false
    },
    direction: {
      type: String,
      default: 'all'
    },
    onPinch: {},
    onPinchStart: {},
    onPinchMove: {},
    onPinchEnd: {},
    onPinchCancel: {},
    onPinchIn: {},
    onPinchOut: {},
    onRotate: {},
    onRotateStart: {},
    onRotateMove: {},
    onRotateEnd: {},
    onRotateCancel: {},
    onPan: {},
    onPanStart: {},
    onPanMove: {},
    onPanEnd: {},
    onPanCancel: {},
    onPanLeft: {},
    onPanRight: {},
    onPanUp: {},
    onPanDown: {},
    onTap: {},
    onPress: {},
    onPressUp: {},
    onSwipe: {},
    onSwipeLeft: {},
    onSwipeRight: {},
    onSwipeUp: {},
    onSwipeDown: {},
    onTouchStart: {},
    onTouchMove: {},
    onTouchEnd: {},
    onTouchCancel: {}
  },
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var gesture = ref(null);
    var event = ref(null);
    var pressTimer = ref(null);
    var directionSetting = ref(null);

    var triggerEvent = function triggerEvent(name) {
      var cb = props[name];

      if (typeof cb === 'function') {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        // always give user gesture object as first params first
        cb.apply(void 0, [getGestureState()].concat(args));
      }
    };

    var triggerCombineEvent = function triggerCombineEvent(mainEventName, eventStatus) {
      for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      triggerEvent.apply(void 0, [mainEventName].concat(args));
      triggerSubEvent.apply(void 0, [mainEventName, eventStatus].concat(args));
    };

    var triggerSubEvent = function triggerSubEvent(mainEventName, eventStatus) {
      if (eventStatus) {
        var subEventName = getEventName(mainEventName, eventStatus);

        for (var _len3 = arguments.length, args = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
          args[_key3 - 2] = arguments[_key3];
        }

        triggerEvent.apply(void 0, [subEventName].concat(args));
      }
    };

    var triggerPinchEvent = function triggerPinchEvent(mainEventName, eventStatus) {
      var scale = gesture.value.scale;

      if (eventStatus === 'move' && typeof scale === 'number') {
        if (scale > 1) {
          triggerEvent('onPinchOut');
        }

        if (scale < 1) {
          triggerEvent('onPinchIn');
        }
      }

      for (var _len4 = arguments.length, args = new Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
        args[_key4 - 2] = arguments[_key4];
      }

      triggerCombineEvent.apply(void 0, [mainEventName, eventStatus].concat(args));
    };

    var initPressTimer = function initPressTimer() {
      cleanPressTimer();
      pressTimer.value = setTimeout(function () {
        setGestureState({
          press: true
        });
        triggerEvent('onPress');
      }, PRESS.time);
    };

    var cleanPressTimer = function cleanPressTimer() {
      /* tslint:disable:no-unused-expression */
      pressTimer.value && clearTimeout(pressTimer.value);
    };

    var setGestureState = function setGestureState(params) {
      if (!gesture.value) {
        gesture.value = {};
      } // cache the previous touches


      if (gesture.value.touches) {
        gesture.value.preTouches = gesture.value.touches;
      }

      gesture.value = _objectSpread(_objectSpread({}, gesture.value), params);
    };

    var getGestureState = function getGestureState() {
      if (!gesture.value) {
        return gesture.value;
      } else {
        // shallow copy
        return _objectSpread({}, gesture.value);
      }
    };

    var cleanGestureState = function cleanGestureState() {
      delete gesture.value;
    };

    var getTouches = function getTouches(e) {
      return Array.prototype.slice.call(e.touches).map(function (item) {
        return {
          x: item.screenX,
          y: item.screenY
        };
      });
    };

    var triggerUserCb = function triggerUserCb(status, e) {
      var cbName = getEventName('onTouch', status);

      if (cbName in props && props[cbName]) {
        props[cbName](e);
      }
    };

    var _handleTouchStart = function _handleTouchStart(e) {
      triggerUserCb('start', e);
      event.value = e;

      if (e.touches.length > 1) {
        e.preventDefault();
      }

      initGestureStatus(e);
      initPressTimer();
      checkIfMultiTouchStart();
    };

    var initGestureStatus = function initGestureStatus(e) {
      cleanGestureState(); // store the gesture start state

      var startTouches = getTouches(e);
      var startTime = now();
      var startMutliFingerStatus = calcMutliFingerStatus(startTouches);
      setGestureState({
        startTime: startTime,
        startTouches: startTouches,
        startMutliFingerStatus: startMutliFingerStatus,

        /* copy for next time touch move cala convenient*/
        time: startTime,
        touches: startTouches,
        mutliFingerStatus: startMutliFingerStatus,
        srcEvent: event.value
      });
    };

    var checkIfMultiTouchStart = function checkIfMultiTouchStart() {
      var enablePinch = props.enablePinch,
          enableRotate = props.enableRotate;
      var touches = gesture.value.touches;

      if (touches.length > 1 && (enablePinch || enableRotate)) {
        if (enablePinch) {
          var startMutliFingerStatus = calcMutliFingerStatus(touches);
          setGestureState({
            startMutliFingerStatus: startMutliFingerStatus,

            /* init pinch status */
            pinch: true,
            scale: 1
          });
          triggerCombineEvent('onPinch', 'start');
        }

        if (enableRotate) {
          setGestureState({
            /* init rotate status */
            rotate: true,
            rotation: 0
          });
          triggerCombineEvent('onRotate', 'start');
        }
      }
    };

    var _handleTouchMove = function _handleTouchMove(e) {
      triggerUserCb('move', e);
      event.value = e;

      if (!gesture.value) {
        // sometimes weird happen: touchstart -> touchmove..touchmove.. --> touchend --> touchmove --> touchend
        // so we need to skip the unnormal event cycle after touchend
        return;
      } // not a long press


      cleanPressTimer();
      updateGestureStatus(e);
      checkIfSingleTouchMove();
      checkIfMultiTouchMove();
    };

    var checkIfMultiTouchMove = function checkIfMultiTouchMove() {
      var _ref2 = gesture.value,
          pinch = _ref2.pinch,
          rotate = _ref2.rotate,
          touches = _ref2.touches,
          startMutliFingerStatus = _ref2.startMutliFingerStatus,
          mutliFingerStatus = _ref2.mutliFingerStatus;

      if (!pinch && !rotate) {
        return;
      }

      if (touches.length < 2) {
        setGestureState({
          pinch: false,
          rotate: false
        }); // Todo: 2 finger -> 1 finger, wait to test this situation

        pinch && triggerCombineEvent('onPinch', 'cancel');
        rotate && triggerCombineEvent('onRotate', 'cancel');
        return;
      }

      if (pinch) {
        var scale = mutliFingerStatus.z / startMutliFingerStatus.z;
        setGestureState({
          scale: scale
        });
        triggerPinchEvent('onPinch', 'move');
      }

      if (rotate) {
        var rotation = calcRotation(startMutliFingerStatus, mutliFingerStatus);
        setGestureState({
          rotation: rotation
        });
        triggerCombineEvent('onRotate', 'move');
      }
    };

    var allowGesture = function allowGesture() {
      return shouldTriggerDirection(gesture.value.direction, directionSetting.value);
    };

    var checkIfSingleTouchMove = function checkIfSingleTouchMove() {
      var _gesture$value = gesture.value,
          pan = _gesture$value.pan,
          touches = _gesture$value.touches,
          moveStatus = _gesture$value.moveStatus,
          preTouches = _gesture$value.preTouches,
          _gesture$value$availa = _gesture$value.availablePan,
          availablePan = _gesture$value$availa === void 0 ? true : _gesture$value$availa;

      if (touches.length > 1) {
        setGestureState({
          pan: false
        }); // Todo: 1 finger -> 2 finger, wait to test this situation

        pan && triggerCombineEvent('onPan', 'cancel');
        return;
      } // add avilablePan condition to fix the case in scrolling, which will cause unavailable pan move.


      if (moveStatus && availablePan) {
        var direction = getMovingDirection(preTouches[0], touches[0]);
        setGestureState({
          direction: direction
        });
        var eventName = getDirectionEventName(direction);

        if (!allowGesture()) {
          // if the first move is unavailable, then judge all of remaining touch movings are also invalid.
          if (!pan) {
            setGestureState({
              availablePan: false
            });
          }

          return;
        }

        if (!pan) {
          triggerCombineEvent('onPan', 'start');
          setGestureState({
            pan: true,
            availablePan: true
          });
        } else {
          triggerCombineEvent('onPan', eventName);
          triggerSubEvent('onPan', 'move');
        }
      }
    };

    var checkIfMultiTouchEnd = function checkIfMultiTouchEnd(status) {
      var _gesture$value2 = gesture.value,
          pinch = _gesture$value2.pinch,
          rotate = _gesture$value2.rotate;

      if (pinch) {
        triggerCombineEvent('onPinch', status);
      }

      if (rotate) {
        triggerCombineEvent('onRotate', status);
      }
    };

    var updateGestureStatus = function updateGestureStatus(e) {
      var time = now();
      setGestureState({
        time: time
      });

      if (!e.touches || !e.touches.length) {
        return;
      }

      var _gesture$value3 = gesture.value,
          startTime = _gesture$value3.startTime,
          startTouches = _gesture$value3.startTouches,
          pinch = _gesture$value3.pinch,
          rotate = _gesture$value3.rotate;
      var touches = getTouches(e);
      var moveStatus = calcMoveStatus(startTouches, touches, time - startTime);
      var mutliFingerStatus;

      if (pinch || rotate) {
        mutliFingerStatus = calcMutliFingerStatus(touches);
      }

      setGestureState({
        /* update status snapshot */
        touches: touches,
        mutliFingerStatus: mutliFingerStatus,

        /* update duration status */
        moveStatus: moveStatus
      });
    };

    var _handleTouchEnd = function _handleTouchEnd(e) {
      triggerUserCb('end', e);
      event.value = e;

      if (!gesture.value) {
        return;
      }

      cleanPressTimer();
      updateGestureStatus(e);
      doSingleTouchEnd('end');
      checkIfMultiTouchEnd('end');
    };

    var _handleTouchCancel = function _handleTouchCancel(e) {
      triggerUserCb('cancel', e);
      event.value = e; // Todo: wait to test cancel case

      if (!gesture.value) {
        return;
      }

      cleanPressTimer();
      updateGestureStatus(e);
      doSingleTouchEnd('cancel');
      checkIfMultiTouchEnd('cancel');
    };

    var triggerAllowEvent = function triggerAllowEvent(type, status) {
      if (allowGesture()) {
        triggerCombineEvent(type, status);
      } else {
        triggerSubEvent(type, status);
      }
    };

    var doSingleTouchEnd = function doSingleTouchEnd(status) {
      var _gesture$value4 = gesture.value,
          moveStatus = _gesture$value4.moveStatus,
          pinch = _gesture$value4.pinch,
          rotate = _gesture$value4.rotate,
          press = _gesture$value4.press,
          pan = _gesture$value4.pan,
          direction = _gesture$value4.direction;

      if (pinch || rotate) {
        return;
      }

      if (moveStatus) {
        var z = moveStatus.z,
            velocity = moveStatus.velocity;
        var swipe = shouldTriggerSwipe(z, velocity);
        setGestureState({
          swipe: swipe
        });

        if (pan) {
          // pan need end, it's a process
          // sometimes, start with pan left, but end with pan right....
          triggerAllowEvent('onPan', status);
        }

        if (swipe) {
          var directionEvName = getDirectionEventName(direction); // swipe just need a direction, it's a endpoint

          triggerAllowEvent('onSwipe', directionEvName);
          return;
        }
      }

      if (press) {
        triggerEvent('onPressUp');
        return;
      }

      triggerEvent('onTap');
    };

    var componentWillUnmount = function componentWillUnmount() {
      cleanPressTimer();
    };

    var getTouchAction = function getTouchAction() {
      var enablePinch = props.enablePinch,
          enableRotate = props.enableRotate;

      if (enablePinch || enableRotate || directionSetting.value === DIRECTION_ALL) {
        return 'pan-x pan-y';
      }

      if (directionSetting.value === DIRECTION_VERTICAL) {
        return 'pan-x';
      }

      if (directionSetting.value === DIRECTION_HORIZONTAL) {
        return 'pan-y';
      }

      return 'auto';
    };

    {
      directionSetting.value = directionMap[props.direction];
    }
    return {
      getTouchAction: getTouchAction,
      _handleTouchStart: _handleTouchStart,
      _handleTouchMove: _handleTouchMove,
      _handleTouchCancel: _handleTouchCancel,
      _handleTouchEnd: _handleTouchEnd
    };
  },
  render: function render() {
    var children = this.$slots.default();
    var child = children.length >= 1 ? children[0] : null;
    var touchAction = this.getTouchAction();
    child.props = _extends({
      onTouchstart: this._handleTouchStart,
      onTouchmove: this._handleTouchMove,
      onTouchcancel: this._handleTouchCancel,
      onTouchend: this._handleTouchEnd
    }, child.props || {});
    return cloneVNode(child, {
      style: {
        touchAction: touchAction
      }
    });
  }
});
export default Gesture;