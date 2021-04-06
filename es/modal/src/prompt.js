import { createVNode as _createVNode } from "vue";
import { createApp } from 'vue';
import closest from '../../utils/closest';
import Modal from './modal';
export default function prompt(title, message) {
  var callbackOrActions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [{
    text: '取消'
  }, {
    text: '确认'
  }];
  var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'default';
  var defaultValue = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
  var placeholders = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : ['', ''];
  var platform = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 'ios';
  var closed = false;
  return new Promise(function (resolve, reject) {
    var copyDefaultValue = typeof defaultValue === 'string' ? defaultValue : typeof defaultValue === 'number' ? "".concat(defaultValue) : '';
    var prefixCls = 'am-modal';
    var data = {
      text: copyDefaultValue
    };

    function onChange(e) {
      var target = e.target;
      var inputType = target.getAttribute('type');

      if (inputType !== null) {
        data[inputType] = target.value;
      }
    } // hotfix issue: https://github.com/ant-design/ant-design-mobile/issues/2177


    function onClick(e) {
      var target = e.currentTarget || e.target;

      if (target) {
        target.focus();
      }
    }

    var focusFn = function focusFn(input) {
      setTimeout(function () {
        if (input) {
          input.focus();
        }
      }, 500);
    };

    var div = document.createElement('div');
    document.body.appendChild(div);
    var modal = null;

    function close() {
      if (modal && modal.unmount) {
        modal.unmount();
      }

      if (div && div.parentNode) {
        div.parentNode.removeChild(div);
      }
    }

    function handleConfirm() {
      var _data$text = data.text,
          text = _data$text === void 0 ? '' : _data$text,
          _data$password = data.password,
          password = _data$password === void 0 ? '' : _data$password;
      var callbackArgs = type === 'login-password' ? [text, password] : type === 'secure-text' ? [password] : [text];
      return resolve(callbackArgs[0]);
    }

    var actions = typeof callbackOrActions === 'function' ? [{
      text: '取消'
    }, {
      text: '确定',
      onPress: callbackOrActions
    }] : callbackOrActions.map(function (item, index) {
      return {
        text: item.text,
        onPress: item.onPress || function () {
          if (index === 1) {
            return handleConfirm();
          }
        }
      };
    });
    var footer = actions.map(function (button) {
      // tslint:disable-next-line:only-arrow-functions
      var orginPress = button.onPress || function () {};

      button.onPress = function () {
        if (closed) {
          return;
        }

        var args = [];

        if (type === 'secure-text') {
          args.push(data['password']);
        } else if (type === 'login-password') {
          args.push(data['text']);
          args.push(data['password']);
        } else {
          args.push(data['text']);
        }

        var res = orginPress.apply(void 0, args);

        if (res && res.then) {
          res.then(function () {
            closed = true;
            close();
          }).catch(function () {});
        } else {
          closed = true;
          close();
        }
      };

      return button;
    });

    function onWrapTouchStart(e) {
      // exclude input element for focus
      if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
        return;
      }

      var pNode = closest(e.target, ".".concat(prefixCls, "-content"));

      if (!pNode) {
        e.preventDefault();
      }
    }

    modal = createApp({
      methods: {
        createContent: function createContent() {
          var inputDom;

          switch (type) {
            case 'login-password':
              inputDom = _createVNode("div", {
                "class": "".concat(prefixCls, "-input-container")
              }, [_createVNode("div", {
                "class": "".concat(prefixCls, "-input")
              }, [_createVNode("label", null, [_createVNode("input", {
                "type": "text",
                "defaultValue": data.text,
                "ref": function ref(input) {
                  return focusFn(input);
                },
                "onClick": onClick,
                "onChange": onChange,
                "placeholder": placeholders[0]
              }, null)])]), _createVNode("div", {
                "class": "".concat(prefixCls, "-input")
              }, [_createVNode("label", null, [_createVNode("input", {
                "type": "password",
                "defaultValue": data.password,
                "onClick": onClick,
                "onChange": onChange,
                "placeholder": placeholders[1]
              }, null)])])]);
              break;

            case 'secure-text':
              inputDom = _createVNode("div", {
                "class": "".concat(prefixCls, "-input-container")
              }, [_createVNode("div", {
                "class": "".concat(prefixCls, "-input")
              }, [_createVNode("label", null, [_createVNode("input", {
                "type": "password",
                "defaultValue": data.password,
                "ref": function ref(input) {
                  return focusFn(input);
                },
                "onClick": onClick,
                "onChange": onChange,
                "placeholder": placeholders[0]
              }, null)])])]);
              break;

            case 'default':
            default:
              inputDom = _createVNode("div", {
                "class": "".concat(prefixCls, "-input-container")
              }, [_createVNode("div", {
                "class": "".concat(prefixCls, "-input")
              }, [_createVNode("label", null, [_createVNode("input", {
                "type": "text",
                "value": data.text,
                "ref": function ref(el) {
                  focusFn(el);
                },
                "onClick": onClick,
                "onChange": onChange,
                "placeholder": placeholders[0]
              }, null)])])]);
          }

          return _createVNode("div", null, [message, inputDom]);
        }
      },
      render: function render() {
        var _this = this;

        // @ts-ignore
        return _createVNode(Modal, {
          "visible": true,
          "transparent": true,
          "prefixCls": prefixCls,
          "title": title,
          "closable": false,
          "maskClosable": false,
          "transitionName": "am-zoom",
          "footer": footer,
          "maskTransitionName": "am-fade",
          "platform": platform,
          "wrapProps": {
            onTouchStart: onWrapTouchStart
          }
        }, {
          default: function _default() {
            return [_createVNode("div", {
              "class": "".concat(prefixCls, "-propmt-content")
            }, [_this.createContent()])];
          }
        });
      }
    });
    modal.mount(div);
    return {
      close: close
    };
  });
}