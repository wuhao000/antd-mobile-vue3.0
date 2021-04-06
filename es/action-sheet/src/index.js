import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _typeof from "@babel/runtime/helpers/typeof";
import { createTextVNode as _createTextVNode, mergeProps as _mergeProps, createVNode as _createVNode } from "vue";
import { computed, defineComponent, getCurrentInstance, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import Badge from '../../badge';
import Popup from '../../popup';
import TouchFeedback from '../../vmc-feedback';
var ActionSheet = defineComponent({
  install: null,
  name: 'ActionSheet',
  props: {
    prefixCls: {
      type: String,
      default: 'am-action-sheet'
    },

    /**
     * 取消按钮文本
     */
    cancelText: {
      type: String,
      default: '取消'
    },

    /**
     * 是否在点击遮罩层时关闭
     */
    closeOnClickingMask: {
      type: Boolean,
      default: true
    },

    /**
     * 是否在点击按钮后关闭
     */
    closeOnClickingMenu: {
      type: Boolean,
      default: true
    },
    menus: {
      type: [Object, Array],
      default: function _default() {
        return [];
      }
    },

    /**
     * 是否显示取消按钮
     */
    showCancel: {
      type: Boolean,
      default: true
    },
    theme: {
      type: String,
      default: 'ios'
    },
    value: {
      type: Boolean
    },
    type: {
      type: String,
      default: 'normal'
    },
    title: {
      type: String
    }
  },
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var $tabbar = ref(null);
    var hasHeaderSlot = ref(false);
    var show = ref(props.value || false);
    var iOSMenuRef = ref(null);
    watch(function () {
      return show.value;
    }, function (val) {
      emit('input', val);

      if (val) {
        fixIos(-1);
      } else {
        setTimeout(function () {
          fixIos(100);
        }, 200);
      }
    });
    watch(function () {
      return props.value;
    }, function (val) {
      show.value = val;
    }, {
      immediate: true
    });
    watch(function () {
      return show.value;
    }, function (value) {
      emit('update:value', value);
    });
    var showStyle = computed(function () {
      var style = {};

      if (!show.value) {
        style.display = 'none';
      }

      return style;
    });
    var listClassPrefix = computed(function () {
      return "".concat(props.prefixCls, "-button-list");
    });

    var cancelClick = function cancelClick() {
      emit('input', false);
      show.value = false;
    };

    var emitEvent = function emitEvent(event, menu, item) {
      if (event === 'click-menu' && !/.noop/.test(menu)) {
        var _item = item;

        if (_typeof(_item) === 'object') {
          _item = JSON.parse(JSON.stringify(_item));
        }

        emit(event, menu, _item);
        emit("".concat(event, "-").concat(menu));
        props.closeOnClickingMenu && (show.value = false);
      }
    };

    var instance = getCurrentInstance();

    var fixIos = function fixIos(zIndex) {
      if (instance.vnode.el.parentNode && instance.vnode.el.parentNode.className.indexOf('v-transfer-dom') !== -1) {
        return;
      }

      if ($tabbar.value && /iphone/i.test(navigator.userAgent)) {
        $tabbar.value.style.zIndex = zIndex;
      }
    };

    var onClickingMask = function onClickingMask() {
      emit('click-mask');
      props.closeOnClickingMask && (show.value = false);
    };

    var onMenuClick = function onMenuClick(text, index) {
      if (typeof text === 'string') {
        emitEvent('click-menu', index, text);
      } else {
        if (text.type !== 'disabled' && text.type !== 'info') {
          if (text.value || text.value === 0) {
            emitEvent('click-menu', text.value, text);
          } else {
            emitEvent('click-menu', '', text);
            show.value = false;
          }
        }
      }
    };

    var onTransitionEnd = function onTransitionEnd() {
      emit(show.value ? 'on-after-show' : 'on-after-hide');
    };

    var renderSheet = function renderSheet() {
      if (props.type === 'share') {
        return _createVNode("div", {
          "class": "".concat(props.prefixCls, "-content\"")
        }, [_createVNode("div", {
          "class": "".concat(props.prefixCls, "-body")
        }, [_createVNode("div", {
          "class": "".concat(props.prefixCls, "-share")
        }, [_createVNode("div", {
          "class": "".concat(props.prefixCls, "-share-list")
        }, [props.menus.map(function (item, index) {
          return _createVNode("div", {
            "class": "".concat(props.prefixCls, "-share-list-item"),
            "role": "button",
            "onClick": function onClick() {
              return onMenuClick(item, index);
            }
          }, [_createVNode("div", {
            "class": "".concat(props.prefixCls, "-share-list-item-icon")
          }, [item.icon]), _createVNode("div", {
            "class": "".concat(props.prefixCls, "-share-list-item-title")
          }, [item.title])]);
        })])])]), renderButtons()]);
      } else {
        return _createVNode("div", {
          "ref": function ref(el) {
            iOSMenuRef.value = el;
          }
        }, [_createVNode("div", {
          "class": "am-action-sheet-content"
        }, [_createVNode("div", {
          "class": "am-action-sheet-body"
        }, [_createVNode("div", null, [renderTitle(), renderButtons()])])])]);
      }
    };

    var renderButtons = function renderButtons() {
      return _createVNode("div", {
        "class": listClassPrefix.value,
        "role": "group"
      }, [props.type === 'normal' ? props.menus.map(function (it, index) {
        return renderMenu(it, index);
      }) : null, props.showCancel ? renderCancelButton() : null]);
    };

    var renderTitle = function renderTitle() {
      return props.title ? _createVNode("div", {
        "class": props.prefixCls + '-message'
      }, [props.title]) : null;
    };

    var renderMenu = function renderMenu(menu, index) {
      var _classes;

      var MTouchFeedback = TouchFeedback;
      var itemClassPrefix = listClassPrefix.value + '-item';
      var classes = (_classes = {}, _defineProperty(_classes, itemClassPrefix, true), _defineProperty(_classes, listClassPrefix.value + '-badge', typeof menu === 'string' ? false : menu.badge), _classes);
      return _createVNode(MTouchFeedback, {
        "onClick": function onClick() {
          onMenuClick(typeof menu === 'string' ? menu : menu.value, index);
        },
        "activeClassName": itemClassPrefix + '-active'
      }, {
        default: function _default() {
          return [_createVNode("div", {
            "class": classes,
            "role": "button"
          }, [_createVNode("span", {
            "class": itemClassPrefix + '-content'
          }, [typeof menu === 'string' ? menu : menu.label]), typeof menu !== 'string' ? renderBadge(menu.badge) : null])];
        }
      });
    };

    var renderBadge = function renderBadge(badge) {
      if (badge) {
        var _props = _typeof(badge) === 'object' ? badge : {};

        return badge ? _createVNode(Badge, _mergeProps({
          "class": "am-badge-not-a-wrapper"
        }, _props), null) : null;
      }
    };

    var renderCancelButton = function renderCancelButton() {
      var MTouchFeedback = TouchFeedback;
      var itemClassPrefix = listClassPrefix.value + '-item';
      var classes = itemClassPrefix + " ".concat(props.prefixCls, "-cancel-button");
      return _createVNode(MTouchFeedback, {
        "activeClassName": itemClassPrefix + '-active'
      }, {
        default: function _default() {
          return [_createVNode("div", {
            "class": classes,
            "role": "button",
            "onClick": cancelClick
          }, [_createVNode("span", {
            "class": itemClassPrefix + '-content'
          }, [_createTextVNode("\u53D6\u6D88")]), _createVNode("span", {
            "class": props.prefixCls + '-cancel-button-mask'
          }, null)])];
        }
      });
    };

    onMounted(function () {
      var _slots$header;

      hasHeaderSlot.value = !!((_slots$header = slots.header) !== null && _slots$header !== void 0 && _slots$header.call(slots));
      nextTick(function () {
        $tabbar.value = document.querySelector('.weui-tabbar');
        iOSMenuRef.value && iOSMenuRef.value.addEventListener('transitionend', onTransitionEnd);
      });
    });
    onBeforeUnmount(function () {
      fixIos(100);
      iOSMenuRef.value && iOSMenuRef.value.removeEventListener('transitionend', onTransitionEnd);
    });
    return {
      cancelClick: cancelClick,
      renderSheet: renderSheet,
      show: show
    };
  },
  render: function render() {
    var _this = this;

    var classes = "".concat(this.prefixCls, " ").concat(this.prefixCls, "-").concat(this.type);
    return _createVNode(Popup, {
      "visible": this.show,
      "showTitle": false,
      "onCancel": this.cancelClick
    }, {
      default: function _default() {
        return [_createVNode("div", {
          "class": classes
        }, [_this.renderSheet()])];
      }
    });
  }
});
export default ActionSheet;