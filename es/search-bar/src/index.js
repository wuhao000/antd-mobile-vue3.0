import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { createVNode as _createVNode } from "vue";
import classnames from 'classnames';
import { defineComponent, onBeforeUnmount, onMounted, onUpdated, reactive, ref, watch } from 'vue';
import TouchFeedback from '../../vmc-feedback';

function onNextFrame(cb) {
  if (window.requestAnimationFrame) {
    return window.requestAnimationFrame(cb);
  }

  return window.setTimeout(cb, 1);
}

function clearNextFrameAction(nextFrameId) {
  if (window.cancelAnimationFrame) {
    window.cancelAnimationFrame(nextFrameId);
  } else {
    window.clearTimeout(nextFrameId);
  }
}

export default defineComponent({
  name: 'SearchBar',
  props: {
    prefixCls: {
      type: String,
      default: 'am-search'
    },
    defaultValue: {
      type: String
    },
    value: {
      type: String
    },
    placeholder: {
      type: String
    },
    showCancelButton: {
      type: Boolean
    },
    cancelText: {
      type: String
    },
    disabled: {
      type: Boolean
    },
    autoFocus: {
      type: Boolean
    },
    focused: {
      type: Boolean
    },
    maxLength: {
      type: Number
    }
  },
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        attrs = _ref.attrs,
        slots = _ref.slots;
    var rightBtnInitMarginleft = ref(null);
    var firstFocus = ref(null);
    var blurFromOnClear = ref(null);
    var onBlurTimeout = ref(null);
    var state = reactive({
      value: props.value || '',
      focus: false
    });
    watch(function () {
      return props.value;
    }, function (value) {
      state.value = value;
    });
    watch(function () {
      return state.value;
    }, function (value) {
      emit('update:value', value);
    });
    var inputRef = ref(null);
    var rightBtnRef = ref(null);
    var syntheticPhContainerRef = ref(null);
    var syntheticPhRef = ref(null);
    var inputContainerRef = ref(null);

    var update = function update() {
      if (syntheticPhRef.value) {
        if (inputContainerRef.value && inputContainerRef.value.className.indexOf("".concat(props.prefixCls, "-start")) > -1) {
          // 检测是否包含名为 ${this.props.prefixCls}-start 样式，生成动画
          // offsetWidth 某些时候是向上取整，某些时候是向下取整，不能用
          if (syntheticPhContainerRef.value) {
            var realWidth = syntheticPhContainerRef.value.getBoundingClientRect().width; // 包含小数

            syntheticPhRef.value.style.width = "".concat(Math.ceil(realWidth), "px");
          }

          if (!props.showCancelButton && rightBtnRef.value) {
            rightBtnRef.value.style.marginRight = '0';
          }
        } else {
          syntheticPhRef.value.style.width = '100%';

          if (!props.showCancelButton && rightBtnRef.value) {
            rightBtnRef.value.style.marginRight = "-".concat(rightBtnRef.value.offsetWidth + (rightBtnInitMarginleft.value != null ? parseInt(rightBtnInitMarginleft.value, 10) : 0), "px");
          }
        }
      }
    };

    var onSubmit = function onSubmit(e) {
      e.preventDefault();
      emit('submit', state.value || '');

      if (inputRef.value) {
        inputRef.value.blur();
      }
    };

    var onChange = function onChange(e) {
      if (!state.focus) {
        state.focus = true;
      }

      var value = e.target.value;
      state.value = value;
      emit('change', value);
    };

    var onFocus = function onFocus() {
      state.focus = true;
      firstFocus.value = true;
      emit('focus');
    };

    var onBlur = function onBlur() {
      onBlurTimeout.value = onNextFrame(function () {
        if (!blurFromOnClear.value) {
          if (document.activeElement !== inputRef.value) {
            state.focus = false;
          }
        }

        blurFromOnClear.value = false;
      }); // fix autoFocus item blur with flash

      if (attrs.onBlur) {
        setTimeout(function () {
          // fix ios12 wechat browser click failure after input
          if (document.body) {
            document.body.scrollTop = document.body.scrollTop;
          }
        }, 100);
        emit('blur');
      }
    };

    var onClear = function onClear() {
      doClear();
    };

    var doClear = function doClear() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      blurFromOnClear.value = value;
      state.value = '';
      emit('clear');
      emit('change');

      if (blurFromOnClear) {
        focus();
      }
    };

    var onCancel = function onCancel() {
      emit('cancel');
      doClear(false);
    };

    var focus = function focus() {
      if (inputRef.value) {
        inputRef.value.focus();
      }
    };

    onMounted(function () {
      if (rightBtnRef.value) {
        var initBtn = window.getComputedStyle(rightBtnRef.value);
        rightBtnInitMarginleft.value = initBtn.marginLeft;
      }

      update();
    });
    onUpdated(function () {
      update();
    });
    onBeforeUnmount(function () {
      if (onBlurTimeout.value) {
        clearNextFrameAction(onBlurTimeout.value);
        onBlurTimeout.value = null;
      }
    });
    return {
      state: state,
      firstFocus: firstFocus,
      onClear: onClear,
      inputRef: inputRef,
      rightBtnRef: rightBtnRef,
      syntheticPhContainerRef: syntheticPhContainerRef,
      syntheticPhRef: syntheticPhRef,
      inputContainerRef: inputContainerRef,
      onCancel: onCancel,
      onBlur: onBlur,
      onChange: onChange,
      onFocus: onFocus,
      onSubmit: onSubmit
    };
  },
  render: function render() {
    var _classnames3,
        _this = this;

    var prefixCls = this.prefixCls,
        showCancelButton = this.showCancelButton,
        disabled = this.disabled,
        placeholder = this.placeholder,
        maxLength = this.maxLength; // tslint:disable-next-line:variable-name

    var cancelText = '取消';
    var _this$state = this.state,
        value = _this$state.value,
        focus = _this$state.focus;
    var wrapCls = classnames(prefixCls, _defineProperty({}, "".concat(prefixCls, "-start"), focus || value && value.length > 0));
    var clearCls = classnames("".concat(prefixCls, "-clear"), _defineProperty({}, "".concat(prefixCls, "-clear-show"), focus && value && value.length > 0));
    var cancelCls = classnames("".concat(prefixCls, "-cancel"), (_classnames3 = {}, _defineProperty(_classnames3, "".concat(prefixCls, "-cancel-show"), showCancelButton || focus || value && value.length > 0), _defineProperty(_classnames3, "".concat(prefixCls, "-cancel-anim"), this.firstFocus), _classnames3));
    var TouchFeedback2 = TouchFeedback;
    return _createVNode("form", {
      "onSubmit": this.onSubmit,
      "class": wrapCls,
      "ref": this.inputContainerRef,
      "action": "#"
    }, [_createVNode("div", {
      "class": "".concat(prefixCls, "-input")
    }, [_createVNode("div", {
      "class": "".concat(prefixCls, "-synthetic-ph"),
      "ref": this.syntheticPhRef
    }, [_createVNode("span", {
      "class": "".concat(prefixCls, "-synthetic-ph-container"),
      "ref": this.syntheticPhContainerRef
    }, [_createVNode("i", {
      "class": "".concat(prefixCls, "-synthetic-ph-icon")
    }, null), _createVNode("span", {
      "class": "".concat(prefixCls, "-synthetic-ph-placeholder"),
      "style": {
        visibility: placeholder && !value ? 'visible' : 'hidden'
      }
    }, [placeholder])])]), _createVNode("input", {
      "type": "search",
      "class": "".concat(prefixCls, "-value"),
      "value": value,
      "disabled": disabled,
      "placeholder": placeholder,
      "onInput": this.onChange,
      "onChange": this.onChange,
      "onFocus": this.onFocus,
      "onBlur": this.onBlur,
      "ref": this.inputRef,
      "maxlength": maxLength
    }, null), _createVNode(TouchFeedback2, {
      "activeclass": "".concat(prefixCls, "-clear-active")
    }, {
      default: function _default() {
        return [_createVNode("a", {
          "onClick": _this.onClear,
          "class": clearCls
        }, null)];
      }
    })]), _createVNode("div", {
      "class": cancelCls,
      "onClick": this.onCancel,
      "ref": this.rightBtnRef
    }, [this.cancelText || cancelText])]);
  }
});