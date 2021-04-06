import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import { isVNode as _isVNode, createVNode as _createVNode } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import classnames from 'classnames';
import { defineComponent, onMounted, reactive, watch } from 'vue';
import Button from '../../button';
import Flex from '../../flex';
import List from '../../list';
import { getComponentLocale } from '../../utils/getLocale';
import defaultLocale from './locale/zh_CN';
import SubMenu from './sub-menu';
import cloneDeep from 'lodash.clonedeep';

function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !_isVNode(s);
}

var Menu = defineComponent({
  install: null,
  name: 'Menu',
  props: {
    prefixCls: {
      type: String,
      default: 'am-menu'
    },
    subMenuPrefixCls: {
      type: String,
      default: 'am-sub-menu'
    },
    radioPrefixCls: {
      type: String,
      default: 'am-radio'
    },
    multiSelectMenuBtnsCls: {
      type: String,
      default: 'am-multi-select-btns'
    },
    MenuSelectContanerPrefixCls: {
      type: String,
      default: 'am-menu-select-container'
    },
    data: {
      default: function _default() {
        return [];
      }
    },
    defaultValue: {},
    value: {
      type: Array
    },
    level: {
      default: 2
    },
    height: {
      type: Number
    },
    multiSelect: {
      type: Boolean,
      default: false
    }
  },
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;

    var getNewFsv = function getNewFsv() {
      var value = props.value,
          data = props.data;
      var firstValue = '';

      if (value && value.length) {
        // if has init path, chose init first value
        firstValue = value[0]; // this is a contract
      } else if (data && data.length && !data[0].isLeaf) {
        // chose the first menu item if it's not leaf.
        firstValue = data[0].value;
      }

      return firstValue;
    };

    var state = reactive({
      firstLevelSelectValue: getNewFsv(),
      value: cloneDeep(props.value),
      height: props.height
    });
    watch(function () {
      return props.value;
    }, function (value) {
      state.firstLevelSelectValue = getNewFsv();
      state.value = cloneDeep(value);
    });
    watch(function () {
      return props.height;
    }, function (height) {
      state.height = height;
    });

    var onMenuOk = function onMenuOk() {
      emit('update:value', state.value);
      emit('ok', state.value);
    };

    var onMenuCancel = function onMenuCancel() {
      state.value = cloneDeep(props.value);
      emit('cancel');
    };

    var onClickFirstLevelItem = function onClickFirstLevelItem(dataItem) {
      state.firstLevelSelectValue = dataItem.value;

      if (dataItem.isLeaf) {
        emit('change', [dataItem.value]);
      }
    };

    var getSelectValue = function getSelectValue(dataItem) {
      var level = props.level,
          multiSelect = props.multiSelect;

      if (multiSelect) {
        var value = state.value,
            firstLevelSelectValue = state.firstLevelSelectValue;

        if (value && value.length > 0) {
          if (level === 2 && value[0] !== firstLevelSelectValue) {
            /* if level is 2, when first level is reselect, reset submenu array */
            return [firstLevelSelectValue, [dataItem.value]];
          } else {
            /* if level is 1, or first level isn't changed when level is 2, just do add or delete for submenu array  */
            var chosenValues = level === 2 ? value[1] : value; // FIXME: hack type

            var existIndex = chosenValues.indexOf(dataItem.value);

            if (existIndex === -1) {
              chosenValues.push(dataItem.value);
            } else {
              chosenValues.splice(existIndex, 1);
            }

            return value;
          }
        } else {
          /* if value is not exist before, init value */
          return level === 2 ? [firstLevelSelectValue, [dataItem.value]] : [dataItem.value];
        }
      }

      return level === 2 ? [state.firstLevelSelectValue, dataItem.value] : [dataItem.value];
    };

    var onClickSubMenuItem = function onClickSubMenuItem(dataItem) {
      var value = getSelectValue(dataItem);
      state.value = value;
      setTimeout(function () {
        // if onChange will close the menu, set a little time to show its selection state.
        emit('change', value);
      }, 300);
    };

    onMounted(function () {
      if (props.height === undefined) {
        state.height = Math.round(document.documentElement.clientHeight / 2);
      }
    });
    return {
      state: state,
      onClickFirstLevelItem: onClickFirstLevelItem,
      onClickSubMenuItem: onClickSubMenuItem,
      onMenuCancel: onMenuCancel,
      onMenuOk: onMenuOk
    };
  },
  render: function render() {
    var _slot;

    var _this = this;

    var _this$data = this.data,
        data = _this$data === void 0 ? [] : _this$data,
        prefixCls = this.prefixCls,
        level = this.level,
        multiSelect = this.multiSelect,
        multiSelectMenuBtnsCls = this.multiSelectMenuBtnsCls,
        MenuSelectContanerPrefixCls = this.MenuSelectContanerPrefixCls;
    var _this$state = this.state,
        firstLevelSelectValue = _this$state.firstLevelSelectValue,
        value = _this$state.value,
        height = _this$state.height;
    var subMenuData = data; // menu only has one level as init

    if (level === 2) {
      var parent = data;

      if (firstLevelSelectValue && firstLevelSelectValue !== '') {
        parent = data.filter(function (dataItem) {
          return dataItem.value === firstLevelSelectValue;
        });
      } // tslint:disable-next-line:prefer-conditional-expression


      if (parent[0] && parent[0].children && parent[0].isLeaf !== true) {
        subMenuData = parent[0].children;
      } else {
        subMenuData = [];
      }
    }

    var subValue = value && value.length > 0 && _toConsumableArray(value) || [];

    if (level === 2 && subValue.length > 1) {
      subValue.shift();

      if (multiSelect) {
        /* example: [[1,2,3]] -> [1,2,3] */
        subValue = subValue[0]; // FIXME: hack type
      }
    }

    var parentValue = value && value.length > 1 && level === 2 ? value[0] : null;
    var subSelInitItem = subMenuData.filter(function (dataItem) {
      return subValue.indexOf(dataItem.value) !== -1;
    }).map(function (item) {
      return item.value;
    });
    var showSelect = true;

    if (level === 2 && parentValue !== firstLevelSelectValue) {
      showSelect = false;
    } // tslint:disable-next-line:variable-name


    var _locale = getComponentLocale(this.$props, this, 'Menu', defaultLocale);

    var heightStyle = height !== undefined ? {
      height: "".concat(height, "px")
    } : {};
    return _createVNode(Flex, {
      "class": prefixCls,
      "style": _objectSpread({}, heightStyle),
      "direction": "column",
      "align": "stretch"
    }, {
      default: function _default() {
        return [_createVNode(Flex, {
          "align": "start",
          "class": classnames(_defineProperty({}, MenuSelectContanerPrefixCls, true))
        }, {
          default: function _default() {
            return [level === 2 && _createVNode(Flex.Item, null, {
              default: function _default() {
                return [_createVNode(List, {
                  "role": "tablist"
                }, _isSlot(_slot = data.map(function (dataItem, index) {
                  return _createVNode(List.Item, {
                    "class": dataItem.value === firstLevelSelectValue ? "".concat(prefixCls, "-selected") : '',
                    "onClick": function onClick() {
                      return _this.onClickFirstLevelItem(dataItem);
                    },
                    "key": "listitem-1-".concat(index),
                    "role": "tab",
                    "aria-selected": dataItem.value === firstLevelSelectValue
                  }, {
                    default: function _default() {
                      return [dataItem.label];
                    }
                  });
                })) ? _slot : {
                  default: function _default() {
                    return [_slot];
                  }
                })];
              }
            }), _createVNode(Flex.Item, {
              "role": "tabpanel",
              "aria-hidden": "false",
              "class": "".concat(MenuSelectContanerPrefixCls, "-submenu")
            }, {
              default: function _default() {
                return [_createVNode(SubMenu, {
                  "subMenuPrefixCls": _this.subMenuPrefixCls,
                  "radioPrefixCls": _this.radioPrefixCls,
                  "subMenuData": subMenuData,
                  "selItem": subSelInitItem,
                  "onClick": _this.onClickSubMenuItem,
                  "showSelect": showSelect,
                  "multiSelect": multiSelect
                }, null)];
              }
            })];
          }
        }), multiSelect && _createVNode("div", {
          "class": multiSelectMenuBtnsCls
        }, [_createVNode(Button, {
          "inline": true,
          "class": "".concat(multiSelectMenuBtnsCls, "-btn"),
          "onClick": _this.onMenuCancel
        }, {
          default: function _default() {
            return [_locale.cancelText];
          }
        }), _createVNode(Button, {
          "inline": true,
          "type": "primary",
          "class": "".concat(multiSelectMenuBtnsCls, "-btn"),
          "onClick": _this.onMenuOk
        }, {
          default: function _default() {
            return [_locale.okText];
          }
        })])];
      }
    });
  }
});
export default Menu;