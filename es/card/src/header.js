import { createVNode as _createVNode } from "vue";
import { isEmptySlot } from '../../utils/vnode';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'MCardHeader',
  props: {
    prefixCls: {
      default: 'am-card'
    },
    thumbStyle: {
      default: function _default() {
        return {};
      }
    },
    thumb: {
      type: String
    },
    extra: {
      type: String
    },
    title: {
      type: String
    }
  },
  render: function render() {
    var _this$$slots$thumb, _this$$slots$thumb2, _this$$slots, _this$$slots$extra, _this$$slots$extra2, _this$$slots2;

    var prefixCls = this.prefixCls,
        thumb = this.thumb,
        thumbStyle = this.thumbStyle,
        extra = this.extra,
        title = this.title;
    var wrapCls = "".concat(prefixCls, "-header");
    return _createVNode("div", {
      "class": wrapCls
    }, [_createVNode("div", {
      "class": "".concat(prefixCls, "-header-content")
    }, [(_this$$slots$thumb = (_this$$slots$thumb2 = (_this$$slots = this.$slots).thumb) === null || _this$$slots$thumb2 === void 0 ? void 0 : _this$$slots$thumb2.call(_this$$slots)) !== null && _this$$slots$thumb !== void 0 ? _this$$slots$thumb : this.thumb ? _createVNode("img", {
      "style": thumbStyle,
      "src": thumb
    }, null) : null, !isEmptySlot(this.$slots.default) ? this.$slots.default() : title]), this.$slots.extra || extra ? // tslint:disable-next-line:jsx-no-multiline-js
    _createVNode("div", {
      "class": "".concat(prefixCls, "-header-extra")
    }, [(_this$$slots$extra = (_this$$slots$extra2 = (_this$$slots2 = this.$slots).extra) === null || _this$$slots$extra2 === void 0 ? void 0 : _this$$slots$extra2.call(_this$$slots2)) !== null && _this$$slots$extra !== void 0 ? _this$$slots$extra : extra]) : null]);
  }
});