import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { createVNode as _createVNode, mergeProps as _mergeProps } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { computed, defineComponent, getCurrentInstance, inject, onMounted, ref } from 'vue';
import getDataAttr from '../../utils/get-data-attr';
import Tab from './tab';
var _uid = 100;
export default defineComponent({
  name: 'MTabBarItem',
  props: {
    badge: {
      type: [String, Number]
    },
    selected: {
      type: Boolean,
      default: undefined
    },
    icon: {
      type: [String, Object]
    },
    selectedIcon: {
      type: [String, Object]
    },
    title: {
      type: [String, Object],
      default: ''
    },
    dot: {
      type: Boolean
    },
    prefixCls: {
      type: String,
      default: 'am-tab-bar'
    }
  },
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var store = inject('store');
    var tabBar = inject('tabBar');
    var index = ref(-1);
    var sSelected = computed(function () {
      return props.selected !== undefined ? props.selected : index.value === store.currentTab;
    });
    var instance = getCurrentInstance();
    onMounted(function () {
      var children = tabBar.slots.default();
      var tabs = children.filter(function (it) {
        return it.props.tag === instance.props.tag;
      });
      index.value = tabs.findIndex(function (it) {
        return it.key === instance.vnode.key;
      });
    });
    return {
      tabBar: tabBar,
      sSelected: sSelected,
      index: index,
      _uid: _uid++
    };
  },
  render: function render() {
    var _this = this,
        _this$$slots$default,
        _this$$slots;

    var _this$tabBar$props = this.tabBar.props,
        tintColor = _this$tabBar$props.tintColor,
        unselectedTintColor = _this$tabBar$props.unselectedTintColor;
    var icon = this.$slots.icon ? this.$slots.icon[0] : this.icon;
    var selectedIcon = this.$slots.selectedIcon ? this.$slots.selectedIcon : this.selectedIcon || icon;

    var props = _objectSpread(_objectSpread({}, this.$props), {}, {
      prefixCls: "".concat(this.prefixCls, "-tab"),
      tintColor: tintColor,
      unselectedTintColor: unselectedTintColor,
      icon: icon,
      selectedIcon: selectedIcon,
      selected: this.sSelected
    });

    return _createVNode(Tab, _mergeProps(props, {
      "onClick": function onClick(e) {
        console.log(_this.tabBar);

        _this.tabBar.setCurrentTab(_this.index);

        _this.$emit('click');
      },
      "dataAttrs": getDataAttr(this.$props)
    }), {
      default: function _default() {
        return [(_this$$slots$default = (_this$$slots = _this.$slots).default) === null || _this$$slots$default === void 0 ? void 0 : _this$$slots$default.call(_this$$slots)];
      }
    });
  }
});