import { isVNode as _isVNode, createVNode as _createVNode } from "vue";
import classnames from 'classnames';
import { defineComponent, onBeforeUnmount, onMounted, ref, Teleport } from 'vue';
import { addClass, removeClass } from '../../utils/class';
import CustomKeyboard from './custom-keyboard';

function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !_isVNode(s);
}

var instanceArr = [];
var customNumberKeyboard = null;
export default defineComponent({
  name: 'MNumberInput',
  props: {
    onConfirm: {},
    onChange: {},
    onFocus: {},
    onBlur: {},
    placeholder: {
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    editable: {
      type: Boolean,
      default: true
    },
    moneyKeyboardAlign: {},
    moneyKeyboardWrapProps: {},
    moneyKeyboardHeader: {},
    value: {
      type: [String, Number]
    },
    prefixCls: {
      default: 'am-input'
    },
    keyboardPrefixCls: {
      default: 'am-number-keyboard'
    },
    confirmLabel: {},
    backspaceLabel: {
      type: String
    },
    cancelKeyboardLabel: {
      type: String
    },
    maxLength: {
      type: Number
    },
    type: {}
  },
  watch: {
    value: function value(_value) {
      this.currentValue = _value;
    },
    focus: function focus(_focus) {
      if (_focus) {
        this.onInputFocus();
      }
    }
  },
  setup: function setup(props, _ref) {
    var _this = this;

    var emit = _ref.emit,
        slots = _ref.slots;
    var container = ref(null);
    var inputRef = ref(null);
    var focus = ref(false);
    var currentValue = ref(null);
    var keyboardRef = ref(null);

    var onChange = function onChange(value) {
      if (props.value === undefined) {
        currentValue.value = value.target.value;
      }

      emit('change', value);
    };

    var onConfirm = function onConfirm(value) {
      emit('confirm', value);
    };

    var addBlurListener = function addBlurListener() {
      document.addEventListener('click', doBlur, false);
    };

    var removeBlurListener = function removeBlurListener() {
      document.removeEventListener('click', doBlur, false);
    };

    var saveRef = function saveRef(el) {
      customNumberKeyboard = el;
      instanceArr.push({
        el: el,
        container: container.value
      });
    };

    var getComponent = function getComponent() {
      var confirmLabel = props.confirmLabel,
          backspaceLabel = props.backspaceLabel,
          cancelKeyboardLabel = props.cancelKeyboardLabel,
          keyboardPrefixCls = props.keyboardPrefixCls,
          moneyKeyboardWrapProps = props.moneyKeyboardWrapProps,
          moneyKeyboardHeader = props.moneyKeyboardHeader;
      return _createVNode(CustomKeyboard, {
        "ref": function ref(el) {
          keyboardRef.value = el;
        },
        "onClick": onKeyboardClick,
        "prefixCls": keyboardPrefixCls,
        "confirmLabel": confirmLabel,
        "backspaceLabel": backspaceLabel,
        "cancelKeyboardLabel": cancelKeyboardLabel,
        "wrapProps": moneyKeyboardWrapProps,
        "header": moneyKeyboardHeader
      }, null);
    };

    var getContainer = function getContainer() {
      var keyboardPrefixCls = props.keyboardPrefixCls;

      if (!container.value) {
        var _container = document.createElement('div');

        _container.setAttribute('id', "".concat(keyboardPrefixCls, "-container-").concat(new Date().getTime()));

        document.body.appendChild(_container);
        _container['value'] = _container;
      }

      return container.value;
    };

    var doBlur = function doBlur(ev) {
      if (ev.target !== inputRef.value) {
        onInputBlur(props.value.toString());
      }
    };

    var removeCurrentExtraKeyboard = function removeCurrentExtraKeyboard() {
      instanceArr = instanceArr.filter(function (item) {
        var el = item.el,
            container = item.container;

        if (el && container && el !== customNumberKeyboard) {
          container.parentNode.removeChild(container);
        }

        return el === customNumberKeyboard;
      });
    };

    var unLinkInput = function unLinkInput() {
      if (customNumberKeyboard && customNumberKeyboard.antmKeyboard && customNumberKeyboard.linkedInput && customNumberKeyboard.linkedInput === _this) {
        customNumberKeyboard.linkedInput = null;
        addClass(customNumberKeyboard.antmKeyboard, "".concat(props.keyboardPrefixCls, "-wrapper-hide"));
      } // for unmount


      removeBlurListener();
      removeCurrentExtraKeyboard();
    };

    var onInputBlur = function onInputBlur(value) {
      if (focus.value) {
        focus.value = false;
        emit('blur', value);
        setTimeout(function () {
          unLinkInput();
        }, 50);
      }
    };

    var onInputFocus = function onInputFocus(e) {
      emit('focus', props.value);
      focus.value = true;

      if (customNumberKeyboard) {
        customNumberKeyboard.linkedInput = _this;

        if (customNumberKeyboard.antmKeyboard) {
          removeClass(customNumberKeyboard.antmKeyboard, "".concat(props.keyboardPrefixCls, "-wrapper-hide"));
        }

        customNumberKeyboard.confirmDisabled = props.value === '';

        if (customNumberKeyboard.confirmKeyboardItem) {
          if (props.value === '') {
            addClass(customNumberKeyboard.confirmKeyboardItem, "".concat(props.keyboardPrefixCls, "-item-disabled"));
          } else {
            removeClass(customNumberKeyboard.confirmKeyboardItem, "".concat(props.keyboardPrefixCls, "-item-disabled"));
          }
        }
      }
    };

    var onKeyboardClick = function onKeyboardClick(keyboardItemValue) {
      var maxLength = props.maxLength,
          value = props.value; // tslint:disable-next-line:no-this-assignment

      var valueAfterChange; // 删除键

      if (keyboardItemValue === 'delete') {
        valueAfterChange = value.toString().substring(0, value.toString().length - 1);
        emit('change', {
          target: {
            value: valueAfterChange
          }
        }); // 确认键
      } else if (keyboardItemValue === 'confirm') {
        valueAfterChange = value;
        onChange({
          target: {
            value: valueAfterChange
          }
        });
        onInputBlur(value.toString());
        onConfirm(value); // 收起键
      } else if (keyboardItemValue === 'hide') {
        valueAfterChange = value;
        onInputBlur(valueAfterChange);
      } else {
        if (maxLength !== undefined && +maxLength >= 0 && (value + keyboardItemValue).length > maxLength) {
          valueAfterChange = (value + keyboardItemValue).substr(0, maxLength);
          onChange({
            target: {
              value: valueAfterChange
            }
          });
        } else {
          valueAfterChange = value + keyboardItemValue;
          onChange({
            target: {
              value: valueAfterChange
            }
          });
        }
      }

      if (customNumberKeyboard) {
        customNumberKeyboard.confirmDisabled = valueAfterChange === '';

        if (customNumberKeyboard.confirmKeyboardItem) {
          if (valueAfterChange === '') {
            addClass(customNumberKeyboard.confirmKeyboardItem, "".concat(props.keyboardPrefixCls, "-item-disabled"));
          } else {
            removeClass(customNumberKeyboard.confirmKeyboardItem, "".concat(props.keyboardPrefixCls, "-item-disabled"));
          }
        }
      }
    };

    var onFakeInputClick = function onFakeInputClick(e) {
      focusFunc(e);
    };

    var focusFunc = function focusFunc(e) {
      // this focus may invocked by users page button click, so this click may trigger blurEventListener at the same time
      removeBlurListener();

      if (!focus.value) {
        onInputFocus(e);
      }

      setTimeout(function () {
        addBlurListener();
      }, 50);
    };

    var renderPortal = function renderPortal() {
      var _slot;

      var props = {
        disabled: false,
        to: getContainer()
      };
      return _createVNode(Teleport, props, _isSlot(_slot = getComponent()) ? _slot : {
        default: function _default() {
          return [_slot];
        }
      });
    };

    {
      var _props$value;

      currentValue.value = ((_props$value = props.value) === null || _props$value === void 0 ? void 0 : _props$value.toString()) || '';
    }
    onBeforeUnmount(function () {
      // focus:true unmount 不能触发 blur
      if (!focus.value) {
        emit('blur', props.value);
      }

      unLinkInput();
    });
    onMounted(function () {
      saveRef(keyboardRef.value);
    });
    return {
      container: container,
      inputRef: inputRef,
      focus: focus,
      currentValue: currentValue,
      keyboardRef: keyboardRef,
      onChange: onChange,
      onConfirm: onConfirm,
      addBlurListener: addBlurListener,
      removeBlurListener: removeBlurListener,
      saveRef: saveRef,
      getComponent: getComponent,
      getContainer: getContainer,
      doBlur: doBlur,
      removeCurrentExtraKeyboard: removeCurrentExtraKeyboard,
      unLinkInput: unLinkInput,
      onInputBlur: onInputBlur,
      onInputFocus: onInputFocus,
      onKeyboardClick: onKeyboardClick,
      onFakeInputClick: onFakeInputClick,
      focusFunc: focusFunc,
      renderPortal: renderPortal
    };
  },
  render: function render() {
    var placeholder = this.placeholder,
        disabled = this.disabled,
        editable = this.editable,
        moneyKeyboardAlign = this.moneyKeyboardAlign;
    var focus = this.focus,
        value = this.value;
    var preventKeyboard = disabled || !editable;
    var fakeInputCls = classnames("fake-input", {
      focus: focus,
      'fake-input-disabled': disabled
    });
    var fakeInputContainerCls = classnames('fake-input-container', {
      'fake-input-container-left': moneyKeyboardAlign === 'left'
    });
    return _createVNode("div", {
      "class": fakeInputContainerCls
    }, [value === '' && _createVNode("div", {
      "class": "fake-input-placeholder"
    }, [placeholder]), _createVNode("div", {
      "role": "textbox",
      "class": fakeInputCls,
      "ref": "input",
      "onClick": preventKeyboard ? function () {} : this.onFakeInputClick
    }, [value]), this.renderPortal()]);
  }
});