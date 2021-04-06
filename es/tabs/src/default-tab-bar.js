import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { mergeProps as _mergeProps, createVNode as _createVNode } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { computed, defineComponent, ref, watch } from 'vue';
import Gesture from '../../vmc-gesture';
import { getPxStyle, getTransformPropValue, setPxStyle } from './utils';
var DefaultTabBar = defineComponent({
  inheritAttrs: false,
  name: 'DefaultTabBar',
  props: {
    card: {
      type: Boolean
    },
    activeCardColor: {
      type: String
    },
    prefixCls: {
      default: 'am-tabs-default-bar'
    },

    /** call this function to switch tab */
    goToTab: {
      type: Function,
      default: function _default() {}
    },
    tabs: {
      default: function _default() {
        return [];
      }
    },

    /** 当前激活的标签页 */
    activeTab: {
      default: 0
    },
    animated: {
      type: Boolean,
      default: true
    },
    renderTab: {
      type: Function
    },
    renderUnderline: {
      type: Boolean,
      default: true
    },
    page: {
      default: 5
    },
    tabBarPosition: {
      type: String,
      default: 'top'
    },
    tabBarUnderlineStyle: {
      default: function _default() {
        return {};
      }
    },
    tabBarBackgroundColor: {
      default: '#fff'
    },
    tabBarActiveTextColor: {
      default: ''
    },
    tabBarInactiveTextColor: {
      default: ''
    },
    tabBarTextStyle: {
      default: function _default() {
        return {};
      }
    }
  },
  setup: function setup(props, _ref) {
    var emit = _ref.emit;
    var instanceId = ref(null);
    var isMoving = ref(false);
    var showPrev = ref(false);
    var showNext = ref(false);
    var transform = ref('');
    watch(function () {
      return props.activeTab;
    }, function () {
      getTransformByIndex();
    });
    watch(function () {
      return props.tabs;
    }, function () {
      getTransformByIndex();
    });
    var layoutRef = ref(null);
    var onPan = computed(function () {
      var lastOffset = 0;
      var finalOffset = 0;

      var getLastOffset = function getLastOffset() {
        var isVertical = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : isTabBarVertical();
        var offset = +"".concat(lastOffset).replace('%', '');

        if ("".concat(lastOffset).indexOf('%') >= 0) {
          offset /= 100;
          offset *= isVertical ? layoutRef.value.clientHeight : layoutRef.value.clientWidth;
        }

        return offset;
      };

      return {
        onPanStart: function onPanStart() {
          isMoving.value = true;
        },
        onPanMove: function onPanMove(status) {
          if (!status.moveStatus || !layoutRef.value.value) {
            return;
          }

          var isVertical = isTabBarVertical();
          var offset = getLastOffset() + (isVertical ? status.moveStatus.y : status.moveStatus.x);
          var canScrollOffset = isVertical ? -layoutRef.value.scrollHeight + layoutRef.value.clientHeight : -layoutRef.value.scrollWidth + layoutRef.value.clientWidth;
          offset = Math.min(offset, 0);
          offset = Math.max(offset, canScrollOffset);
          setPxStyle(layoutRef.value.value, offset, 'px', isVertical);
          finalOffset = offset;
          showPrev.value = -offset > 0;
          showNext.value = offset > canScrollOffset;
        },
        onPanEnd: function onPanEnd() {
          var isVertical = isTabBarVertical();
          lastOffset = finalOffset;
          isMoving.value = false;
          transform.value = getPxStyle(finalOffset, 'px', isVertical);
        },
        setCurrentOffset: function setCurrentOffset(offset) {
          return lastOffset = offset;
        }
      };
    });

    var getTransformByIndex = function getTransformByIndex() {
      var activeTab = props.activeTab,
          tabs = props.tabs,
          _props$page = props.page,
          page = _props$page === void 0 ? 0 : _props$page;
      var isVertical = isTabBarVertical();
      var size = getTabSize(page, tabs.length);
      var center = page / 2;
      var pos = Math.min(activeTab, tabs.length - center - .5);
      var skipSize = Math.min(-(pos - center + .5) * size, 0);
      onPan.value.setCurrentOffset("".concat(skipSize, "%"));
      transform.value = getPxStyle(skipSize, '%', isVertical);
      showPrev.value = activeTab > center - .5 && tabs.length > page;
      showNext.value = activeTab < tabs.length - center - .5 && tabs.length > page;
    };

    var onPress = function onPress(index) {
      var goToTab = props.goToTab,
          tabs = props.tabs;
      emit('tabClick', tabs[index], index);
      goToTab && goToTab(index);
    };

    var isTabBarVertical = function isTabBarVertical() {
      var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : props.tabBarPosition;
      return position === 'left' || position === 'right';
    };

    var nativeRenderTab = function nativeRenderTab(t, i, size, isTabBarVertical) {
      var prefixCls = props.prefixCls,
          renderTab = props.renderTab,
          activeTab = props.activeTab,
          tabBarTextStyle = props.tabBarTextStyle,
          tabBarActiveTextColor = props.tabBarActiveTextColor,
          tabBarInactiveTextColor = props.tabBarInactiveTextColor;

      var textStyle = _objectSpread({}, tabBarTextStyle);

      var cls = "".concat(prefixCls, "-tab");
      var ariaSelected = false;

      var style = _objectSpread(_objectSpread({}, textStyle), isTabBarVertical ? {
        height: "".concat(size, "%")
      } : {
        width: "".concat(size, "%")
      });

      if (props.card && props.activeCardColor) {
        style.borderColor = props.activeCardColor;
      }

      if (props.card) {
        cls += " ".concat(cls, "-card");
      }

      if (activeTab === i) {
        cls += " ".concat(cls, "-active");
        ariaSelected = true;

        if (tabBarActiveTextColor) {
          textStyle.color = tabBarActiveTextColor;
        }

        style.backgroundColor = props.activeCardColor;
      } else if (tabBarInactiveTextColor) {
        textStyle.color = tabBarInactiveTextColor;
      }

      return _createVNode("div", {
        "key": "t_".concat(i),
        "style": style,
        "id": "m-tabs-".concat(instanceId.value, "-").concat(i),
        "role": "tab",
        "aria-selected": ariaSelected,
        "class": cls,
        "onClick": function onClick() {
          return onPress(i);
        }
      }, [renderTab ? renderTab(t) : t.title]);
    };

    var getTabSize = function getTabSize(page, tabLength) {
      return 100 / Math.min(page, tabLength);
    };

    {
      getTransformByIndex();
      instanceId.value = instanceId.value++;
    }
    return {
      setLayout: function setLayout(el) {
        layoutRef.value = el;
      },
      isTabBarVertical: isTabBarVertical,
      getTabSize: getTabSize,
      nativeRenderTab: nativeRenderTab,
      isMoving: isMoving,
      transform: transform,
      showNext: showNext,
      showPrev: showPrev,
      onPan: onPan
    };
  },
  render: function render() {
    var _this = this;

    var prefixCls = this.prefixCls,
        animated = this.animated,
        _this$tabs = this.tabs,
        tabs = _this$tabs === void 0 ? [] : _this$tabs,
        _this$page = this.page,
        page = _this$page === void 0 ? 0 : _this$page,
        _this$activeTab = this.activeTab,
        activeTab = _this$activeTab === void 0 ? 0 : _this$activeTab,
        tabBarBackgroundColor = this.tabBarBackgroundColor,
        tabBarUnderlineStyle = this.tabBarUnderlineStyle,
        tabBarPosition = this.tabBarPosition;
    var renderUnderline = !this.card && this.renderUnderline;
    var isMoving = this.isMoving,
        transform = this.transform,
        showNext = this.showNext,
        showPrev = this.showPrev;
    var isTabBarVertical = this.isTabBarVertical();
    var needScroll = tabs.length > page;
    var size = this.getTabSize(page, tabs.length);
    var Tabs = tabs.map(function (t, i) {
      return _this.nativeRenderTab(t, i, size, isTabBarVertical);
    });
    var cls = prefixCls;

    if (animated && !isMoving) {
      cls += " ".concat(prefixCls, "-animated");
    }

    var style = {
      backgroundColor: tabBarBackgroundColor || ''
    };
    var transformStyle = needScroll ? _objectSpread({}, getTransformPropValue(transform)) : {};

    var _this$onPan = this.onPan,
        setCurrentOffset = _this$onPan.setCurrentOffset,
        onPan = _objectWithoutProperties(_this$onPan, ["setCurrentOffset"]);

    var underlineProps = {
      style: _objectSpread(_objectSpread(_objectSpread({}, isTabBarVertical ? {
        height: "".concat(size, "%")
      } : {
        width: "".concat(size, "%")
      }), isTabBarVertical ? {
        top: "".concat(size * activeTab, "%")
      } : {
        left: "".concat(size * activeTab, "%")
      }), tabBarUnderlineStyle),
      class: "".concat(prefixCls, "-underline")
    };
    return _createVNode("div", {
      "class": "".concat(cls, " ").concat(prefixCls, "-").concat(tabBarPosition),
      "style": style
    }, [showPrev && _createVNode("div", {
      "class": "".concat(prefixCls, "-prevpage")
    }, null), _createVNode(Gesture, _mergeProps(onPan, {
      "direction": isTabBarVertical ? 'vertical' : 'horizontal'
    }), {
      default: function _default() {
        return [_createVNode("div", {
          "role": "tablist",
          "class": "".concat(prefixCls, "-content"),
          "style": transformStyle,
          "ref": _this.setLayout
        }, [Tabs, renderUnderline ? _createVNode("div", underlineProps, null) : ''])];
      }
    }), showNext && _createVNode("div", {
      "class": "".concat(prefixCls, "-nextpage")
    }, null)]);
  }
});
export default DefaultTabBar;