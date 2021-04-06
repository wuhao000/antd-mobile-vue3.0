import { mergeProps as _mergeProps, isVNode as _isVNode, createVNode as _createVNode } from "vue";
import { defineComponent, isVNode } from 'vue';
import Badge from '../../badge';
import IconRes from '../../mixins/icon-res';

function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !_isVNode(s);
}

var Tab = defineComponent({
  name: 'Tab',
  props: {
    dot: {
      type: Boolean
    },
    badge: {
      type: [String, Number]
    },
    selected: {
      type: Boolean
    },
    selectedIcon: {
      type: Object
    },
    icon: {
      type: Object
    },
    title: {
      type: String
    },
    prefixCls: {
      type: String,
      default: 'am-tab-item'
    },
    unselectedTintColor: {
      type: String
    },
    tintColor: {
      type: String
    },
    dataAttrs: {}
  },
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;

    var renderIcon = function renderIcon() {
      var dot = props.dot,
          badge = props.badge,
          selected = props.selected,
          selectedIcon = props.selectedIcon,
          icon = props.icon,
          title = props.title,
          prefixCls = props.prefixCls;
      var realIcon = selected ? selectedIcon : icon;
      var iconDom = realIcon ? isVNode(realIcon) ? realIcon : _createVNode(IconRes, {
        "class": "".concat(prefixCls, "-image"),
        "type": realIcon
      }, null) : null;

      if (badge) {
        return _createVNode(Badge, {
          "text": badge,
          "class": "".concat(prefixCls, "-badge tab-badge")
        }, {
          default: function _default() {
            return [' ', iconDom, ' '];
          }
        });
      }

      if (dot) {
        return _createVNode(Badge, {
          "dot": true,
          "class": "".concat(prefixCls, "-badge tab-dot")
        }, _isSlot(iconDom) ? iconDom : {
          default: function _default() {
            return [iconDom];
          }
        });
      }

      return iconDom;
    };

    var onClick = function onClick() {
      emit('click');
    };

    return {
      onClick: onClick,
      renderIcon: renderIcon
    };
  },
  render: function render() {
    var title = this.title,
        prefixCls = this.prefixCls,
        selected = this.selected,
        unselectedTintColor = this.unselectedTintColor,
        tintColor = this.tintColor;
    var iconColor = selected ? tintColor : unselectedTintColor;
    return _createVNode("div", _mergeProps(this.dataAttrs, {
      "onClick": this.onClick,
      "class": "".concat(prefixCls)
    }), [_createVNode("div", {
      "class": "".concat(prefixCls, "-icon"),
      "style": {
        color: iconColor
      }
    }, [this.renderIcon()]), _createVNode("p", {
      "class": "".concat(prefixCls, "-title"),
      "style": {
        color: selected ? tintColor : unselectedTintColor
      }
    }, [title])]);
  }
});
export default Tab;