import { createVNode as _createVNode } from "vue";
import { createApp } from 'vue';
import closest from '../../utils/closest';
import Modal from './modal';
export default function alert(title, message) {
  var actions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [{
    text: '确定'
  }];
  var platform = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'ios';
  var closed = false;

  if (!title && !message) {
    // console.log('Must specify either an alert title, or message, or both');
    return {
      close: function close() {}
    };
  }

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

  return new Promise(function (resolve, reject) {
    var footer = actions.map(function (button, index) {
      // tslint:disable-next-line:only-arrow-functions
      var orginPress = button.onPress || function () {};

      button.onPress = function () {
        if (closed) {
          return;
        }

        var res = orginPress();

        if (res && res.then) {
          res.then(function () {
            closed = true;
            close();

            if (actions.length === 2 && index === 0) {
              reject();
            } else {
              resolve(undefined);
            }
          }).catch(function (err) {
            reject(err);
          });
        } else {
          closed = true;
          close();

          if (actions.length === 2 && index === 0) {
            reject();
          } else {
            resolve(undefined);
          }
        }
      };

      return button;
    });
    var prefixCls = 'am-modal';

    function onWrapTouchStart(e) {
      if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
        return;
      }

      var pNode = closest(e.target, ".".concat(prefixCls, "-footer"));

      if (!pNode) {
        e.preventDefault();
      }
    }

    modal = createApp({
      render: function render() {
        // @ts-ignore
        return _createVNode(Modal, {
          "visible": true,
          "transparent": true,
          "title": title,
          "transitionName": "am-zoom",
          "closable": false,
          "maskClosable": false,
          "footer": footer,
          "maskTransitionName": "am-fade",
          "platform": platform,
          "wrapProps": {
            onTouchStart: onWrapTouchStart
          }
        }, {
          default: function _default() {
            return [_createVNode("div", {
              "class": "".concat(prefixCls, "-alert-content")
            }, [message])];
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