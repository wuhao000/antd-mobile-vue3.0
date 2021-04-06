import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { isVNode as _isVNode, mergeProps as _mergeProps, createVNode as _createVNode } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { unwrapFragment } from '../../utils/vue';
import { computed, defineComponent, onBeforeUpdate, onUpdated, reactive, ref, watch } from 'vue';
import Gesture from '../../vmc-gesture';
import { DIRECTION_DOWN, DIRECTION_LEFT, DIRECTION_RIGHT, DIRECTION_UP } from '../../vmc-gesture/config';
import DefaultTabBar from './default-tab-bar';
import TabPane from './tab-pane';
import { getTransformPropValue, setPxStyle, setTransform } from './utils';

function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !_isVNode(s);
}

export var getPanDirection = function getPanDirection(direction) {
  switch (direction) {
    case DIRECTION_LEFT:
    case DIRECTION_RIGHT:
      return 'horizontal';

    case DIRECTION_UP:
    case DIRECTION_DOWN:
      return 'vertical';

    default:
      return 'none';
  }
};
var Tabs = defineComponent({
  DefaultTabBar: DefaultTabBar,
  name: 'Tabs',
  props: {
    /**
     * 使用卡片样式
     */
    card: {
      type: Boolean
    },

    /**
     * 激活的卡片背景色（未激活卡片的边框色与之相同）
     */
    activeCardColor: {
      type: String
    },

    /**
     * class前缀
     */
    prefixCls: {
      type: String,
      default: 'am-tabs'
    },
    useOnPan: {
      type: Boolean,
      default: true
    },
    renderTabBar: {
      type: Function
    },

    /**
     * 标签数据
     */
    tabs: {
      default: function _default() {
        return [];
      }
    },

    /** TabBar's position | default: top */
    tabBarPosition: {
      default: 'top'
    },

    /**
     * 当前激活的卡片的索引
     */
    value: {
      type: [String, Number],
      default: 0
    },
    page: {
      type: Number
    },

    /**
     * 是否支持手势
     */
    swipeable: {
      type: Boolean,
      default: true
    },

    /**
     * 与当前激活标签相邻的提前渲染的标签数量
     */
    prerenderingSiblingsNumber: {
      type: Number,
      default: 1
    },

    /**
     * 切换标签时是否有动画
     */
    animated: {
      type: Boolean,
      default: true
    },

    /**
     * 是否销毁未激活的标签页
     */
    destroyInactiveTab: {
      type: Boolean,
      default: false
    },

    /**
     * 切换卡片的滑动距离，0-1之间
     */
    distanceToChangeTab: {
      type: Number,
      default: 0.3
    },
    usePaged: {
      type: Boolean,
      default: true
    },

    /**
     * 标签页方向
     */
    tabDirection: {
      type: String,
      default: 'horizontal'
    },

    /** 标签下划线样式 */
    tabBarUnderlineStyle: {
      type: Object
    },

    /** 标签页背景颜色 */
    tabBarBackgroundColor: {
      type: String
    },

    /** 激活的标签页文字颜色 */
    tabBarActiveTextColor: {
      type: String
    },

    /** 未激活的标签页文字颜色 */
    tabBarInactiveTextColor: {
      type: String
    },

    /** 标签栏文字样式 */
    tabBarTextStyle: {
      type: Object
    },

    /** use left instead of transform | default: false */
    useLeftInsteadTransform: {
      type: Boolean
    }
  },
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var contentPos = ref('');
    var isMoving = ref(false);
    var instanceId = ref(null);
    var prevCurrentTab = ref(null);
    var tabCache = reactive({});

    var getTabIndex = function getTabIndex() {
      var page = props.page,
          value = props.value,
          tabs = props.tabs;
      var param = (page !== undefined ? page : value) || 0;
      var index = 0;

      if (typeof param === 'string') {
        tabs.forEach(function (t, i) {
          if (t.key === param) {
            index = i;
          }
        });
      } else {
        index = param || 0;
      }

      return index < 0 ? 0 : index;
    };

    var currentTab = ref(getTabIndex());
    var nextCurrentTab = ref(null);
    var layoutRef = ref(null);
    watch(function () {
      return props.page;
    }, function (page) {
      if (page !== undefined && page !== null) {
        currentTab.value = page;
      }
    });
    watch(function () {
      return currentTab.value;
    }, function (index) {
      emit('update:value', index);
    });
    var onPan = computed(function () {
      var lastOffset = 0;
      var finalOffset = 0;
      var panDirection;

      var getLastOffset = function getLastOffset() {
        var isVertical = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : isTabVertical();
        var offset = +"".concat(lastOffset).replace('%', '');

        if ("".concat(lastOffset).indexOf('%') >= 0) {
          offset /= 100;
          offset *= isVertical ? layoutRef.clientHeight : layoutRef.value.clientWidth;
        }

        return offset;
      };

      return {
        onPanStart: function onPanStart(status) {
          if (!props.swipeable || !props.animated) {
            return;
          }

          panDirection = getPanDirection(status.direction);
          isMoving.value = true;
        },
        onPanMove: function onPanMove(status) {
          var swipeable = props.swipeable,
              animated = props.animated,
              useLeftInsteadTransform = props.useLeftInsteadTransform;

          if (!status.moveStatus || !layoutRef.value.value || !swipeable || !animated) {
            return;
          }

          var isVertical = isTabVertical();
          var offset = getLastOffset();

          if (isVertical) {
            offset += panDirection === 'horizontal' ? 0 : status.moveStatus.y;
          } else {
            offset += panDirection === 'vertical' ? 0 : status.moveStatus.x;
          }

          var canScrollOffset = isVertical ? -layoutRef.value.scrollHeight + layoutRef.value.clientHeight : -layoutRef.value.scrollWidth + layoutRef.value.clientWidth;
          offset = Math.min(offset, 0);
          offset = Math.max(offset, canScrollOffset);
          setPxStyle(layoutRef.value.value, offset, 'px', isVertical, useLeftInsteadTransform);
          finalOffset = offset;
        },
        onPanEnd: function onPanEnd() {
          if (!props.swipeable || !props.animated) {
            return;
          }

          lastOffset = finalOffset;
          var isVertical = isTabVertical();
          var offsetIndex = getOffsetIndex(finalOffset, isVertical ? layoutRef.value.clientHeight : layoutRef.value.clientWidth);
          isMoving.value = false;

          if (offsetIndex === currentTab.value) {
            if (props.usePaged) {
              setTransform(layoutRef.value.style, getContentPosByIndex(offsetIndex, isTabVertical(), props.useLeftInsteadTransform));
            }
          } else {
            goToTab(offsetIndex);
          }
        },
        setCurrentOffset: function setCurrentOffset(offset) {
          return lastOffset = offset;
        }
      };
    });
    /** on tab click */

    var onTabClick = function onTabClick(tab, index) {
      emit('tab-click', index);
    };

    var isTabVertical = function isTabVertical() {
      var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : props.tabDirection;
      return direction === 'vertical';
    };

    var shouldRenderTab = function shouldRenderTab(idx) {
      var _props$prerenderingSi = props.prerenderingSiblingsNumber,
          prerenderingSiblingsNumber = _props$prerenderingSi === void 0 ? 0 : _props$prerenderingSi;
      return currentTab.value - prerenderingSiblingsNumber <= idx && idx <= currentTab.value + prerenderingSiblingsNumber;
    };

    var componentDidMount = function componentDidMount() {
      prevCurrentTab.value = currentTab.value;
    };

    var getOffsetIndex = function getOffsetIndex(current, width) {
      var threshold = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : props.distanceToChangeTab || 0;
      var ratio = Math.abs(current / width);
      var direction = ratio > currentTab.value ? '<' : '>';
      var index = Math.floor(ratio);

      switch (direction) {
        case '<':
          return ratio - index > threshold ? index + 1 : index;

        case '>':
          return 1 - ratio + index > threshold ? index : index + 1;

        default:
          return Math.round(ratio);
      }
    };

    var baseGoToTab = function baseGoToTab(index) {
      var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var setState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      if (!force && nextCurrentTab.value === index) {
        return false;
      }

      nextCurrentTab.value = index;
      var tabs = props.tabs;

      if (index >= 0 && index < tabs.length) {
        if (!force) {
          emit('change', tabs[index], index);

          if (props.page !== undefined) {
            return false;
          }
        }

        currentTab.value = index;

        if (setState) {
          setState();
        }
      }

      return true;
    };

    var getTabBarBaseProps = function getTabBarBaseProps() {
      var animated = props.animated,
          tabBarActiveTextColor = props.tabBarActiveTextColor,
          tabBarBackgroundColor = props.tabBarBackgroundColor,
          tabBarInactiveTextColor = props.tabBarInactiveTextColor,
          tabBarPosition = props.tabBarPosition,
          tabBarTextStyle = props.tabBarTextStyle,
          tabBarUnderlineStyle = props.tabBarUnderlineStyle,
          tabs = props.tabs;
      return {
        activeTab: currentTab.value,
        animated: animated,
        card: props.card,
        activeCardColor: props.activeCardColor,
        goToTab: tabClickGoToTab,
        tabBarActiveTextColor: tabBarActiveTextColor,
        tabBarBackgroundColor: tabBarBackgroundColor,
        tabBarInactiveTextColor: tabBarInactiveTextColor,
        tabBarPosition: tabBarPosition,
        tabBarTextStyle: tabBarTextStyle,
        tabBarUnderlineStyle: tabBarUnderlineStyle,
        tabs: tabs,
        instanceId: instanceId.value
      };
    };

    var getSubElements = function getSubElements() {
      var children = unwrapFragment(slots.default());
      var subElements = {};
      return function () {
        var defaultPrefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '$i$-';
        var allPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '$ALL$';

        if (Array.isArray(children)) {
          children.forEach(function (child, index) {
            if (child.key) {
              subElements[child.key] = child;
            }

            subElements["".concat(defaultPrefix).concat(index)] = child;
          });
        } else if (children) {
          subElements[allPrefix] = children;
        }

        return subElements;
      };
    };

    var getSubElement = function getSubElement(tab, index) {
      var defaultPrefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '$i$-';
      var allPrefix = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '$ALL$';
      var key = tab.key !== null && tab.key !== undefined && tab.key !== '' ? tab.key : "".concat(defaultPrefix).concat(index);
      var getSubElementsFn = getSubElements();
      var elements = getSubElementsFn(defaultPrefix, allPrefix);
      var component = elements[key] || elements[allPrefix];

      if (component instanceof Function) {
        component = component(tab, index);
      }

      return component || null;
    };

    var goToTab = function goToTab(index) {
      var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var usePaged = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : props.usePaged;
      var tabDirection = props.tabDirection,
          useLeftInsteadTransform = props.useLeftInsteadTransform;

      var setState = function setState() {};

      if (usePaged) {
        setState = function setState() {
          contentPos.value = getContentPosByIndex(index, isTabVertical(tabDirection), useLeftInsteadTransform);
        };
      }

      return baseGoToTab(index, force, setState);
    };

    var tabClickGoToTab = function tabClickGoToTab(index) {
      goToTab(index, false, true);
    };

    var getContentPosByIndex = function getContentPosByIndex(index, isVertical) {
      var useLeft = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var value = "".concat(-index * 100, "%");
      onPan.value.setCurrentOffset(value);

      if (useLeft) {
        return "".concat(value);
      } else {
        var translate = isVertical ? "0px, ".concat(value) : "".concat(value, ", 0px"); // fix: content overlay TabBar on iOS 10. ( 0px -> 1px )

        return "translate3d(".concat(translate, ", 1px)");
      }
    };

    var onSwipe = function onSwipe(status) {
      var tabBarPosition = props.tabBarPosition,
          swipeable = props.swipeable,
          usePaged = props.usePaged;

      if (!swipeable || !usePaged || isTabVertical()) {
        return;
      }

      switch (tabBarPosition) {
        case 'top':
        case 'bottom':
          switch (status.direction) {
            case DIRECTION_LEFT:
              if (!isTabVertical()) {
                goToTab(prevCurrentTab.value + 1);
              }

              break;

            case DIRECTION_UP:
              if (isTabVertical()) {
                goToTab(prevCurrentTab.value + 1);
              }

              break;

            case DIRECTION_RIGHT:
              if (!isTabVertical()) {
                goToTab(prevCurrentTab.value - 1);
              }

              break;

            case DIRECTION_DOWN:
              if (isTabVertical()) {
                goToTab(prevCurrentTab.value - 1);
              }

              break;
          }

          break;
      }
    };

    var renderContent = function renderContent() {
      var prefixCls = props.prefixCls,
          tabs = props.tabs,
          animated = props.animated,
          destroyInactiveTab = props.destroyInactiveTab,
          useLeftInsteadTransform = props.useLeftInsteadTransform;
      var contentCls = "".concat(prefixCls, "-content-wrap");

      if (animated && !isMoving.value) {
        contentCls += " ".concat(contentCls, "-animated");
      }

      var contentStyle = animated ? useLeftInsteadTransform ? _objectSpread({
        position: 'relative'
      }, isTabVertical() ? {
        top: contentPos.value
      } : {
        left: contentPos
      }) : getTransformPropValue(contentPos.value) : _objectSpread({
        position: 'relative'
      }, isTabVertical() ? {
        top: "".concat(-currentTab.value * 100, "%")
      } : {
        left: "".concat(-currentTab * 100, "%")
      });

      var _getTabBarBaseProps = getTabBarBaseProps(),
          instanceId = _getTabBarBaseProps.instanceId;

      return _createVNode("div", {
        "class": contentCls,
        "style": contentStyle,
        "ref": function ref(el) {
          layoutRef.value = el;
        }
      }, [tabs && tabs.map(function (tab, index) {
        var cls = "".concat(prefixCls, "-pane-wrap");

        if (currentTab.value === index) {
          cls += " ".concat(cls, "-active");
        } else {
          cls += " ".concat(cls, "-inactive");
        }

        var key = tab.key || "tab_".concat(index); // update tab cache

        if (shouldRenderTab(index)) {
          tabCache[index] = getSubElement(tab, index);
        } else if (destroyInactiveTab) {
          tabCache[index] = undefined;
        }

        return _createVNode(TabPane, {
          "key": key,
          "class": cls,
          "active": currentTab.value === index,
          "role": "tabpanel",
          "aria-hidden": currentTab.value !== index,
          "aria-labelledby": "m-tabs-".concat(instanceId, "-").concat(index),
          "fixX": isTabVertical,
          "fixY": !isTabVertical
        }, {
          default: function _default() {
            return [tabCache[index]];
          }
        });
      })]);
    };

    {
      nextCurrentTab.value = currentTab.value;
      instanceId.value = instanceId.value++;
      contentPos.value = getContentPosByIndex(getTabIndex(), isTabVertical(props.tabDirection), props.useLeftInsteadTransform);
    }
    onBeforeUpdate(function () {
      if (props.page !== props.page && props.page !== undefined) {
        baseGoToTab(getTabIndex(), true);
      }
    });
    onUpdated(function () {
      prevCurrentTab.value = currentTab.value;
    });
    return {
      isTabVertical: isTabVertical,
      getTabBarBaseProps: getTabBarBaseProps,
      onPan: onPan,
      onTabClick: onTabClick,
      onSwipe: onSwipe,
      renderContent: renderContent
    };
  },
  render: function render() {
    var _slot;

    var _this = this;

    var prefixCls = this.prefixCls,
        tabBarPosition = this.tabBarPosition,
        tabDirection = this.tabDirection,
        useOnPan = this.useOnPan;
    var isTabVertical = this.isTabVertical(tabDirection);

    var tabBarProps = _objectSpread({}, this.getTabBarBaseProps());

    var onPan = !isTabVertical && useOnPan ? this.onPan : {};
    var content = [_createVNode("div", {
      "key": "tabBar",
      "class": "".concat(prefixCls, "-tab-bar-wrap")
    }, [this.renderTabBar ? this.renderTabBar(tabBarProps) : _createVNode(DefaultTabBar, _mergeProps(tabBarProps, {
      "onTabClick": function onTabClick(tab, index) {
        _this.onTabClick(tab, index);
      }
    }), null)]), _createVNode(Gesture, _mergeProps({
      "key": "$content",
      "onSwipe": this.onSwipe
    }, {
      onPan: onPan
    }), _isSlot(_slot = this.renderContent()) ? _slot : {
      default: function _default() {
        return [_slot];
      }
    })];
    return _createVNode("div", {
      "class": "".concat(prefixCls, " ").concat(prefixCls, "-").concat(tabDirection, " ").concat(prefixCls, "-").concat(tabBarPosition)
    }, [tabBarPosition === 'top' || tabBarPosition === 'left' ? content : content.reverse()]);
  }
});
export default Tabs;