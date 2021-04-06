import { isVNode as _isVNode, createVNode as _createVNode, mergeProps as _mergeProps } from "vue";
import RcCheckbox from 'ant-design-vue/lib/vc-checkbox';
import classnames from 'classnames';
import { defineComponent, ref, watch } from 'vue';

function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !_isVNode(s);
}

var Checkbox = defineComponent({
  name: 'MCheckbox',
  props: {
    prefixCls: {
      default: 'am-checkbox'
    },
    name: {
      type: String
    },
    wrapLabel: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var checked = ref(props.value || false);
    watch(function () {
      return props.value;
    }, function (value) {
      checked.value = value;
    });
    watch(function () {
      return checked.value;
    }, function (checked) {
      emit('update:value', checked);
    });

    var onClick = function onClick(e) {
      // e.stopPropagation();
      // e.preventDefault();
      checked.value = !checked.value;
      emit('update:value', checked.value);
    };

    return {
      onClick: onClick
    };
  },
  render: function render() {
    var _slot;

    var _this$$slots$default, _this$$slots;

    var prefixCls = this.prefixCls;
    var wrapCls = classnames("".concat(prefixCls, "-wrapper"));

    var mark = _createVNode("label", {
      "class": wrapCls
    }, [_createVNode(RcCheckbox, _mergeProps({
      "onClick": this.onClick,
      "checked": this.value
    }, this.$props), null), (_this$$slots$default = (_this$$slots = this.$slots).default) === null || _this$$slots$default === void 0 ? void 0 : _this$$slots$default.call(_this$$slots)]);

    if (this.wrapLabel) {
      return mark;
    }

    return _createVNode(RcCheckbox, _mergeProps({
      "onClick": this.onClick,
      "checked": this.value
    }, this.$props), _isSlot(_slot = this.$slots.default()) ? _slot : {
      default: function _default() {
        return [_slot];
      }
    });
  }
});
export default Checkbox;