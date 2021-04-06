import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { createVNode as _createVNode } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import classnames from 'classnames';
import { defineComponent, onMounted, ref } from 'vue';
var Progress = defineComponent({
  install: null,
  name: 'Progress',
  props: {
    prefixCls: {
      type: String,
      default: 'am-progress'
    },
    barStyle: {
      type: Object
    },
    percent: {
      type: Number,
      default: 0
    },
    position: {
      default: 'fixed'
    },
    unfilled: {
      type: Boolean,
      default: true
    },
    appearTransition: {
      type: Boolean,
      default: false
    }
  },
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var barRef = ref(null);
    var noAppearTransition = ref(true);
    onMounted(function () {
      if (props.appearTransition) {
        setTimeout(function () {
          if (barRef.value) {
            barRef.value.style.width = "".concat(props.percent, "%");
          }
        }, 10);
      }
    });
    return {
      noAppearTransition: noAppearTransition,
      barRef: barRef
    };
  },
  render: function render() {
    var _classnames,
        _this = this;

    var prefixCls = this.prefixCls,
        position = this.position,
        unfilled = this.unfilled,
        _this$barStyle = this.barStyle,
        barStyle = _this$barStyle === void 0 ? {} : _this$barStyle;
    var percentStyle = {
      width: this.noAppearTransition || !this.appearTransition ? "".concat(this.percent, "%") : 0,
      height: 0
    };
    var wrapCls = classnames("".concat(prefixCls, "-outer"), (_classnames = {}, _defineProperty(_classnames, "".concat(prefixCls, "-fixed-outer"), position === 'fixed'), _defineProperty(_classnames, "".concat(prefixCls, "-hide-outer"), !unfilled), _classnames));
    return _createVNode("div", {
      "class": wrapCls,
      "role": "progressbar",
      "aria-valuenow": this.percent,
      "aria-valuemin": 0,
      "aria-valuemax": 100
    }, [_createVNode("div", {
      "ref": function ref(el) {
        return _this.barRef = el;
      },
      "class": "".concat(prefixCls, "-bar"),
      "style": _objectSpread(_objectSpread({}, barStyle), percentStyle)
    }, null)]);
  }
});
export default Progress;