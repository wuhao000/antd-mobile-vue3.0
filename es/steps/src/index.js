import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import { createVNode as _createVNode, mergeProps as _mergeProps } from "vue";
import classNames from 'classnames';
import { defineComponent, getCurrentInstance, provide } from 'vue';
import { filterHTMLAttrs } from '../../utils/dom';
import { unwrapFragment } from '../../utils/vue';
export default defineComponent({
  name: 'Step',
  props: {
    icon: {
      type: String
    },
    prefixCls: {
      type: String,
      default: 'am-steps'
    },
    iconPrefix: {
      type: String,
      default: 'ant'
    },
    direction: {
      type: String,
      default: 'vertical'
    },
    labelPlacement: {
      type: String,
      default: 'vertical'
    },
    status: {
      type: String,
      default: 'process'
    },
    size: {
      type: String,
      default: ''
    },
    progressDot: {
      type: Boolean,
      default: false
    },
    current: {
      type: Number,
      default: 0
    }
  },
  setup: function setup() {
    var instance = getCurrentInstance();
    provide('steps', instance);
    return {};
  },
  render: function render() {
    var _classNames;

    var prefixCls = this.prefixCls,
        direction = this.direction,
        labelPlacement = this.labelPlacement,
        iconPrefix = this.iconPrefix,
        status = this.status,
        size = this.size,
        current = this.current,
        progressDot = this.progressDot,
        restProps = _objectWithoutProperties(this, ["prefixCls", "direction", "labelPlacement", "iconPrefix", "status", "size", "current", "progressDot"]);

    var adjustedlabelPlacement = !!progressDot ? 'vertical' : labelPlacement;
    var classString = classNames(prefixCls, "".concat(prefixCls, "-").concat(direction), (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-").concat(size), size), _defineProperty(_classNames, "".concat(prefixCls, "-label-").concat(adjustedlabelPlacement), direction === 'horizontal'), _defineProperty(_classNames, "".concat(prefixCls, "-dot"), !!progressDot), _classNames));
    var content = unwrapFragment(this.$slots.default()).map(function (child, index) {
      if (!child) {
        return null;
      }

      var childProps = {
        stepNumber: index + 1,
        prefixCls: prefixCls,
        iconPrefix: iconPrefix,
        icon: child.props.icon || '',
        wrapperStyle: {},
        progressDot: progressDot,
        status: child.props.status || '',
        class: ''
      };
      var icon = childProps.icon;

      if (!icon) {
        if (index < current) {
          // 对应 state: finish
          icon = 'check-circle-o';
        } else if (index > current) {
          // 对应 state: wait
          icon = 'ellipsis';
          childProps.class = 'ellipsis-item';
        }

        if (status === 'error' && index === current || child.props.status === 'error') {
          icon = 'cross-circle-o';
        }
      }

      if (icon) {
        childProps.icon = icon;
      } // fix tail color


      if (status === 'error' && index === current - 1) {
        childProps.class = "".concat(prefixCls, "-next-error");
      }

      if (!child.props.status) {
        if (index === current) {
          childProps.status = status;
        } else if (index < current) {
          childProps.status = 'finish';
        } else {
          childProps.status = 'wait';
        }
      }

      Object.keys(childProps).forEach(function (key) {
        child.props[key] = childProps[key];
      });
      return child;
    });
    return _createVNode("div", _mergeProps({
      "class": classString
    }, filterHTMLAttrs(restProps)), [content]);
  }
});