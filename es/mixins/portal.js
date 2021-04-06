import { createVNode as _createVNode } from "vue";
import { defineComponent, getCurrentInstance, onMounted, ref } from 'vue';
export default defineComponent({
  name: 'Portal',
  props: {
    getContainer: {
      type: Function,
      default: function _default() {
        var container = document.createElement('div');
        document.body.appendChild(container);
        return container;
      }
    }
  },
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var container = ref(null);

    if (!container.value) {
      container.value = props.getContainer();
    }

    var instance = getCurrentInstance();
    onMounted(function () {
      container.value.appendChild(instance.vnode.el);
    });
    return {
      container: container
    };
  },
  render: function render() {
    if (this.$slots.default && this.$slots.default.length) {
      return this.$slots.default[0];
    } else {
      return _createVNode("div", null, null);
    }
  }
});