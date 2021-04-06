import { createVNode as _createVNode } from "vue";
import { unwrapFragment } from '../utils/vue';
import classnames from 'classnames';
import { defineComponent, ref } from 'vue';
import { setListeners, setProps } from '../utils/vnode';
export default defineComponent({
  name: 'MultiPickerMixin',
  props: {
    onValueChange: {},
    onScrollChange: {},
    prefixCls: {
      type: String
    },
    value: {
      type: Array
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots,
        emit = _ref.emit;
    var stateValue = ref(props.value);

    var onChange = function onChange(i, v, cb) {
      var value = stateValue.value.concat();
      value[i] = v;

      if (cb) {
        cb(value, i);
      }
    };

    var onValueChange = function onValueChange(i, v) {
      var value = stateValue.value;
      value[i] = v;
      emit('update:value', value, i);
    };

    var onScrollChange = function onScrollChange(i, v) {
      onChange(i, v, function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        emit.apply(void 0, ['scroll-change'].concat(args));
      });
    };

    return {
      onValueChange: onValueChange,
      stateValue: stateValue,
      onScrollChange: onScrollChange
    };
  },
  render: function render() {
    var _this = this;

    var prefixCls = this.prefixCls,
        value = this.value;
    var colElements = this.$slots.default();
    unwrapFragment(colElements).forEach(function (col, i) {
      setProps(col, {
        value: value[i]
      });
      setListeners(col, {
        'onUpdate:value': function onUpdateValue(value) {
          _this.onValueChange(i, value);
        },
        scrollChange: function scrollChange(value) {
          _this.onScrollChange(i, value);
        }
      });
    });
    return _createVNode("div", {
      "class": classnames(prefixCls)
    }, [colElements]);
  }
});