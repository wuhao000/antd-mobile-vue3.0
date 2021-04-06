import { createVNode as _createVNode } from "vue";
import { createApp } from 'vue';
import closest from '../../utils/closest';
import Modal from './modal';
export default function operation() {
  var actions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [{
    text: '确定'
  }];
  var platform = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ios';
  var closed = false;
  var prefixCls = 'am-modal';
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

  var footer = actions.map(function (button) {
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
        }).catch(function () {});
      } else {
        closed = true;
        close();
      }
    };

    return button;
  });

  function onWrapTouchStart(e) {
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }

    var pNode = closest(e.target, ".am-modal-footer");

    if (!pNode) {
      e.preventDefault();
    }
  }

  modal = createApp({
    render: function render() {
      var _this$$slots$default,
          _this$$slots,
          _this = this;

      // @ts-ignore
      return _createVNode(Modal, {
        "visible": true,
        "operation": true,
        "transparent": true,
        "prefixCls": prefixCls,
        "transitionName": "am-zoom",
        "closable": false,
        "maskClosable": true,
        "onClose": close,
        "footer": footer,
        "maskTransitionName": "am-fade",
        "class": "am-modal-operation",
        "platform": platform,
        "wrapProps": {
          onTouchStart: onWrapTouchStart
        }
      }, {
        default: function _default() {
          return [(_this$$slots$default = (_this$$slots = _this.$slots).default) === null || _this$$slots$default === void 0 ? void 0 : _this$$slots$default.call(_this$$slots)];
        }
      });
    }
  });
  modal.mount(div);
  return {
    close: close
  };
}