import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { createTextVNode as _createTextVNode, createVNode as _createVNode } from "vue";
import classnames from 'classnames';
import defaultLocale from './locale/zh_CN';
import { defineComponent, reactive, watch } from 'vue';
import Button from '../../button';
import Flex from '../../flex';
import { getComponentLocale } from '../../utils/getLocale';
export default defineComponent({
  install: null,
  name: 'Pagination',
  props: {
    prefixCls: {
      type: String,
      default: 'am-pagination'
    },
    mode: {
      default: 'button'
    },
    simple: {
      type: Boolean,
      default: false
    },
    value: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    },
    prevText: {
      type: String
    },
    nextText: {
      type: String
    }
  },
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var state = reactive({
      current: props.value
    });
    watch(function () {
      return props.value;
    }, function (value) {
      if (state.current !== value) {
        state.current = value;
      }
    });

    var onChange = function onChange(p) {
      state.current = p;
      emit('update:value', p);
    };

    return {
      state: state,
      onChange: onChange
    };
  },
  render: function render() {
    var _this = this,
        _ref2,
        _this$$slots$prevText,
        _this$$slots$prevText2,
        _this$$slots,
        _this$$slots$prevTex,
        _this$$slots2,
        _this$$slots$default,
        _this$$slots3,
        _ref3,
        _this$$slots$nextText,
        _this$$slots$nextText2,
        _this$$slots4,
        _this$$slots$nextTex,
        _this$$slots5;

    var prefixCls = this.prefixCls,
        mode = this.mode,
        total = this.total,
        simple = this.simple;
    var current = this.state.current;
    var locale = getComponentLocale(this.$props, this.$root, 'Pagination', defaultLocale);
    var prevText = locale.prevText,
        nextText = locale.nextText;

    var markup = _createVNode(Flex, null, {
      default: function _default() {
        return [_createVNode(Flex.Item, {
          "class": "".concat(prefixCls, "-wrap-btn ").concat(prefixCls, "-wrap-btn-prev")
        }, {
          default: function _default() {
            return [_createVNode(Button, {
              "inline": true,
              "disabled": current <= 1,
              "onClick": function onClick() {
                return _this.onChange(current - 1);
              }
            }, {
              default: function _default() {
                return [(_ref2 = (_this$$slots$prevText = (_this$$slots$prevText2 = (_this$$slots = _this.$slots).prevText) === null || _this$$slots$prevText2 === void 0 ? void 0 : _this$$slots$prevText2.call(_this$$slots)) !== null && _this$$slots$prevText !== void 0 ? _this$$slots$prevText : (_this$$slots$prevTex = (_this$$slots2 = _this.$slots)['prev-text']) === null || _this$$slots$prevTex === void 0 ? void 0 : _this$$slots$prevTex.call(_this$$slots2)) !== null && _ref2 !== void 0 ? _ref2 : prevText];
              }
            })];
          }
        }), _this.$slots.default ? _createVNode(Flex.Item, null, {
          default: function _default() {
            return [(_this$$slots$default = (_this$$slots3 = _this.$slots).default) === null || _this$$slots$default === void 0 ? void 0 : _this$$slots$default.call(_this$$slots3)];
          }
        }) : !simple && _createVNode(Flex.Item, {
          "class": "".concat(prefixCls, "-wrap"),
          "aria-live": "assertive"
        }, {
          default: function _default() {
            return [_createVNode("span", {
              "class": "active"
            }, [current]), _createTextVNode("/"), _createVNode("span", null, [total])];
          }
        }), _createVNode(Flex.Item, {
          "class": "".concat(prefixCls, "-wrap-btn ").concat(prefixCls, "-wrap-btn-next")
        }, {
          default: function _default() {
            return [_createVNode(Button, {
              "inline": true,
              "disabled": current >= total,
              "onClick": function onClick() {
                return _this.onChange(_this.state.current + 1);
              }
            }, {
              default: function _default() {
                return [(_ref3 = (_this$$slots$nextText = (_this$$slots$nextText2 = (_this$$slots4 = _this.$slots).nextText) === null || _this$$slots$nextText2 === void 0 ? void 0 : _this$$slots$nextText2.call(_this$$slots4)) !== null && _this$$slots$nextText !== void 0 ? _this$$slots$nextText : (_this$$slots$nextTex = (_this$$slots5 = _this.$slots)['next-text']) === null || _this$$slots$nextTex === void 0 ? void 0 : _this$$slots$nextTex.call(_this$$slots5)) !== null && _ref3 !== void 0 ? _ref3 : nextText];
              }
            })];
          }
        })];
      }
    });

    if (mode === 'number') {
      markup = _createVNode("div", {
        "class": "".concat(prefixCls, "-wrap")
      }, [_createVNode("span", {
        "class": "active"
      }, [current]), _createTextVNode("/"), _createVNode("span", null, [total])]);
    } else if (mode === 'pointer') {
      var arr = [];

      for (var i = 0; i < total; i++) {
        arr.push(_createVNode("div", {
          "key": "dot-".concat(i),
          "class": classnames("".concat(prefixCls, "-wrap-dot"), _defineProperty({}, "".concat(prefixCls, "-wrap-dot-active"), i + 1 === current))
        }, [_createVNode("span", null, null)]));
      }

      markup = _createVNode("div", {
        "class": "".concat(prefixCls, "-wrap")
      }, [arr]);
    }

    var cls = classnames(prefixCls);
    return _createVNode("div", {
      "class": cls
    }, [markup]);
  }
});