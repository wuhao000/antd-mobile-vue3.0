import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _typeof from "@babel/runtime/helpers/typeof";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { mergeProps as _mergeProps, isVNode as _isVNode, createVNode as _createVNode } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import classnames from 'classnames';
import { defineComponent, isVNode, onMounted, ref } from 'vue';
import Carousel from '../../carousel';
import Flex from '../../flex';
import Icon from '../../icon';
import TouchFeedback from '../../vmc-feedback';

function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !_isVNode(s);
}

export default defineComponent({
  name: 'Grid',
  props: {
    /**
     * 宫格数据列表
     */
    data: {
      type: Array,
      default: function _default() {
        return [];
      }
    },

    /**
     * 是否有边框
     */
    bordered: {
      type: Boolean,
      default: true
    },

    /**
     * 列数
     */
    cols: {
      type: Number,
      default: 4
    },
    carousel: {
      type: Boolean,
      default: false
    },
    carouselMaxRow: {
      type: Number,
      default: 2
    },
    prefixCls: {
      type: String,
      default: 'am-grid'
    },
    square: {
      type: Boolean,
      default: true
    },
    activeClassName: {
      type: String
    },
    activeStyle: {},
    itemStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  setup: function setup(props, _ref) {
    var emit = _ref.emit;
    var initialSlideWidth = ref(0);

    var renderCarousel = function renderCarousel(rowsArr, pageCount, rowCount) {
      var carouselMaxRow = props.carouselMaxRow;
      var pagesArr = [];

      for (var pageIndex = 0; pageIndex < pageCount; pageIndex++) {
        var pageRows = [];

        for (var ii = 0; ii < carouselMaxRow; ii++) {
          var rowIndex = pageIndex * carouselMaxRow + ii;

          if (rowIndex < rowCount) {
            pageRows.push(rowsArr[rowIndex]);
          } else {
            // 空节点为了确保末尾页的最后未到底的行有底线(样式中last-child会没线)
            pageRows.push(_createVNode("div", {
              "key": "gridline-".concat(rowIndex)
            }, null));
          }
        }

        pagesArr.push(_createVNode("div", {
          "key": "pageitem-".concat(pageIndex),
          "class": "".concat(props.prefixCls, "-carousel-page")
        }, [pageRows]));
      }

      return pagesArr;
    };

    var renderItem = function renderItem(dataItem, index, columnNum) {
      var itemEl = null;

      if (dataItem) {
        var icon = dataItem.icon,
            text = dataItem.text;
        itemEl = _createVNode("div", {
          "class": "".concat(props.prefixCls, "-item-inner-content column-num-").concat(columnNum)
        }, [renderIcon(icon, props.prefixCls), _createVNode("div", {
          "class": "".concat(props.prefixCls, "-text")
        }, [text])]);
      }

      return _createVNode("div", {
        "class": "".concat(props.prefixCls, "-item-content")
      }, [itemEl]);
    };

    var getRows = function getRows(rowCount, dataLength) {
      var cols = props.cols,
          prefixCls = props.prefixCls,
          activeStyle = props.activeStyle,
          activeClassName = props.activeClassName,
          itemStyle = props.itemStyle;
      var rowsArr = [];
      var rowWidth = "".concat(100 / cols, "%");

      var colStyle = _objectSpread({
        width: rowWidth
      }, itemStyle);

      for (var i = 0; i < rowCount; i++) {
        var rowArr = [];

        var _loop = function _loop(j) {
          var dataIndex = i * cols + j;
          var itemEl = void 0;

          if (dataIndex < dataLength) {
            var _slot;

            var el = props.data && props.data[dataIndex];
            var TouchFeedback2 = TouchFeedback;
            itemEl = _createVNode(TouchFeedback2, {
              "key": "griditem-".concat(dataIndex),
              "activeClassName": activeClassName ? activeClassName : "".concat(prefixCls, "-item-active"),
              "activeStyle": activeStyle
            }, {
              default: function _default() {
                return [_createVNode(Flex.Item, {
                  "class": "".concat(prefixCls, "-item"),
                  "nativeOn": {
                    click: function click() {
                      emit('click', el, dataIndex);
                    }
                  },
                  "style": colStyle
                }, _isSlot(_slot = renderItem(el, dataIndex, cols)) ? _slot : {
                  default: function _default() {
                    return [_slot];
                  }
                })];
              }
            });
          } else {
            itemEl = _createVNode(Flex.Item, {
              "key": "griditem-".concat(dataIndex),
              "class": "".concat(prefixCls, "-item ").concat(prefixCls, "-null-item"),
              "style": colStyle
            }, null);
          }

          rowArr.push(itemEl);
        };

        for (var j = 0; j < cols; j++) {
          _loop(j);
        }

        rowsArr.push(_createVNode(Flex, {
          "justify": "center",
          "align": "stretch",
          "key": "gridline-".concat(i)
        }, _isSlot(rowArr) ? rowArr : {
          default: function _default() {
            return [rowArr];
          }
        }));
      }

      return rowsArr;
    };

    var renderIcon = function renderIcon(icon, prefixCls) {
      if (typeof icon === 'string') {
        if (icon.startsWith('http://') || icon.startsWith('https://')) {
          return _createVNode("img", {
            "class": "".concat(prefixCls, "-icon"),
            "src": icon,
            "alt": ""
          }, null);
        } else {
          return _createVNode(Icon, {
            "type": icon,
            "size": "lg"
          }, null);
        }
      } else if (_typeof(icon) === 'object') {
        if (isVNode(icon)) {
          return icon;
        }

        return _createVNode(Icon, {
          icon: icon
        }, null);
      }
    };

    onMounted(function () {
      initialSlideWidth.value = document.documentElement.clientWidth;
    });
    return {
      renderItem: renderItem,
      initialSlideWidth: initialSlideWidth,
      getRows: getRows,
      renderCarousel: renderCarousel
    };
  },
  render: function render() {
    var _classnames;

    var prefixCls = this.prefixCls,
        data = this.data,
        bordered = this.bordered,
        carousel = this.carousel,
        square = this.square,
        activeStyle = this.activeStyle,
        cols = this.cols,
        carouselMaxRow = this.carouselMaxRow,
        renderItem = this.renderItem,
        activeClassName = this.activeClassName,
        restPropsForCarousel = _objectWithoutProperties(this, ["prefixCls", "data", "bordered", "carousel", "square", "activeStyle", "cols", "carouselMaxRow", "renderItem", "activeClassName"]);

    var initialSlideWidth = this.initialSlideWidth;
    var dataLength = data && data.length || 0;
    var rowCount = Math.ceil(dataLength / cols);
    var rowsArr;
    var renderEl;

    if (carousel) {
      var _slot2;

      if (initialSlideWidth < 0) {
        // carousel  server render. because carousel dependes on document
        return null;
      }

      if (rowCount % carouselMaxRow !== 0) {
        rowCount = rowCount + carouselMaxRow - rowCount % carouselMaxRow;
      }

      var pageCount = Math.ceil(rowCount / carouselMaxRow);
      rowsArr = this.getRows(rowCount, dataLength);
      var carouselProps = {};

      if (pageCount <= 1) {
        carouselProps = {
          dots: false,
          dragging: false,
          swiping: false
        };
      }

      renderEl = _createVNode(Carousel, _mergeProps({
        "initialSlideWidth": initialSlideWidth
      }, restPropsForCarousel, carouselProps), _isSlot(_slot2 = this.renderCarousel(rowsArr, pageCount, rowCount)) ? _slot2 : {
        default: function _default() {
          return [_slot2];
        }
      });
    } else {
      renderEl = this.getRows(rowCount, dataLength);
    }

    var cls = classnames(prefixCls, (_classnames = {}, _defineProperty(_classnames, "".concat(prefixCls, "-square"), square), _defineProperty(_classnames, "".concat(prefixCls, "-line"), bordered), _defineProperty(_classnames, "".concat(prefixCls, "-carousel"), carousel), _classnames));
    return _createVNode("div", {
      "class": cls
    }, [renderEl]);
  }
});