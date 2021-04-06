import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { createVNode as _createVNode, mergeProps as _mergeProps } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { computed, defineComponent } from 'vue';
export default defineComponent({
  name: 'ProxyComponent',
  setup: function setup($props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots,
        attrs = _ref.attrs;
    var cssClass = computed(function () {
      return {};
    });
    var cssStyle = computed(function () {
      return {};
    });
    var props = computed(function () {
      return _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, getSlotProps()), attrs), $props), getProps());
    });
    var slotNames = computed(function () {
      return Object.keys(slots);
    });

    var getInputComponent = function getInputComponent() {
      return {};
    };

    var getProps = function getProps() {
      return {};
    };

    var getSlotProps = function getSlotProps() {
      var props = {};
      Object.keys(slots).forEach(function (slotKey) {
        if (slotKey !== 'default') {
          props[slotKey] = slots[slotKey];
        }
      });
      return props;
    };

    return {
      cssClass: cssClass,
      cssStyle: cssStyle,
      props: props,
      slotNames: slotNames,
      getInputComponent: getInputComponent,
      getProps: getProps,
      getSlotProps: getSlotProps
    };
  },
  render: function render() {
    var _this$$slots$default,
        _this$$slots,
        _this = this;

    var ProxyComponent = this.getInputComponent();

    var props = _objectSpread(_objectSpread({}, this.props), {}, {
      class: this.cssClass,
      style: this.cssStyle
    });

    return _createVNode(ProxyComponent, _mergeProps(props, {
      "slots": this.$slots
    }), {
      default: function _default() {
        return [(_this$$slots$default = (_this$$slots = _this.$slots).default) === null || _this$$slots$default === void 0 ? void 0 : _this$$slots$default.call(_this$$slots)];
      }
    });
  }
});