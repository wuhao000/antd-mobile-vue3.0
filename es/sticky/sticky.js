import _extends from "@babel/runtime/helpers/extends";
import { createVNode as _createVNode } from "vue";
import { computed, defineComponent, inject, onBeforeUnmount, onMounted, onUpdated, reactive, ref } from 'vue';
export default defineComponent({
  name: 'Container',
  props: {
    topOffset: {
      type: Number,
      default: 0
    },
    bottomOffset: {
      type: Number,
      default: 0
    },
    relative: {
      type: Boolean,
      default: false
    },
    disableCompensation: {
      type: Boolean,
      default: false
    },
    disableHardwareAcceleration: {
      type: Boolean,
      default: false
    }
  },
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var context = inject('stickyContext', undefined);
    var state = reactive({
      isSticky: false,
      wasSticky: false,
      style: {},
      distanceFromTop: null,
      distanceFromBottom: null,
      calculatedHeight: null
    });
    var contentWrapRef = ref(null);
    var placeholderRef = ref(null);
    var content = computed(function () {
      return contentWrapRef.value.children[0];
    });

    var handleContainerEvent = function handleContainerEvent(_ref2) {
      var distanceFromTop = _ref2.distanceFromTop,
          distanceFromBottom = _ref2.distanceFromBottom,
          eventSource = _ref2.eventSource;
      var parent = context.getParent();
      var preventingStickyStateChanges = false;
      var distanceFromTopCopy = distanceFromTop;

      if (props.relative) {
        preventingStickyStateChanges = eventSource !== parent;
        distanceFromTopCopy = -(eventSource.scrollTop + eventSource.offsetTop) + placeholderRef.value.offsetTop;
      }

      var distanceFromBottomCopy = distanceFromBottom;
      var placeholderClientRect = placeholderRef.value.getBoundingClientRect();
      var contentClientRect = content.value.getBoundingClientRect();
      var calculatedHeight = contentClientRect.height;
      var bottomDifference = distanceFromBottomCopy - props.bottomOffset - calculatedHeight;
      var wasSticky = state.isSticky;
      var isSticky = preventingStickyStateChanges ? wasSticky : distanceFromTopCopy <= -props.topOffset && distanceFromBottomCopy > -props.bottomOffset;
      distanceFromBottomCopy = (props.relative ? parent.scrollHeight - parent.scrollTop : distanceFromBottomCopy) - calculatedHeight;
      var style = !isSticky ? {} : {
        position: 'fixed',
        top: bottomDifference > 0 ? props.relative ? parent.offsetTop - parent.offsetParent.scrollTop : 0 : bottomDifference,
        left: placeholderClientRect.left,
        width: placeholderClientRect.width
      };

      if (!props.disableHardwareAcceleration) {
        style.transform = 'translateZ(0)';
      }

      state.isSticky = isSticky;
      state.wasSticky = wasSticky;
      state.distanceFromTop = distanceFromTopCopy;
      state.distanceFromBottom = distanceFromBottomCopy;
      state.calculatedHeight = calculatedHeight;
      state.style = style;
    };

    onMounted(function () {
      if (!context.subscribe) {
        throw new TypeError('Expected Sticky to be mounted within StickyContainer');
      }

      context.subscribe(handleContainerEvent);
    });
    onBeforeUnmount(function () {
      context.unsubscribe(handleContainerEvent);
    });
    onUpdated(function () {
      placeholderRef.value.style.paddingBottom = props.disableCompensation ? '0' : "".concat(state.isSticky ? state.calculatedHeight : 0, "px");
    });
    return {
      setContentWrapRef: function setContentWrapRef(el) {
        contentWrapRef.value = el;
      },
      setPlaceholderRef: function setPlaceholderRef(el) {
        placeholderRef.value = el;
      },
      state: state
    };
  },
  render: function render() {
    return _createVNode("div", null, [_createVNode("div", {
      "ref": this.setPlaceholderRef
    }, null), _createVNode("div", {
      "ref": this.setContentWrapRef,
      "style": _extends({
        zIndex: 1,
        width: '100%'
      }, this.state.style)
    }, [this.$slots.default()])]);
  }
});