import { createVNode as _createVNode, mergeProps as _mergeProps } from "vue";
import raf from 'raf';
import { defineComponent, onBeforeUnmount, onMounted, provide, ref } from 'vue';
export default defineComponent({
  name: 'Container',
  props: {},
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var framePending = ref(false);
    var events = ref(['resize', 'scroll', 'touchstart', 'touchmove', 'touchend', 'pageshow', 'load']);
    var subscribers = ref([]);
    var rafHandle = ref(null);
    var nodeRef = ref(null);

    var subscribe = function subscribe(handler) {
      subscribers.value = subscribers.value.concat(handler);
    };

    var unsubscribe = function unsubscribe(handler) {
      subscribers.value = subscribers.value.filter(function (current) {
        return current !== handler;
      });
    };

    var notifySubscribers = function notifySubscribers(evt) {
      if (!framePending.value) {
        var currentTarget = evt.currentTarget;
        rafHandle.value = raf(function () {
          framePending.value = false;

          var _nodeRef$value$getBou = nodeRef.value.getBoundingClientRect(),
              top = _nodeRef$value$getBou.top,
              bottom = _nodeRef$value$getBou.bottom;

          subscribers.value.forEach(function (handler) {
            return handler({
              distanceFromTop: top,
              distanceFromBottom: bottom,
              eventSource: currentTarget === window ? document.body : nodeRef.value
            });
          });
        });
        framePending.value = true;
      }
    };

    var getParent = function getParent() {
      return nodeRef.value;
    };

    onMounted(function () {
      events.value.forEach(function (event) {
        window.addEventListener(event, notifySubscribers);
        document.body.addEventListener(event, notifySubscribers);
      });
    });
    onBeforeUnmount(function () {
      if (rafHandle.value) {
        raf.cancel(rafHandle.value);
        rafHandle.value = null;
      }

      events.value.forEach(function (event) {
        window.removeEventListener(event, notifySubscribers);
        document.body.removeEventListener(event, notifySubscribers);
      });
    });
    provide('stickyContext', {
      subscribe: subscribe,
      unsubscribe: unsubscribe,
      getParent: getParent
    });
    return {
      nodeRef: nodeRef,
      notifySubscribers: notifySubscribers,
      setNodeRef: function setNodeRef(el) {
        nodeRef.value = el;
      }
    };
  },
  render: function render() {
    var _this$$slots$default, _this$$slots;

    return _createVNode("div", _mergeProps(this.$props, {
      "ref": this.setNodeRef,
      "onScroll": this.notifySubscribers,
      "onTouchstart": this.notifySubscribers,
      "onTouchmove": this.notifySubscribers,
      "onTouchend": this.notifySubscribers
    }), [(_this$$slots$default = (_this$$slots = this.$slots).default) === null || _this$$slots$default === void 0 ? void 0 : _this$$slots$default.call(_this$$slots)]);
  }
});