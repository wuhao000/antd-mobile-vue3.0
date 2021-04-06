import { isVNode as _isVNode, createVNode as _createVNode } from "vue";

/* tslint:disable:jsx-no-multiline-js */
import classnames from 'classnames';
import { defineComponent } from 'vue';
import Button from '../../button';

function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !_isVNode(s);
}

export default defineComponent({
  install: null,
  name: 'MResult',
  props: {
    prefixCls: {
      type: String,
      default: 'am-result'
    },
    imgUrl: {
      type: String
    },
    img: {
      type: [String, Object]
    },
    title: {
      type: [String, Object]
    },
    message: {
      type: [String, Object]
    },
    buttonText: {
      type: String
    },
    buttonType: {
      default: ''
    }
  },
  render: function render() {
    var _this = this;

    var prefixCls = this.prefixCls,
        imgUrl = this.imgUrl,
        buttonText = this.buttonText,
        buttonType = this.buttonType;
    var imgContent = null;
    var img = this.$slots.img || this.img;
    var title = this.$slots.title || this.title;
    var message = this.$slots.message || this.message;

    if (img) {
      imgContent = _createVNode("div", {
        "class": "".concat(prefixCls, "-pic")
      }, [img]);
    } else if (imgUrl) {
      imgContent = _createVNode("div", {
        "class": "".concat(prefixCls, "-pic"),
        "style": {
          backgroundImage: "url(".concat(imgUrl, ")")
        }
      }, null);
    }

    return _createVNode("div", {
      "class": classnames(prefixCls),
      "role": "alert"
    }, [imgContent, title ? _createVNode("div", {
      "class": "".concat(prefixCls, "-title")
    }, [title]) : null, message ? _createVNode("div", {
      "class": "".concat(prefixCls, "-message")
    }, [message]) : null, buttonText ? _createVNode("div", {
      "class": "".concat(prefixCls, "-button")
    }, [// @ts-ignore
    _createVNode(Button, {
      "type": buttonType,
      "onClick": function onClick() {
        _this.$emit('click');
      }
    }, _isSlot(buttonText) ? buttonText : {
      default: function _default() {
        return [buttonText];
      }
    })]) : null]);
  }
});