import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { createVNode as _createVNode } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { defineComponent } from 'vue';
import RmcDrawer from '../../vmc-drawer';
var Drawer = defineComponent({
  install: null,
  name: 'Drawer',
  props: {
    /**
     * 抽屉内容容器样式
     */
    sidebarStyle: {
      type: Object
    },
    contentStyle: {
      type: Object
    },
    overlayStyle: {
      type: Object
    },
    dragHandleStyle: {
      type: Object
    },
    docked: {
      type: Boolean
    },
    transitions: {
      type: Boolean
    },
    touch: {
      type: Boolean,
      default: true
    },
    dragToggleDistance: {
      type: Number
    },
    prefixCls: {
      type: String,
      default: 'am-drawer'
    },
    sidebar: {},
    visible: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: 'left'
    }
  },
  render: function render() {
    var _this$$slots$sidebar,
        _this$$slots$sidebar2,
        _this$$slots,
        _this = this,
        _this$$slots$default,
        _this$$slots2;

    var props = _objectSpread(_objectSpread(_objectSpread({}, this.$props), this.$attrs), {}, {
      sidebar: (_this$$slots$sidebar = (_this$$slots$sidebar2 = (_this$$slots = this.$slots).sidebar) === null || _this$$slots$sidebar2 === void 0 ? void 0 : _this$$slots$sidebar2.call(_this$$slots)) !== null && _this$$slots$sidebar !== void 0 ? _this$$slots$sidebar : this.sidebar,
      visible: this.visible,
      onOpen: function onOpen(value) {
        _this.$emit('update:visible', value);
      }
    });

    return _createVNode(RmcDrawer, props, {
      default: function _default() {
        return [(_this$$slots$default = (_this$$slots2 = _this.$slots).default) === null || _this$$slots$default === void 0 ? void 0 : _this$$slots$default.call(_this$$slots2)];
      }
    });
  }
});
export default Drawer;