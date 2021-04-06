import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { mergeProps as _mergeProps, createVNode as _createVNode } from "vue";
import classnames from 'classnames';
import { defineComponent, reactive, watch } from 'vue';
import Icon from '../../icon';
import getDataAttr from '../../utils/get-data-attr';
import TouchFeedback from '../../vmc-feedback';
var Tag = defineComponent({
  name: 'Tag',
  props: {
    prefixCls: {
      type: String,
      default: 'am-tag'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Boolean,
      default: false
    },
    closable: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    }
  },
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var state = reactive({
      selected: props.selected,
      closed: false
    });
    watch(function () {
      return props.selected;
    }, function (selected) {
      state.selected = selected;
    });

    var onClick = function onClick() {
      var disabled = props.disabled;

      if (disabled) {
        return;
      }

      var isSelect = state.selected;
      state.selected = !isSelect;
      emit('change', !isSelect);
    };

    var onTagClose = function onTagClose() {
      state.closed = true;
      emit('close');
    };

    return {
      onClick: onClick,
      state: state,
      onTagClose: onTagClose
    };
  },
  render: function render() {
    var _classnames,
        _this = this,
        _this$$slots$default,
        _this$$slots;

    var prefixCls = this.prefixCls,
        disabled = this.disabled,
        closable = this.closable,
        small = this.small;
    var wrapCls = classnames(prefixCls, (_classnames = {}, _defineProperty(_classnames, "".concat(prefixCls, "-normal"), !disabled && (!this.state.selected || small || closable)), _defineProperty(_classnames, "".concat(prefixCls, "-small"), small), _defineProperty(_classnames, "".concat(prefixCls, "-active"), this.state.selected && !disabled && !small && !closable), _defineProperty(_classnames, "".concat(prefixCls, "-disabled"), disabled), _defineProperty(_classnames, "".concat(prefixCls, "-closable"), closable), _classnames));
    var closableDom = closable && !disabled && !small ? _createVNode(TouchFeedback, {
      "activeClassName": "".concat(prefixCls, "-close-active")
    }, {
      default: function _default() {
        return [_createVNode("div", {
          "class": "".concat(prefixCls, "-close"),
          "role": "button",
          "onClick": _this.onTagClose.bind(_this),
          "aria-label": "remove tag"
        }, [_createVNode(Icon, {
          "type": "cross-circle",
          "size": "xs",
          "aria-hidden": "true"
        }, null)])];
      }
    }) : null;
    return !this.state.closed ? _createVNode("div", _mergeProps(getDataAttr(this.$props), {
      "class": wrapCls,
      "onClick": this.onClick
    }), [_createVNode("div", {
      "class": "".concat(prefixCls, "-text")
    }, [(_this$$slots$default = (_this$$slots = this.$slots).default) === null || _this$$slots$default === void 0 ? void 0 : _this$$slots$default.call(_this$$slots)]), closableDom]) : null;
  }
});
export default Tag;