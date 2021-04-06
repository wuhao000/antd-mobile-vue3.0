import _extends from "@babel/runtime/helpers/extends";
import { createVNode as _createVNode } from "vue";
import { defineComponent, getCurrentInstance, provide, reactive, watch } from 'vue';
import Tabs from '../../tabs';
import Item from './item';
var TabBar = defineComponent({
  Item: Item,
  name: 'MTabBar',
  props: {
    prefixCls: {
      default: 'am-tab-bar'
    },
    className: {},
    hidden: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '正在加载'
    },
    noRenderContent: {},
    prerenderingSiblingsNumber: {
      type: Number,
      default: 1
    },
    barTintColor: {
      type: String,
      default: 'white'
    },
    tintColor: {
      type: String,
      default: '#108ee9'
    },
    unselectedTintColor: {
      type: String,
      default: '#888'
    },
    tabBarPosition: {
      type: String,
      default: 'bottom'
    },
    animated: {
      type: Boolean,
      default: false
    },
    swipeable: {
      type: Boolean,
      default: false
    },
    value: {
      type: [Number, String]
    }
  },
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var store = reactive({
      currentTab: -10000
    });
    watch(function () {
      return props.value;
    }, function (value) {
      store.currentTab = value;
    }, {
      immediate: true
    });
    watch(function () {
      return store.currentTab;
    }, function (value) {
      emit('update:value', value);
    });

    var setCurrentTab = function setCurrentTab(tab) {
      store.currentTab = tab;
    };

    var renderTabBar = function renderTabBar() {
      var cls = "".concat(props.prefixCls, "-bar");

      if (props.hidden) {
        cls += " ".concat(props.prefixCls, "-bar-hidden-").concat(props.tabBarPosition);
      }

      return _createVNode("div", {
        "class": cls,
        "style": {
          backgroundColor: props.barTintColor
        }
      }, [slots.default()]);
    };

    var getTabs = function getTabs() {
      return slots.default().map(function (c, index) {
        var props = _extends({}, c.props);

        if (props.icon && !props.selectedIcon) {
          props.selectedIcon = props.icon;
        }

        return {
          props: props,
          onClick: function onClick() {
            store.currentTab = index;
          }
        };
      });
    };

    var instance = getCurrentInstance();
    provide('tabBar', {
      setCurrentTab: setCurrentTab,
      slots: slots,
      props: props
    });
    provide('store', store);
    return {
      getTabs: getTabs,
      store: store,
      renderTabBar: renderTabBar
    };
  },
  render: function render() {
    var _this$$slots$default,
        _this$$slots,
        _this = this;

    var prefixCls = this.prefixCls,
        animated = this.animated,
        swipeable = this.swipeable,
        noRenderContent = this.noRenderContent,
        prerenderingSiblingsNumber = this.prerenderingSiblingsNumber,
        tabBarPosition = this.tabBarPosition;
    var tabs = this.getTabs();
    return _createVNode("div", {
      "class": prefixCls
    }, [_createVNode(Tabs, {
      "tabs": tabs,
      "renderTabBar": this.renderTabBar,
      "tabBarPosition": tabBarPosition,
      "page": this.store.currentTab < 0 ? undefined : this.store.currentTab,
      "animated": animated,
      "swipeable": swipeable,
      "noRenderContent": noRenderContent,
      "prerenderingSiblingsNumber": prerenderingSiblingsNumber
    }, {
      default: function _default() {
        return [(_this$$slots$default = (_this$$slots = _this.$slots).default) === null || _this$$slots$default === void 0 ? void 0 : _this$$slots$default.call(_this$$slots)];
      }
    })]);
  }
});
export default TabBar;