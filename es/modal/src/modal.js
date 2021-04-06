import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import { mergeProps as _mergeProps, createVNode as _createVNode } from "vue";
import Dialog from 'ant-design-vue/lib/vc-dialog';
import classnames from 'classnames';
import { defineComponent } from 'vue';
import TouchFeedback from '../../vmc-feedback';
var Modal = defineComponent({
  alert: null,
  confirm: null,
  prompt: null,
  operation: null,
  install: null,
  name: 'Modal',
  props: {
    prefixCls: {
      default: 'am-modal'
    },
    transitionName: {
      type: String
    },
    maskTransitionName: {
      type: String
    },
    wrapClassName: {
      type: String
    },
    wrapProps: {},
    platform: {
      type: String,
      default: 'ios'
    },
    bodyStyle: {},
    title: {},
    maskClosable: {
      type: Boolean,
      default: true
    },
    closable: {
      type: Boolean,
      default: false
    },
    footer: {
      default: function _default() {
        return [];
      }
    },
    className: {
      type: [String, Object]
    },
    onClose: {},
    transparent: {
      type: Boolean,
      default: false
    },
    popup: {
      type: Boolean,
      default: false
    },
    animated: {
      type: Boolean,
      default: true
    },
    animationType: {
      type: String,
      default: 'slide-down'
    },
    onAnimationEnd: {},
    animateAppear: {
      type: Boolean
    },
    operation: {
      type: Boolean,
      default: false
    }
  },
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;

    var renderFooterButton = function renderFooterButton(button, prefixCls, i) {
      var buttonStyle = {};

      if (button.style) {
        buttonStyle = button.style;

        if (typeof buttonStyle === 'string') {
          var styleMap = {
            cancel: {},
            default: {},
            destructive: {
              color: 'red'
            }
          };
          buttonStyle = styleMap[buttonStyle] || {};
        }
      }

      var onClickFn = function onClickFn(e) {
        e.preventDefault();

        if (button.onPress) {
          button.onPress();
        }
      };

      return (// @ts-ignore
        _createVNode(TouchFeedback, {
          "activeClassName": "".concat(prefixCls, "-button-active"),
          "key": i
        }, {
          default: function _default() {
            return [_createVNode("a", {
              "class": "".concat(prefixCls, "-button"),
              "role": "button",
              "style": buttonStyle,
              "onClick": onClickFn
            }, [button.text || "Button"])];
          }
        })
      );
    };

    return {
      renderFooterButton: renderFooterButton
    };
  },
  render: function render() {
    var _this = this,
        _classnames2,
        _this$$slots$default,
        _this$$slots;

    var _this$$props = this.$props,
        prefixCls = _this$$props.prefixCls,
        wrapClassName = _this$$props.wrapClassName,
        transitionName = _this$$props.transitionName,
        maskTransitionName = _this$$props.maskTransitionName,
        platform = _this$$props.platform,
        _this$$props$footer = _this$$props.footer,
        footer = _this$$props$footer === void 0 ? [] : _this$$props$footer,
        operation = _this$$props.operation,
        animated = _this$$props.animated,
        transparent = _this$$props.transparent,
        popup = _this$$props.popup,
        animationType = _this$$props.animationType,
        restProps = _objectWithoutProperties(_this$$props, ["prefixCls", "wrapClassName", "transitionName", "maskTransitionName", "platform", "footer", "operation", "animated", "transparent", "popup", "animationType"]);

    var btnGroupClass = classnames("".concat(prefixCls, "-button-group-").concat(footer.length === 2 && !operation ? 'h' : 'v'), "".concat(prefixCls, "-button-group-").concat(operation ? 'operation' : 'normal'));
    var footerDom = footer.length ? _createVNode("div", {
      "class": btnGroupClass,
      "role": "group"
    }, [footer.map(function (button, i) {
      return (// tslint:disable-next-line:jsx-no-multiline-js
        _this.renderFooterButton(button, prefixCls, i)
      );
    })]) : null;
    var transName;
    var maskTransName;

    if (animated) {
      // tslint:disable-next-line:prefer-conditional-expression
      if (transparent) {
        transName = maskTransName = 'am-fade';
      } else {
        transName = maskTransName = 'am-slide-up';
      }

      if (popup) {
        transName = animationType === 'slide-up' ? 'am-slide-up' : 'am-slide-down';
        maskTransName = 'am-fade';
      }
    }

    var wrapCls = classnames(wrapClassName, _defineProperty({}, "".concat(prefixCls, "-wrap-popup"), popup));
    var cls = classnames(this.className, (_classnames2 = {}, _defineProperty(_classnames2, "".concat(prefixCls, "-transparent"), transparent), _defineProperty(_classnames2, "".concat(prefixCls, "-popup"), popup), _defineProperty(_classnames2, "".concat(prefixCls, "-operation"), operation), _defineProperty(_classnames2, "".concat(prefixCls, "-popup-").concat(animationType), popup && animationType), _defineProperty(_classnames2, "".concat(prefixCls, "-android"), platform === 'android'), _classnames2));
    return (// @ts-ignore
      _createVNode(Dialog, _mergeProps(restProps, {
        "maskClosable": this.maskClosable,
        "visible": this.popup,
        "prefixCls": prefixCls,
        "title": this.title,
        "closable": this.closable,
        "class": cls,
        "onClose": this.onClose || function (e) {
          _this.$emit('change', false);

          _this.$emit('close', e);
        },
        "wrapClassName": wrapCls,
        "transitionName": transitionName || transName,
        "maskTransitionName": maskTransitionName || maskTransName,
        "footer": footerDom
      }), {
        default: function _default() {
          return [(_this$$slots$default = (_this$$slots = _this.$slots).default) === null || _this$$slots$default === void 0 ? void 0 : _this$$slots$default.call(_this$$slots)];
        }
      })
    );
  }
});
export default Modal;