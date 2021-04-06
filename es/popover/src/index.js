import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { resolveDirective as _resolveDirective, createVNode as _createVNode, Fragment as _Fragment } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { Popover } from 'ant-design-vue';
import classNames from 'classnames';
import { defineComponent, ref, watch } from 'vue';
export default defineComponent({
  name: 'MPopover',
  props: {
    /**
     * 是否显示气泡（v-model）
     */
    visible: {
      type: Boolean,
      default: false
    },
    prefixCls: {
      type: String,
      default: 'am-popover'
    },

    /**
     * 是否显示遮罩
     */
    mask: {
      type: Boolean,
      default: true
    },

    /**
     * 是否允许点击遮罩层关闭
     */
    maskClosable: {
      type: Boolean,
      default: true
    },
    placement: {
      type: String
    }
  },
  item: null,
  install: null,
  setup: function setup(props, _ref) {
    var emit = _ref.emit;
    var currentValue = ref(props.visible);
    watch(function () {
      return props.visible;
    }, function (value) {
      currentValue.value = value;
    });
    watch(function () {
      return currentValue.value;
    }, function (currentValue) {
      emit('update:visible', currentValue);
      emit('change', currentValue);
    });
    return {
      currentValue: currentValue
    };
  },
  render: function render() {
    var _this = this;

    var maskClass = classNames("".concat(this.prefixCls, "-mask"), _defineProperty({}, "".concat(this.prefixCls, "-mask-hidden"), !this.currentValue));
    var slots = {
      content: this.$slots.content,
      default: function _default() {
        var _this$$slots$default, _this$$slots;

        return _createVNode(_Fragment, null, [(_this$$slots$default = (_this$$slots = _this.$slots).default) === null || _this$$slots$default === void 0 ? void 0 : _this$$slots$default.call(_this$$slots), _this.mask ? _createVNode("div", {
          "onClick": function onClick(e) {
            if (!_this.maskClosable) {
              e.stopPropagation();
              e.preventDefault();
            }
          },
          "class": maskClass
        }, null) : null]);
      }
    };

    var popoverProps = _objectSpread(_objectSpread({}, this.$attrs), {}, {
      prefixCls: this.prefixCls,
      'v-model': [this.currentValue, 'visible'],
      trigger: ['click']
    });

    return _createVNode(Popover, popoverProps, _objectSpread({}, slots));
  }
});