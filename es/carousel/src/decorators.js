import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { createVNode as _createVNode, createTextVNode as _createTextVNode } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { defineComponent } from 'vue';
'use strict';

var IDecoratorProps = {
  currentSlide: {
    type: Number
  },
  slideCount: {
    type: Number
  },
  frameWidth: {
    type: [Number, String]
  },
  slideWidth: {
    type: [Number, String]
  },
  slidesToScroll: {
    type: Number
  },
  cellSpacing: {
    type: Number
  },
  slidesToShow: {
    type: Number
  },
  wrapAround: {
    type: Boolean
  },
  nextSlide: {
    type: Function
  },
  previousSlide: {
    type: Function
  },
  goToSlide: {
    type: Function
  }
};
var Decorator1 = defineComponent({
  name: 'Decorator1',
  props: _objectSpread({}, IDecoratorProps),
  setup: function setup(props) {
    var handleClick = function handleClick(e) {
      e.preventDefault();
      props.previousSlide();
    };

    var getButtonStyles = function getButtonStyles(disabled) {
      return {
        border: 0,
        background: 'rgba(0,0,0,0.4)',
        color: 'white',
        padding: 10,
        outline: 0,
        opacity: disabled ? 0.3 : 1,
        cursor: 'pointer'
      };
    };

    return {
      getButtonStyles: getButtonStyles,
      handleClick: handleClick
    };
  },
  render: function render() {
    return _createVNode("button", {
      "style": this.getButtonStyles(this.currentSlide === 0 && !this.wrapAround),
      "onClick": this.handleClick.bind(this)
    }, [_createTextVNode("PREV")]);
  }
});
var Decorator2 = defineComponent({
  name: 'DefaultDecorator',
  props: _objectSpread({}, IDecoratorProps),
  setup: function setup(props) {
    var handleClick = function handleClick(e) {
      e.preventDefault();

      if (props.nextSlide) {
        props.nextSlide();
      }
    };

    var getButtonStyles = function getButtonStyles(disabled) {
      return {
        border: 0,
        background: 'rgba(0,0,0,0.4)',
        color: 'white',
        padding: 10,
        outline: 0,
        opacity: disabled ? 0.3 : 1,
        cursor: 'pointer'
      };
    };

    return {
      getButtonStyles: getButtonStyles,
      handleClick: handleClick
    };
  },
  render: function render() {
    return _createVNode("button", {
      "style": this.getButtonStyles(this.currentSlide + this.slidesToScroll >= this.slideCount && !this.wrapAround),
      "onClick": this.handleClick.bind(this)
    }, [_createTextVNode("NEXT")]);
  }
});
var Decorator3 = defineComponent({
  name: 'DefaultDecorator',
  props: _objectSpread({}, IDecoratorProps),
  setup: function setup() {
    var getIndexes = function getIndexes(count, inc) {
      var arr = [];

      for (var i = 0; i < count; i += inc) {
        arr.push(i);
      }

      return arr;
    };

    var getListStyles = function getListStyles() {
      return {
        position: 'relative',
        margin: 0,
        top: -10,
        padding: 0
      };
    };

    var getListItemStyles = function getListItemStyles() {
      return {
        listStyleType: 'none',
        display: 'inline-block'
      };
    };

    var getButtonStyles = function getButtonStyles(active) {
      return {
        border: 0,
        background: 'transparent',
        color: 'black',
        cursor: 'pointer',
        padding: 10,
        outline: 0,
        fontSize: 24,
        opacity: active ? 1 : 0.5
      };
    };

    return {
      getIndexes: getIndexes,
      getListStyles: getListStyles,
      getButtonStyles: getButtonStyles,
      getListItemStyles: getListItemStyles
    };
  },
  render: function render() {
    var _this = this;

    var indexes = this.getIndexes(this.slideCount, this.slidesToScroll);
    return _createVNode("ul", {
      "style": this.getListStyles()
    }, [indexes.map(function (index) {
      return _createVNode("li", {
        "style": _this.getListItemStyles(),
        "key": index
      }, [_createVNode("button", {
        "style": _this.getButtonStyles(_this.currentSlide === index),
        "onClick": _this.goToSlide && _this.goToSlide.bind(null, index)
      }, [_createTextVNode("\u2022")])]);
    })]);
  }
});
var DefaultDecorators = [{
  component: Decorator1,
  position: 'CenterLeft'
}, {
  component: Decorator2,
  position: 'CenterRight'
}, {
  component: Decorator3,
  position: 'BottomCenter'
}];
export default DefaultDecorators;