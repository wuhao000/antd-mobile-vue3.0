import { createVNode as _createVNode, isVNode as _isVNode, mergeProps as _mergeProps } from "vue";
import RcCollapse from 'ant-design-vue/lib/vc-collapse';
import { defineComponent } from 'vue';

function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !_isVNode(s);
}

export default defineComponent({
  Panel: RcCollapse.Panel,
  install: null,
  name: 'Accordion',
  props: {
    prefixCls: {
      default: 'am-accordion'
    },
    openAnimation: {},
    accordion: {
      type: Boolean,
      default: false
    },
    activeKey: {
      type: [String, Array]
    }
  },
  render: function render() {
    var _slot;

    var _this = this;

    return this.$slots.default ? _createVNode(RcCollapse, _mergeProps(this.$props, {
      "onChange": function onChange() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this.$emit.apply(_this, ['change'].concat(args));
      }
    }), _isSlot(_slot = this.$slots.default()) ? _slot : {
      default: function _default() {
        return [_slot];
      }
    }) : null;
  }
});