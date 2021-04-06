import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { mergeProps as _mergeProps, createVNode as _createVNode } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { useDatePickerBase } from './date-picker-base';
import { computed, defineComponent, onMounted, ref } from 'vue';
import DatePickerProps from './date-picker-props';
import SingleMonth from './date/single-month';
import WeekPanel from './date/week-panel';
var DatePicker = defineComponent({
  name: 'DatePicker',
  props: _objectSpread(_objectSpread({}, DatePickerProps), {}, {
    displayMode: {
      type: Boolean,
      default: false
    }
  }),
  setup: function setup(props, _ref) {
    var emit = _ref.emit;

    var genMonthComponent = function genMonthComponent(data) {
      if (!data) {
        return;
      } // @ts-ignore


      return _createVNode(SingleMonth, {
        "key": data.title,
        "locale": props.locale || {},
        "monthData": data,
        "displayMode": props.displayMode,
        "rowSize": props.rowSize,
        "onCellClick": function onCellClick(day) {
          _onCellClick(day);
        },
        "getDateExtra": props.getDateExtra,
        "callback": function callback(dom) {
          data.componentRef = dom || data.componentRef || undefined;

          data.updateLayout = function () {
            computeHeight(data, dom);
          };

          data.updateLayout();
        }
      }, null);
    };

    var _useDatePickerBase = useDatePickerBase(props, {
      emit: emit
    }, {
      genMonthComponent: genMonthComponent
    }),
        genMonthData = _useDatePickerBase.genMonthData,
        updateFlag = _useDatePickerBase.updateFlag,
        visibleMonth = _useDatePickerBase.visibleMonth,
        createOnScroll = _useDatePickerBase.createOnScroll,
        _onCellClick = _useDatePickerBase.onCellClick,
        canLoadPrev = _useDatePickerBase.canLoadPrev,
        state = _useDatePickerBase.state;

    var transform = ref('');
    var wrapper = ref(null);
    var panel = ref(null);
    var touchHandler = computed(function () {
      var initDelta = 0;
      var lastY = 0;
      var delta = initDelta;

      var onFinish = function onFinish() {
        if (delta > 40 && canLoadPrev()) {
          genMonthData(state.months[0].firstDate, -1);
          visibleMonth.value = state.months.slice(0, props.initialMonths);
          state.months.forEach(function (m) {
            m.updateLayout && m.updateLayout();
          });
          updateFlag.value++;
        }

        setTransform(panel.value.style, "translate3d(0,0,0)");
        setTransition(panel.value.style, '.3s');
        setTimeout(function () {
          panel.value && setTransition(panel.value.style, '');
        }, 300);
      };

      return {
        onTouchStart: function onTouchStart(evt) {
          lastY = evt.touches[0].screenY;
          delta = initDelta;
        },
        onTouchMove: function onTouchMove(evt) {
          var ele = evt.currentTarget;
          var isReachTop = ele.scrollTop === 0;

          if (isReachTop) {
            delta = evt.touches[0].screenY - lastY;

            if (delta > 0) {
              evt.preventDefault();

              if (delta > 80) {
                delta = 80;
              }
            } else {
              delta = 0;
            }

            setTransform(panel.value.style, "translate3d(0,".concat(delta, "px,0)"));
          }
        },
        onTouchEnd: function onTouchEnd() {
          onFinish();
        },
        onTouchCancel: function onTouchCancel() {
          onFinish();
        },
        onFinish: onFinish
      };
    });

    var computeHeight = function computeHeight(data, singleMonth) {
      if (singleMonth && singleMonth.wrapperDivDOM) {
        // preact, ref时dom有可能无height, offsetTop数据。
        if (!data.height && !singleMonth.wrapperDivDOM.clientHeight) {
          setTimeout(function () {
            return computeHeight(data, singleMonth);
          }, 500);
          return;
        }

        data.height = singleMonth.wrapperDivDOM.clientHeight || data.height || 0;
        data.y = singleMonth.wrapperDivDOM.offsetTop || data.y || 0;
      }
    };

    onMounted(function () {
      if (wrapper.value) {
        emit('layout', wrapper.value.clientHeight);
        var scrollHandler = createOnScroll();

        wrapper.value.onscroll = function (evt) {
          scrollHandler({
            client: wrapper.value.clientHeight,
            full: evt.currentTarget.clientHeight,
            top: evt.currentTarget.scrollTop
          });
        };
      }
    });

    var setTransform = function setTransform(nodeStyle, value) {
      transform.value = value;
      nodeStyle.transform = value;
      nodeStyle.webkitTransform = value;
    };

    var setTransition = function setTransition(nodeStyle, value) {
      nodeStyle.transition = value;
      nodeStyle.webkitTransition = value;
    };

    return {
      canLoadPrev: canLoadPrev,
      state: state,
      visibleMonth: visibleMonth,
      setPanel: function setPanel(el) {
        panel.value = el;
      },
      setWrapper: function setWrapper(el) {
        wrapper.value = el;
      },
      transform: transform,
      touchHandler: touchHandler,
      genMonthComponent: genMonthComponent
    };
  },
  render: function render() {
    var _this = this;

    var _this$prefixCls = this.prefixCls,
        prefixCls = _this$prefixCls === void 0 ? '' : _this$prefixCls,
        _this$locale = this.locale,
        locale = _this$locale === void 0 ? {} : _this$locale;
    var style = {
      transform: this.transform
    };
    var wrapperEvents = {
      onTouchstart: this.touchHandler.onTouchStart,
      onTouchmove: this.touchHandler.onTouchMove,
      onTouchend: this.touchHandler.onTouchEnd,
      onTouchcancel: this.touchHandler.onTouchCancel
    };
    return _createVNode("div", {
      "class": "".concat(prefixCls, " date-picker")
    }, [_createVNode(WeekPanel, {
      "locale": locale
    }, null), _createVNode("div", _mergeProps({
      "class": "wrapper",
      "style": {
        overflowX: 'hidden',
        overflowY: 'visible'
      },
      "ref": this.setWrapper
    }, wrapperEvents), [_createVNode("div", {
      "style": style,
      "ref": this.setPanel
    }, [this.canLoadPrev() && _createVNode("div", {
      "class": "load-tip"
    }, [locale.loadPrevMonth]), _createVNode("div", {
      "class": "months"
    }, [this.state.months.map(function (m) {
      var hidden = m.height && _this.visibleMonth.indexOf(m) < 0;

      if (hidden) {
        return _createVNode("div", {
          "key": m.title + '_shallow',
          "style": {
            height: m.height
          }
        }, null);
      }

      return m.component;
    })])])])]);
  }
});
export default DatePicker;