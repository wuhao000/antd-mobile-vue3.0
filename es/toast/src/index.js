import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { createVNode as _createVNode } from "vue";
import Notification from 'ant-design-vue/lib/vc-notification';
import classnames from 'classnames';
import Icon from '../../icon';
var prefixCls = 'am-toast';

function getMessageInstance(mask, callback) {
  var _classnames;

  Notification.newInstance({
    prefixCls: prefixCls,
    style: {},
    // clear rmc-notification default style
    transitionName: 'am-fade',
    class: classnames((_classnames = {}, _defineProperty(_classnames, "".concat(prefixCls, "-mask"), mask), _defineProperty(_classnames, "".concat(prefixCls, "-nomask"), !mask), _classnames))
  }, function (notification) {
    return callback && callback(notification);
  });
}

function notice(_content, type) {
  var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3;

  var _onClose = arguments.length > 3 ? arguments[3] : undefined;

  var mask = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
  var iconTypes = {
    info: '',
    success: 'success',
    fail: 'fail',
    offline: 'dislike',
    loading: 'loading'
  };
  var iconType = iconTypes[type];
  var messageInstance = {
    $destroy: function $destroy() {
      console.error('Toast渲染未完成');
    },
    destroyed: false
  };

  messageInstance.destroy = function () {
    if (!messageInstance.destroyed) {
      messageInstance.destroyed = true;
      messageInstance.$destroy();
    }
  };

  messageInstance.hide = function () {
    if (typeof messageInstance.destroy === 'function') {
      messageInstance.destroy();
    }
  };

  getMessageInstance(mask, function (notification) {
    messageInstance.$destroy = notification.destroy;
    messageInstance.component = notification.component;
    notification.notice({
      duration: duration,
      style: {},
      onClick: function onClick() {},
      content: function content(h) {
        return !!iconType ? _createVNode("div", {
          "class": "".concat(prefixCls, "-text ").concat(prefixCls, "-text-icon"),
          "role": 'alert',
          "aria-live": 'assertive'
        }, [_createVNode(Icon, {
          "type": iconType,
          "size": 'lg'
        }, null), _createVNode("div", {
          "class": "".concat(prefixCls, "-text-info")
        }, [_content])]) : _createVNode("div", {
          "class": "".concat(prefixCls, "-text"),
          "role": 'alert',
          "aria-live": 'assertive'
        }, [_createVNode("div", null, [_content])]);
      },
      closable: true,
      onClose: function onClose() {
        if (_onClose) {
          _onClose();
        }

        if (typeof notification.destroy === 'function') {
          notification.destroy();
        }

        messageInstance.destroy = null;
      }
    });
  });
  return messageInstance;
}

export default {
  install: function install(any) {},
  show: function show(content, duration, mask) {
    return notice(content, 'info', duration, function () {}, mask);
  },
  info: function info(content, duration, onClose) {
    var mask = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    return notice(content, 'info', duration, onClose, mask);
  },
  success: function success(content, duration, onClose) {
    var mask = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    return notice(content, 'success', duration, onClose, mask);
  },
  fail: function fail(content, duration, onClose) {
    var mask = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    return notice(content, 'fail', duration, onClose, mask);
  },
  offline: function offline(content, duration, onClose) {
    var mask = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    return notice(content, 'offline', duration, onClose, mask);
  },
  loading: function loading(content, duration, onClose, mask) {
    return notice(content, 'loading', duration, onClose, mask);
  }
};