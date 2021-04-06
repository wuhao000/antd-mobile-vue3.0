import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { createVNode as _createVNode } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import classNames from 'classnames';
import { computed, defineComponent, onBeforeUnmount, onMounted, onUpdated, reactive, ref, watch } from 'vue';
import PickerMixin from './picker-mixin';
import PickerProps from './picker-types';
var Picker = defineComponent({
  name: 'Picker',
  props: _objectSpread(_objectSpread({}, PickerProps), {}, {
    data: {
      type: Array,
      required: true
    },
    computeChildIndex: {
      type: Function
    },
    select: {
      type: Function
    },
    doScrollingComplete: {
      type: Function
    },
    noAnimate: {
      type: Boolean,
      default: false
    }
  }),
  setup: function setup(props, _ref) {
    var emit = _ref.emit;
    var itemHeight = ref(null);
    var scrollValue = ref(null);
    var state = reactive({});
    watch(function () {
      return props.value;
    }, function (value) {
      if (state.value !== value) {
        state.value = value;
        props.select(state.value, itemHeight.value, props.noAnimate ? scrollToWithoutAnimation : scrollTo);
      }
    });
    var rootRef = ref(null);
    var maskRef = ref(null);
    var contentRef = ref(null);
    var indicatorRef = ref(null);
    var scrollHandlers = computed(function () {
      var scrollY = -1;
      var lastY = 0;
      var startY = 0;
      var scrollDisabled = false;
      var isMoving = false;

      var setTransform = function setTransform(nodeStyle, value) {
        nodeStyle.transform = value;
        nodeStyle.webkitTransform = value;
      };

      var setTransition = function setTransition(nodeStyle, value) {
        nodeStyle.transition = value;
        nodeStyle.webkitTransition = value;
      };

      var scrollTo = function scrollTo(_x, y) {
        var time = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : .3;

        if (scrollY !== y) {
          scrollY = y;

          if (time && !props.noAnimate) {
            setTransition(contentRef.value.style, "cubic-bezier(0,0,0.2,1.15) ".concat(time, "s"));
          }

          setTransform(contentRef.value.style, "translate3d(0,".concat(-y, "px,0)"));
          setTimeout(function () {
            scrollingComplete();

            if (contentRef.value) {
              setTransition(contentRef.value.style, '');
            }
          }, +time * 1000);
        }
      };

      var Velocity = function () {
        var minInterval = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 30;
        var maxInterval = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
        var _time = 0;
        var _y = 0;
        var _velocity = 0;
        var recorder = {
          record: function record(y) {
            var now = +new Date();
            _velocity = (y - _y) / (now - _time);

            if (now - _time >= minInterval) {
              _velocity = now - _time <= maxInterval ? _velocity : 0;
              _y = y;
              _time = now;
            }
          },
          getVelocity: function getVelocity(y) {
            if (y !== _y) {
              recorder.record(y);
            }

            return _velocity;
          }
        };
        return recorder;
      }();

      var onFinish = function onFinish() {
        isMoving = false;
        var targetY = scrollY;
        var height = (props.data.length - 1) * itemHeight.value;
        var time = .3;
        var velocity = Velocity.getVelocity(targetY) * 4;

        if (velocity) {
          targetY = velocity * 40 + targetY;
          time = Math.abs(velocity) * .1;
        }

        if (targetY % itemHeight.value !== 0) {
          targetY = Math.round(targetY / itemHeight.value) * itemHeight.value;
        }

        if (targetY < 0) {
          targetY = 0;
        } else if (targetY > height) {
          targetY = height;
        }

        scrollTo(0, targetY, time < .3 ? .3 : time);
        onScrollChange();
      };

      var onStart = function onStart(y) {
        if (scrollDisabled) {
          return;
        }

        isMoving = true;
        startY = y;
        lastY = scrollY;
      };

      var onMove = function onMove(y) {
        if (scrollDisabled || !isMoving) {
          return;
        }

        scrollY = lastY - y + startY;
        Velocity.record(scrollY);
        onScrollChange();
        setTransform(contentRef.value.style, "translate3d(0,".concat(-scrollY, "px,0)"));
      };

      return {
        touchstart: function touchstart(evt) {
          return onStart(evt.touches[0].pageY);
        },
        mousedown: function mousedown(evt) {
          return onStart(evt.pageY);
        },
        touchmove: function touchmove(evt) {
          evt.preventDefault();
          onMove(evt.touches[0].pageY);
        },
        mousemove: function mousemove(evt) {
          evt.preventDefault();
          onMove(evt.pageY);
        },
        touchend: function touchend() {
          return onFinish();
        },
        touchcancel: function touchcancel() {
          return onFinish();
        },
        mouseup: function mouseup() {
          return onFinish();
        },
        getValue: function getValue() {
          return scrollY;
        },
        scrollTo: scrollTo,
        setDisabled: function setDisabled() {
          var disabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
          scrollDisabled = disabled;
        }
      };
    });
    onBeforeUnmount(function () {
      Object.keys(scrollHandlers.value).forEach(function (key) {
        if (key.indexOf('touch') === 0 || key.indexOf('mouse') === 0) {
          rootRef.value.removeEventListener(key, scrollHandlers.value[key]);
        }
      });
    });

    var scrollTo = function scrollTo(top) {
      scrollHandlers.value.scrollTo(0, top);
    };

    var scrollToWithoutAnimation = function scrollToWithoutAnimation(top) {
      scrollHandlers.value.scrollTo(0, top, 0);
    };

    var fireValueChange = function fireValueChange(value) {
      if (value !== state.value) {
        if (props.value === undefined) {
          state.value = value;
        }

        emit('update:value', value);
      }
    };

    var onScrollChange = function onScrollChange() {
      var top = scrollHandlers.value.getValue();

      if (top >= 0) {
        var index = props.computeChildIndex(top, itemHeight.value, props.data.length);

        if (scrollValue.value !== index) {
          scrollValue.value = index;
          var child = props.data[index];
          emit('scroll-change', child.value);
        }
      }
    };

    var scrollingComplete = function scrollingComplete() {
      var top = scrollHandlers.value.getValue();

      if (top >= 0) {
        props.doScrollingComplete(top, itemHeight.value, fireValueChange);
      }
    };

    {
      var valueState;
      var value = props.value,
          defaultValue = props.defaultValue;

      if (value !== undefined) {
        valueState = value;
      } else if (defaultValue !== undefined) {
        valueState = defaultValue;
      } else {
        valueState = props.data[0] && props.data[0].value;
      }

      state.value = valueState;
    }
    onMounted(function () {
      var rootHeight = rootRef.value.clientHeight; // https://github.com/react-component/m-picker/issues/18

      var itemHeightValue = itemHeight.value = indicatorRef.value.clientHeight;
      var num = Math.floor(rootHeight / itemHeightValue);

      if (num % 2 === 0) {
        num--;
      }

      num--;
      num /= 2;
      contentRef.value.style.padding = "".concat(itemHeightValue * num, "px 0");
      indicatorRef.value.style.top = "".concat(itemHeightValue * num, "px");
      maskRef.value.style.backgroundSize = "100% ".concat(itemHeightValue * num, "px");
      scrollHandlers.value.setDisabled(props.disabled);
      props.select(state.value, itemHeight.value, scrollTo);
      var passiveSupported = false;

      try {
        var options = Object.defineProperty({}, 'passive', {
          get: function get() {
            passiveSupported = true;
          }
        });
        window.addEventListener('test', null, options);
      } catch (err) {}

      var willPreventDefault = passiveSupported ? {
        passive: false
      } : false;
      var willNotPreventDefault = passiveSupported ? {
        passive: true
      } : false;
      Object.keys(scrollHandlers.value).forEach(function (key) {
        if (key.indexOf('touch') === 0 || key.indexOf('mouse') === 0) {
          var pd = key.indexOf('move') >= 0 ? willPreventDefault : willNotPreventDefault;
          rootRef.value.addEventListener(key, scrollHandlers.value[key], pd);
        }
      });
    });
    onUpdated(function () {
      props.select(state.value, itemHeight.value, scrollToWithoutAnimation);
      scrollHandlers.value.setDisabled(props.disabled);
    });
    return {
      setRootRef: function setRootRef(el) {
        rootRef.value = el;
      },
      setMaskRef: function setMaskRef(el) {
        maskRef.value = el;
      },
      setContentRef: function setContentRef(el) {
        contentRef.value = el;
      },
      setIndicatorRef: function setIndicatorRef(el) {
        indicatorRef.value = el;
      },
      state: state
    };
  },
  render: function render() {
    var _this$$props = this.$props,
        prefixCls = _this$$props.prefixCls,
        itemStyle = _this$$props.itemStyle,
        indicatorStyle = _this$$props.indicatorStyle,
        _this$$props$indicato = _this$$props.indicatorClassName,
        indicatorClassName = _this$$props$indicato === void 0 ? '' : _this$$props$indicato;
    var stateValue = this.state.value;
    var itemClassName = "".concat(prefixCls, "-item");
    var selectedItemClassName = "".concat(itemClassName, " ").concat(prefixCls, "-item-selected");

    var map = function map(item) {
      var style = item.style,
          value = item.value,
          label = item.label,
          _item$class = item.class,
          className = _item$class === void 0 ? '' : _item$class;
      return _createVNode("div", {
        "style": _objectSpread(_objectSpread({}, itemStyle), style),
        "class": "".concat(stateValue === value ? selectedItemClassName : itemClassName, " ").concat(className),
        "key": value
      }, [label]);
    };

    var items = this.data.map(map);

    var pickerCls = _defineProperty({}, prefixCls, true);

    return _createVNode("div", {
      "class": classNames(pickerCls),
      "ref": this.setRootRef
    }, [_createVNode("div", {
      "class": "".concat(prefixCls, "-mask"),
      "ref": this.setMaskRef
    }, null), _createVNode("div", {
      "class": "".concat(prefixCls, "-indicator ").concat(indicatorClassName),
      "ref": this.setIndicatorRef,
      "style": indicatorStyle
    }, null), _createVNode("div", {
      "class": "".concat(prefixCls, "-content"),
      "ref": this.setContentRef
    }, [items])]);
  }
});
export default PickerMixin(Picker);