import { createVNode as _createVNode } from "vue";
import { defineComponent, getCurrentInstance, onBeforeUnmount, onMounted, onUpdated, reactive, ref } from 'vue';
/*
 * https://github.com/jasonslyvia/react-marquee
 * remove PC
 * support React Element for text prop
*/

var Marquee = defineComponent({
  name: 'Marquee',
  props: {
    prefixCls: {
      type: String
    },
    text: {
      type: [String, Object],
      default: ''
    },
    loop: {
      type: Boolean,
      default: false
    },
    leading: {
      type: Number,
      default: 500
    },
    trailing: {
      type: Number,
      default: 800
    },
    fps: {
      type: Number,
      default: 40
    }
  },
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var state = reactive({
      animatedWidth: 0,
      overflowWidth: 0
    });

    var _marqueeTimer = ref(null);

    var textRef = ref(null);

    var _startAnimation = function _startAnimation() {
      if (_marqueeTimer.value) {
        window.clearTimeout(_marqueeTimer.value);
      }

      var fps = props.fps;
      var TIMEOUT = 1 / fps * 1000;
      var isLeading = state.animatedWidth === 0;
      var timeout = isLeading ? props.leading : TIMEOUT;

      var animate = function animate() {
        var overflowWidth = state.overflowWidth;
        var animatedWidth = state.animatedWidth + 1;
        var isRoundOver = animatedWidth > overflowWidth;

        if (isRoundOver) {
          if (props.loop) {
            animatedWidth = 0;
          } else {
            return;
          }
        }

        if (isRoundOver && props.trailing) {
          _marqueeTimer.value = window.setTimeout(function () {
            state.animatedWidth = animatedWidth;
            _marqueeTimer.value = window.setTimeout(animate, TIMEOUT);
          }, props.trailing);
        } else {
          state.animatedWidth = animatedWidth;
          _marqueeTimer.value = window.setTimeout(animate, TIMEOUT);
        }
      };

      if (state.overflowWidth !== 0) {
        _marqueeTimer.value = window.setTimeout(animate, timeout);
      }
    };

    var instance = getCurrentInstance();

    var _measureText = function _measureText() {
      var container = instance.vnode.el;
      var node = textRef.value;

      if (container && node) {
        var containerWidth = container.offsetWidth;
        var textWidth = node.offsetWidth;
        state.overflowWidth = textWidth - containerWidth;
      }
    };

    onMounted(function () {
      _measureText();

      _startAnimation();
    });
    onUpdated(function () {
      _measureText();

      if (!_marqueeTimer.value) {
        _startAnimation();
      }
    });
    onBeforeUnmount(function () {
      clearTimeout(_marqueeTimer.value);
    });
    return {
      textRef: textRef,
      state: state
    };
  },
  render: function render() {
    var prefixCls = this.prefixCls,
        text = this.text;
    var style = {
      position: 'relative',
      right: this.state.animatedWidth + 'px',
      whiteSpace: 'nowrap',
      display: 'inline-block'
    };
    return _createVNode("div", {
      "class": "".concat(prefixCls, "-marquee-wrap"),
      "style": {
        overflow: 'hidden'
      },
      "role": "marquee"
    }, [_createVNode("div", {
      "ref": this.textRef,
      "class": "".concat(prefixCls, "-marquee"),
      "style": style
    }, [text])]);
  }
});
export default Marquee;