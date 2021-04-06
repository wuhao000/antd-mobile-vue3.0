import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import { mergeProps as _mergeProps, createVNode as _createVNode } from "vue";
import classnames from 'classnames';
import { defineComponent, onMounted } from 'vue';
import loadSprite from './load-sprite';
var Icon = defineComponent({
  inheritAttrs: false,
  name: 'MIcon',
  props: {
    size: {
      type: [String, Number],
      default: 'md'
    },
    type: {
      type: String,
      required: true
    },
    color: String
  },
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        attrs = _ref.attrs;
    onMounted(function () {
      loadSprite();
    });
    return {};
  },
  render: function render() {
    var type = this.type,
        size = this.size,
        restProps = _objectWithoutProperties(this, ["type", "size"]);

    var cls = classnames('am-icon', "am-icon-".concat(type), "am-icon-".concat(size));
    var style = {};

    if (this.color) {
      style.color = this.color;
    }

    if (typeof this.size === 'number') {
      style.width = this.size + 'px';
      style.height = this.size + 'px';
    }

    return _createVNode("svg", _mergeProps({
      "class": cls,
      "style": style
    }, {
      props: restProps
    }), [_createVNode("use", {
      "xlink:href": "#".concat(type)
    }, null)]);
  }
});
export default Icon;