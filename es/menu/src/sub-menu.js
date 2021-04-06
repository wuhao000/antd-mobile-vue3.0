import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { isVNode as _isVNode, createVNode as _createVNode } from "vue";

/* tslint:disable:jsx-no-multiline-js */
import classnames from 'classnames';
import { defineComponent } from 'vue';
import Checkbox from '../../checkbox';
import List from '../../list';
import Radio from '../../radio';

function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !_isVNode(s);
}

var SubMenu = defineComponent({
  inheritAttrs: false,
  name: 'SubMenu',
  props: {
    subMenuPrefixCls: {
      type: String
    },
    radioPrefixCls: {
      type: String
    },
    subMenuData: {
      type: Object
    },
    showSelect: {
      type: Boolean
    },
    onSel: {},
    selItem: {
      type: Object
    },
    multiSelect: {
      type: Boolean
    }
  },
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;

    var onClick = function onClick(dataItem) {
      emit('click', dataItem);
    };

    return {
      onClick: onClick
    };
  },
  render: function render() {
    var _slot;

    var _this = this;

    var subMenuPrefixCls = this.subMenuPrefixCls,
        radioPrefixCls = this.radioPrefixCls,
        subMenuData = this.subMenuData,
        showSelect = this.showSelect,
        selItem = this.selItem,
        multiSelect = this.multiSelect;

    var selected = function selected(dataItem) {
      return showSelect && selItem.length > 0 && selItem.indexOf(dataItem.value) !== -1;
    };

    var ItemComponent = !multiSelect ? Radio : Checkbox;
    return _createVNode(List, {
      "style": {
        paddingTop: 0
      },
      "class": subMenuPrefixCls
    }, _isSlot(_slot = subMenuData.map(function (dataItem, idx) {
      var _classnames;

      return _createVNode(List.Item, {
        "class": classnames("".concat(radioPrefixCls, "-item"), (_classnames = {}, _defineProperty(_classnames, "".concat(subMenuPrefixCls, "-item-selected"), selected(dataItem)), _defineProperty(_classnames, "".concat(subMenuPrefixCls, "-item-disabled"), dataItem.disabled), _classnames)),
        "key": idx,
        "extra": _createVNode(ItemComponent, {
          "value": selected(dataItem),
          "disabled": dataItem.disabled,
          "onChange": function onChange() {
            return _this.onClick(dataItem);
          }
        }, null)
      }, {
        default: function _default() {
          return [dataItem.label];
        }
      });
    })) ? _slot : {
      default: function _default() {
        return [_slot];
      }
    });
  }
});
export default SubMenu;