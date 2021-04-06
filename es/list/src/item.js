import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { isVNode as _isVNode, createVNode as _createVNode } from "vue";

/* tslint:disable:jsx-no-multiline-js */
import classNames from 'classnames';
import { computed, defineComponent, getCurrentInstance, inject, onBeforeUnmount, ref } from 'vue';
import Popover from '../../popover';
import toast from '../../toast';
import { isEmptySlot } from '../../utils/vnode';
import TouchFeedback from '../../vmc-feedback';

function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !_isVNode(s);
}

var Brief = defineComponent({
  name: 'Brief',
  props: {
    prefixCls: {},
    role: {}
  },
  render: function render() {
    return _createVNode("div", {
      "class": "am-list-brief"
    }, [this.$slots.default()]);
  }
});
var Item = defineComponent({
  inheritAttrs: false,
  name: 'ListItem',
  props: {
    text: {
      type: Boolean,
      default: false
    },
    prefixCls: {
      default: 'am-list'
    },
    role: {
      type: String
    },
    platform: {
      type: String,
      default: 'iOS'
    },
    thumb: {
      type: [String, Object]
    },
    extra: {
      type: [String, Object]
    },
    extraPosition: {
      type: String,
      default: 'right'
    },
    activeStyle: {
      type: Object
    },
    multipleLine: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    errorMessage: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    align: {
      type: String,
      default: 'middle'
    },
    wrap: {
      type: Boolean
    },
    arrow: {
      type: String
    },
    title: {
      type: [String, Object],
      default: ''
    },
    labelPosition: {
      type: String,
      default: 'left'
    },
    contentStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    extraStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    touchFeedback: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    suffix: {},
    errorDisplayType: {
      type: String,
      default: 'text'
    }
  },
  Brief: Brief,
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots,
        attrs = _ref.attrs;
    var debounceTimeout = ref(null);
    var coverRippleStyle = ref({
      display: 'none'
    });
    var rippleClicked = ref(false);
    var list = inject('list');
    var showErrorPopover = false;
    var instance = getCurrentInstance();
    var actualError = computed(function () {
      var _ref2, _props$error;

      return (_ref2 = (_props$error = props.error) !== null && _props$error !== void 0 ? _props$error : instance.parent['error']) !== null && _ref2 !== void 0 ? _ref2 : false;
    });
    var actualErrorMessage = computed(function () {
      return props.errorMessage || instance.parent['errorMessage'];
    });
    var actualDisabled = computed(function () {
      return props.disabled;
    });
    var actualErrorDisplayType = computed(function () {
      var _props$errorDisplayTy;

      return (_props$errorDisplayTy = props.errorDisplayType) !== null && _props$errorDisplayTy !== void 0 ? _props$errorDisplayTy : instance.parent['errorDisplayType'];
    });

    var onClick = function onClick(ev) {
      ev.stopPropagation();
      var isAndroid = props.platform === 'android';

      if (isAndroid) {
        if (debounceTimeout.value) {
          clearTimeout(debounceTimeout.value);
          debounceTimeout.value = null;
        }

        var _Item = ev.currentTarget;
        var RippleWidth = Math.max(_Item.offsetHeight, _Item.offsetWidth);
        var ClientRect = ev.currentTarget.getBoundingClientRect();
        var pointX = ev.clientX - ClientRect.left - _Item.offsetWidth / 2;
        var pointY = ev.clientY - ClientRect.top - _Item.offsetWidth / 2;
        coverRippleStyle.value = {
          width: "".concat(RippleWidth, "px"),
          height: "".concat(RippleWidth, "px"),
          left: "".concat(pointX, "px"),
          top: "".concat(pointY, "px")
        };
        rippleClicked.value = true;
        debounceTimeout.value = setTimeout(function () {
          coverRippleStyle.value = {
            display: 'none'
          };
          rippleClicked.value = false;
        }, 1000);
      }

      emit('click');
    };

    var renderExtra = function renderExtra() {
      var _slots$extra;

      return !isEmptySlot(slots.extra) || props.extra ? _createVNode("div", {
        "style": props.extraStyle,
        "class": classNames("".concat(props.prefixCls, "-extra"), _defineProperty({}, "".concat(props.prefixCls, "-extra-text"), props.text))
      }, [((_slots$extra = slots.extra) === null || _slots$extra === void 0 ? void 0 : _slots$extra.call(slots)) || props.extra, props.errorDisplayType === 'text' && actualError.value && actualErrorMessage.value ? _createVNode("div", null, [actualErrorMessage.value]) : null]) : null;
    };

    var renderThumb = function renderThumb() {
      var thumb = props.thumb,
          prefixCls = props.prefixCls;

      if (slots.thumb) {
        return _createVNode("div", {
          "class": "".concat(prefixCls, "-thumb")
        }, [slots.thumb()]);
      } else if (thumb) {
        return _createVNode("div", {
          "class": "".concat(prefixCls, "-thumb")
        }, [typeof thumb === 'string' ? _createVNode("img", {
          "src": thumb
        }, null) : thumb]);
      } else if (props.required) {
        return _createVNode("div", {
          "class": "".concat(prefixCls, "-required")
        }, null);
      } else {
        return null;
      }
    };

    var renderLabel = function renderLabel() {
      if (!isEmptySlot(slots.default)) {
        return _createVNode("div", {
          "class": "".concat(props.prefixCls, "-content"),
          "style": props.contentStyle
        }, [slots.default()]);
      } else if (props.title) {
        return _createVNode("div", {
          "class": "".concat(props.prefixCls, "-content"),
          "style": props.contentStyle
        }, [props.title]);
      } else {
        return null;
      }
    };

    var renderControl = function renderControl() {
      return slots.control ? _createVNode("div", {
        "class": props.prefixCls + '-control'
      }, [slots.control()]) : null;
    };

    onBeforeUnmount(function () {
      if (debounceTimeout.value) {
        clearTimeout(debounceTimeout.value);
        debounceTimeout.value = null;
      }
    });
    return {
      coverRippleStyle: coverRippleStyle,
      rippleClicked: rippleClicked,
      actualErrorDisplayType: actualErrorDisplayType,
      actualError: actualError,
      actualDisabled: actualDisabled,
      onClick: onClick,
      renderThumb: renderThumb,
      renderLabel: renderLabel,
      renderControl: renderControl,
      renderExtra: renderExtra,
      actualErrorMessage: actualErrorMessage,
      showErrorPopover: showErrorPopover,
      list: list
    };
  },
  render: function render() {
    var _this$$attrs$class,
        _classNames2,
        _classNames4,
        _classNames5,
        _this = this,
        _this$$slots$suffix,
        _this$$slots;

    var prefixCls = this.prefixCls,
        activeStyle = this.activeStyle,
        align = this.align,
        wrap = this.wrap,
        disabled = this.disabled,
        multipleLine = this.multipleLine,
        arrow = this.arrow,
        actualError = this.actualError;
    var coverRippleStyle = this.coverRippleStyle,
        rippleClicked = this.rippleClicked;
    var section = this.$parent['section'];
    var wrapCls = classNames("".concat(prefixCls, "-item"), "".concat(prefixCls, "-item-label-") + this.labelPosition, (_this$$attrs$class = this.$attrs.class) !== null && _this$$attrs$class !== void 0 ? _this$$attrs$class : '', (_classNames2 = {}, _defineProperty(_classNames2, "".concat(prefixCls, "-item-disabled"), this.actualDisabled), _defineProperty(_classNames2, "".concat(prefixCls, "-item-error"), actualError), _defineProperty(_classNames2, "".concat(prefixCls, "-item-error-text"), actualError && this.actualErrorDisplayType === 'text'), _defineProperty(_classNames2, "".concat(prefixCls, "-item-top"), align === 'top'), _defineProperty(_classNames2, "".concat(prefixCls, "-item-middle"), align === 'middle'), _defineProperty(_classNames2, "".concat(prefixCls, "-item-bottom"), align === 'bottom'), _defineProperty(_classNames2, "".concat(prefixCls, "-item-section"), section), _defineProperty(_classNames2, "".concat(prefixCls, "-item-extra-left"), this.extraPosition === 'left'), _defineProperty(_classNames2, "".concat(prefixCls, "-item-extra-center"), this.extraPosition === 'center'), _defineProperty(_classNames2, "".concat(prefixCls, "-item-extra-right"), this.extraPosition === 'right'), _classNames2));
    var rippleCls = classNames("".concat(prefixCls, "-ripple"), _defineProperty({}, "".concat(prefixCls, "-ripple-animate"), rippleClicked));
    var lineCls = classNames("".concat(prefixCls, "-line"), (_classNames4 = {}, _defineProperty(_classNames4, "".concat(prefixCls, "-line-multiple"), multipleLine), _defineProperty(_classNames4, "".concat(prefixCls, "-line-wrap"), wrap), _classNames4));
    var arrowCls = classNames("".concat(prefixCls, "-arrow"), (_classNames5 = {}, _defineProperty(_classNames5, "".concat(prefixCls, "-arrow-horizontal"), arrow === 'horizontal'), _defineProperty(_classNames5, "".concat(prefixCls, "-arrow-vertical"), arrow === 'down' || arrow === 'up'), _defineProperty(_classNames5, "".concat(prefixCls, "-arrow-vertical-up"), arrow === 'up'), _classNames5));

    var content = _createVNode("div", {
      "onClick": this.onClick,
      "class": wrapCls
    }, [this.renderThumb(), _createVNode("div", {
      "class": lineCls
    }, [this.renderLabel(), this.renderControl(), this.renderExtra(), arrow && _createVNode("div", {
      "class": arrowCls,
      "aria-hidden": "true"
    }, null), this.actualError && this.errorDisplayType !== 'text' ? _createVNode("div", {
      "class": "".concat(prefixCls, "-error-extra"),
      "onClick": function onClick(e) {
        if (_this.actualErrorMessage) {
          if (_this.actualErrorDisplayType === 'toast') {
            toast.fail(_this.actualErrorMessage);
          }

          if (_this.actualErrorDisplayType === 'popover' && !_this.showErrorPopover) {
            _this.showErrorPopover = true;
          }
        }

        _this.$emit('error-click', e);

        _this.$emit('errorClick', e);
      }
    }, [this.errorDisplayType === 'popover' ? _createVNode(Popover, {
      'value': _this.showErrorPopover,
      "onUpdate:value": function onUpdateValue($event) {
        return _this.showErrorPopover = $event;
      },
      "mask": false
    }, {
      default: function _default() {
        return [_createVNode(Popover.Item, {
          "slot": "content"
        }, {
          default: function _default() {
            return [_this.errorMessage];
          }
        })];
      }
    }) : null]) : null, this.$slots.suffix || this.suffix ? _createVNode("div", {
      "class": this.prefixCls + '-suffix'
    }, [((_this$$slots$suffix = (_this$$slots = this.$slots).suffix) === null || _this$$slots$suffix === void 0 ? void 0 : _this$$slots$suffix.call(_this$$slots)) || this.suffix]) : null]), _createVNode("div", {
      "style": coverRippleStyle,
      "class": rippleCls
    }, null)]);

    return (// @ts-ignore
      _createVNode(TouchFeedback, {
        "disabled": disabled || !this.onClick || !this.touchFeedback || this.list && !this.list.touchFeedback,
        "activeStyle": activeStyle,
        "activeClassName": "".concat(prefixCls, "-item-active")
      }, _isSlot(content) ? content : {
        default: function _default() {
          return [content];
        }
      })
    );
  }
});
export default Item;