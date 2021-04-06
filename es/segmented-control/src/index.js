import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { createVNode as _createVNode } from "vue";
import classnames from 'classnames';
import { defineComponent, reactive, watch } from 'vue';
import TouchFeedback from '../../vmc-feedback';
var SegmentedControl = defineComponent({
  install: null,
  name: 'SegmentedControl',
  props: {
    prefixCls: {
      type: String,
      default: 'am-segment'
    },
    tintColor: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: Number,
      default: 0
    },
    values: {
      default: function _default() {
        return [];
      }
    }
  },
  setup: function setup(props, _ref) {
    var emit = _ref.emit;
    var state = reactive({
      selectedIndex: props.value
    });
    watch(function () {
      return props.value;
    }, function (value) {
      state.selectedIndex = value;
    });

    var onClick = function onClick(e, index, value) {
      var disabled = props.disabled;

      if (!disabled && state.selectedIndex !== index) {
        // just do a mock so that the api to be the same as react-native
        e.nativeEvent = e.nativeEvent ? e.nativeEvent : {};
        e.nativeEvent.selectedSegmentIndex = index;
        e.nativeEvent.value = value;
        state.selectedIndex = index;
        emit('update:value', index);
        emit('change', index);
      }
    };

    var renderSegmentItem = function renderSegmentItem(idx, value, selected) {
      var prefixCls = props.prefixCls,
          disabled = props.disabled,
          tintColor = props.tintColor;
      var itemCls = classnames("".concat(prefixCls, "-item"), _defineProperty({}, "".concat(prefixCls, "-item-selected"), selected));
      var itemStyle = {
        color: selected ? '#fff' : tintColor,
        backgroundColor: selected ? tintColor : 'transparent',
        borderColor: tintColor
      };
      var activeInnerStyle = tintColor ? {
        backgroundColor: tintColor
      } : {};
      return _createVNode(TouchFeedback, {
        "key": idx,
        "disabled": disabled,
        "activeClassName": "".concat(prefixCls, "-item-active")
      }, {
        default: function _default() {
          return [_createVNode("div", {
            "class": itemCls,
            "style": itemStyle,
            "role": "tab",
            "aria-selected": selected && !disabled,
            "aria-disabled": disabled,
            "onClick": disabled ? undefined : function (e) {
              return onClick(e, idx, value);
            }
          }, [_createVNode("div", {
            "class": "".concat(prefixCls, "-item-inner"),
            "style": activeInnerStyle
          }, null), value])];
        }
      });
    };

    return {
      renderSegmentItem: renderSegmentItem,
      state: state
    };
  },
  render: function render() {
    var _this = this;

    var prefixCls = this.prefixCls,
        disabled = this.disabled,
        _this$values = this.values,
        values = _this$values === void 0 ? [] : _this$values;
    var wrapCls = classnames(prefixCls, _defineProperty({}, "".concat(prefixCls, "-disabled"), disabled));
    return _createVNode("div", {
      "class": wrapCls,
      "role": "tablist"
    }, [values.map(function (value, idx) {
      return (// tslint:disable-next-line:jsx-no-multiline-js
        _this.renderSegmentItem(idx, value, idx === _this.state.selectedIndex)
      );
    })]);
  }
});
export default SegmentedControl;