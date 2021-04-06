import { defineComponent, getCurrentInstance, onMounted, ref } from 'vue';
export default defineComponent({
  name: 'Portal',
  props: {
    getContainer: {
      type: Function,
      required: true
    }
  },
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var container = ref(null);
    container.value = props.getContainer();
    var instance = getCurrentInstance();
    onMounted(function () {
      container.value.appendChild(instance.vnode.el);
    });
    return {
      container: container
    };
  },
  render: function render() {
    var _this$$slots$default, _this$$slots;

    return (_this$$slots$default = (_this$$slots = this.$slots).default) === null || _this$$slots$default === void 0 ? void 0 : _this$$slots$default.call(_this$$slots);
  }
});