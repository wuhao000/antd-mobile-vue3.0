import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { isVNode as _isVNode, mergeProps as _mergeProps, createVNode as _createVNode } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import classnames from 'classnames';
import { defineComponent, ref } from 'vue';
import CarouselBase from './base';

function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !_isVNode(s);
}

var DotDecorator = defineComponent({
  name: 'DotDecorator',
  inheritAttrs: false,
  props: {
    slideCount: {
      type: Number
    },
    slidesToScroll: {
      type: Number
    },
    currentSlide: {
      type: Number
    },
    prefixCls: {
      type: String,
      default: 'am-carousel'
    },
    dotActiveStyle: {
      type: Object
    },
    dotStyle: {
      type: Object
    }
  },
  render: function render() {
    var _this = this;

    var arr = [];

    for (var i = 0; i < this.slideCount; i += this.slidesToScroll) {
      arr.push(i);
    }

    var dotDom = arr.map(function (index) {
      var dotCls = classnames("".concat(_this.prefixCls, "-wrap-dot"), _defineProperty({}, "".concat(_this.prefixCls, "-wrap-dot-active"), index === _this.currentSlide));
      var currentDotStyle = index === _this.currentSlide ? _this.dotActiveStyle : _this.dotStyle;
      return _createVNode("div", {
        "class": dotCls,
        "key": index
      }, [_createVNode("span", {
        "style": currentDotStyle
      }, null)]);
    });
    return _createVNode("div", {
      "class": "".concat(this.prefixCls, "-wrap")
    }, [dotDom]);
  }
});
var Carousel = defineComponent({
  name: 'Carousel',
  props: {
    prefixCls: {
      type: String,
      default: 'am-carousel'
    },
    beforeChange: {},
    afterChange: {
      type: Function
    },
    swipeSpeed: {},
    easing: {},
    dotStyle: {
      default: function _default() {
        return {};
      }
    },
    dotActiveStyle: {
      default: function _default() {
        return {};
      }
    },
    frameOverflow: {
      type: String
    },
    cellAlign: {
      type: String,
      default: 'center'
    },
    cellSpacing: {
      type: Number
    },
    slideWidth: {
      type: [String, Number]
    },
    dots: {
      type: Boolean,
      default: true
    },
    vertical: {
      type: Boolean
    },
    autoplay: {
      type: Boolean,
      default: false
    },
    autoplayInterval: {
      type: Number
    },
    infinite: {
      type: Boolean,
      default: false
    },
    initialSlideWidth: {
      type: Number
    }
  },
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var selectedIndex = ref(0);

    var onChange = function onChange(index) {
      selectedIndex.value = index;

      if (props.afterChange) {
        props.afterChange(index);
      }
    };

    return {
      onChange: onChange,
      selectedIndex: selectedIndex
    };
  },
  render: function render() {
    var _slot;

    var infinite = this.infinite,
        selectedIndex = this.selectedIndex,
        beforeChange = this.beforeChange,
        afterChange = this.afterChange,
        dots = this.dots,
        prefixCls = this.prefixCls,
        dotActiveStyle = this.dotActiveStyle,
        dotStyle = this.dotStyle,
        vertical = this.vertical;

    var newProps = _objectSpread(_objectSpread({}, this.$props), {}, {
      wrapAround: infinite,
      slideIndex: selectedIndex,
      beforeSlide: beforeChange
    });

    var Decorators = [];

    if (dots) {
      Decorators = [{
        component: DotDecorator,
        position: 'BottomCenter'
      }];
    }

    var wrapCls = classnames(prefixCls, _defineProperty({}, "".concat(prefixCls, "-vertical"), vertical));
    return _createVNode(CarouselBase, _mergeProps(_objectSpread(_objectSpread({}, newProps), {}, {
      decorators: Decorators,
      afterSlide: this.onChange
    }), {
      "class": wrapCls
    }), _isSlot(_slot = this.$slots.default()) ? _slot : {
      default: function _default() {
        return [_slot];
      }
    });
  }
});
export default Carousel;