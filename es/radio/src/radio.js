import _extends from "@babel/runtime/helpers/extends";
import { createVNode as _createVNode, mergeProps as _mergeProps } from "vue";
import RcCheckbox from 'ant-design-vue/lib/vc-checkbox';
import classnames from 'classnames';
import { defineComponent, ref } from 'vue';
var Radio = defineComponent({
  RadioItem: null,
  install: null,
  name: 'MRadio',
  props: {
    prefixCls: {
      type: String,
      default: 'am-radio'
    },
    listPrefixCls: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    name: {
      type: String
    },
    wrapLabel: {
      default: true
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

    var onClick = function onClick() {
      checked.value = !checked.value;
      emit('change', checked.value);
    };

    return {
      onClick: onClick
    };
  },
  render: function render() {
    var _this$$slots$default,
        _this$$slots,
        _this$$slots$default2,
        _this$$slots2,
        _this = this;

    var restProps = _extends({}, this.$props);

    var prefixCls = restProps.prefixCls;
    var wrapCls = classnames("".concat(prefixCls, "-wrapper"));

    if ('class' in restProps) {
      // Todo https://github.com/developit/preact-compat/issues/422

      /* tslint:disable:no-string-literal */
      delete restProps['class'];
    }

    var mark = _createVNode("label", {
      "class": wrapCls,
      "onClick": this.onClick
    }, [_createVNode(RcCheckbox, _mergeProps(this.$props, {
      "checked": this.value,
      "type": "radio"
    }), null), (_this$$slots$default = (_this$$slots = this.$slots).default) === null || _this$$slots$default === void 0 ? void 0 : _this$$slots$default.call(_this$$slots)]);

    if (this.wrapLabel) {
      return mark;
    }

    return _createVNode(RcCheckbox, _mergeProps({
      "type": "radio",
      "checked": this.value
    }, this.$props), {
      default: function _default() {
        return [(_this$$slots$default2 = (_this$$slots2 = _this.$slots).default) === null || _this$$slots$default2 === void 0 ? void 0 : _this$$slots$default2.call(_this$$slots2)];
      }
    });
  }
});
export default Radio;