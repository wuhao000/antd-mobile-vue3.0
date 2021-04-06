import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { mergeProps as _mergeProps, createVNode as _createVNode } from "vue";
import classNames from 'classnames';
import { computed, defineComponent, inject, isVNode } from 'vue';
import Icon from '../../icon';

function isString(str) {
  return typeof str === 'string';
}

var statusIcon = {
  finish: 'check-circle',
  error: 'cross-circle-o',
  wait: 'ellipsis'
};
export default defineComponent({
  name: 'Step',
  props: {
    prefixCls: {
      type: String,
      default: 'am-step'
    },
    wrapperStyle: {},
    itemWidth: {
      type: [Number, String]
    },
    status: {
      type: String
    },
    iconPrefix: {
      type: String,
      default: 'ant'
    },

    /**
     * 图标类型，仅支持的图标名称
     */
    icon: {
      type: String
    },
    adjustMarginRight: {
      type: [Number, String]
    },
    stepNumber: {
      type: Number
    },
    description: {
      type: String
    },
    title: {
      type: String
    },
    progressDot: {}
  },
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var steps = inject('steps');
    var iconSize = computed(function () {
      if (steps.size === 'small') {
        return 18;
      } else {
        return 22;
      }
    });

    var renderIconNode = function renderIconNode() {
      var _classNames;

      var prefixCls = props.prefixCls,
          progressDot = props.progressDot,
          stepNumber = props.stepNumber,
          status = props.status,
          title = props.title,
          description = props.description,
          icon = props.icon,
          iconPrefix = props.iconPrefix;

      if (slots.icon) {
        var _slots$icon;

        return _createVNode("span", {
          "class": "".concat(prefixCls, "-icon")
        }, [(_slots$icon = slots.icon) === null || _slots$icon === void 0 ? void 0 : _slots$icon.call(slots)]);
      }

      var iconNode;
      var iconClassName = classNames("".concat(prefixCls, "-icon"), "".concat(iconPrefix, "icon"), (_classNames = {}, _defineProperty(_classNames, "".concat(iconPrefix, "icon-").concat(icon), icon && isString(icon)), _defineProperty(_classNames, "".concat(iconPrefix, "icon-check"), !icon && status === 'finish'), _defineProperty(_classNames, "".concat(iconPrefix, "icon-cross"), !icon && status === 'error'), _classNames));
      var iconStyle = {
        position: 'relative',
        left: '-1px'
      };

      var iconDot = _createVNode("span", {
        "class": "".concat(prefixCls, "-icon-dot")
      }, null); // `progressDot` enjoy the highest priority


      if (progressDot) {
        if (typeof progressDot === 'function') {
          iconNode = _createVNode("span", {
            "class": "".concat(prefixCls, "-icon")
          }, [progressDot(iconDot, {
            index: stepNumber - 1,
            status: status,
            title: title,
            description: description
          })]);
        } else {
          iconNode = _createVNode("span", {
            "class": "".concat(prefixCls, "-icon")
          }, [iconDot]);
        }
      } else if (icon && isString(icon)) {
        iconNode = _createVNode("span", {
          "class": "".concat(prefixCls, "-icon")
        }, [_createVNode(Icon, {
          "style": iconStyle,
          "size": iconSize.value,
          "type": icon
        }, null)]);
      } else if (isVNode(icon)) {
        iconNode = _createVNode("span", {
          "class": iconClassName
        }, [icon]);
      } else if (status === 'finish' || status === 'error') {
        iconNode = _createVNode("span", {
          "class": iconClassName
        }, null);
      } else {
        iconNode = _createVNode("span", {
          "class": "".concat(prefixCls, "-icon")
        }, [stepNumber]);
      }

      return iconNode;
    };

    return {
      renderIconNode: renderIconNode
    };
  },
  render: function render() {
    var _this$$slots$title, _this$$slots, _this$$slots$title2, _this$$slots$descript, _this$$slots2, _this$$slots2$descrip;

    var prefixCls = this.prefixCls,
        itemWidth = this.itemWidth,
        _this$status = this.status,
        status = _this$status === void 0 ? 'wait' : _this$status,
        iconPrefix = this.iconPrefix,
        icon = this.icon,
        wrapperStyle = this.wrapperStyle,
        adjustMarginRight = this.adjustMarginRight,
        stepNumber = this.stepNumber,
        description = this.description,
        title = this.title,
        progressDot = this.progressDot,
        restProps = _objectWithoutProperties(this, ["prefixCls", "itemWidth", "status", "iconPrefix", "icon", "wrapperStyle", "adjustMarginRight", "stepNumber", "description", "title", "progressDot"]);

    var classString = classNames("".concat(prefixCls, "-item"), "".concat(prefixCls, "-item-").concat(status), _defineProperty({}, "".concat(prefixCls, "-item-custom"), icon));
    var stepItemStyle = {};

    if (itemWidth) {
      stepItemStyle.width = itemWidth;
    }

    if (adjustMarginRight) {
      stepItemStyle.marginRight = adjustMarginRight;
    }

    return _createVNode("div", _mergeProps(restProps, {
      "class": classString,
      "style": stepItemStyle
    }), [_createVNode("div", {
      "class": "".concat(prefixCls, "-item-tail")
    }, null), _createVNode("div", {
      "class": "".concat(prefixCls, "-item-icon")
    }, [this.renderIconNode()]), _createVNode("div", {
      "class": "".concat(prefixCls, "-item-content")
    }, [_createVNode("div", {
      "class": "".concat(prefixCls, "-item-title")
    }, [(_this$$slots$title = (_this$$slots = this.$slots) === null || _this$$slots === void 0 ? void 0 : (_this$$slots$title2 = _this$$slots.title) === null || _this$$slots$title2 === void 0 ? void 0 : _this$$slots$title2.call(_this$$slots)) !== null && _this$$slots$title !== void 0 ? _this$$slots$title : title]), (description || this.$slots.description) && _createVNode("div", {
      "class": "".concat(prefixCls, "-item-description")
    }, [(_this$$slots$descript = (_this$$slots2 = this.$slots) === null || _this$$slots2 === void 0 ? void 0 : (_this$$slots2$descrip = _this$$slots2.description) === null || _this$$slots2$descrip === void 0 ? void 0 : _this$$slots2$descrip.call(_this$$slots2)) !== null && _this$$slots$descript !== void 0 ? _this$$slots$descript : description])])]);
  }
});