import Toast from '../../toast';
var map = new Map();
export default {
  beforeMount: function beforeMount(el, binding, vnode) {
    var value = binding.value;

    if (value) {
      var toast = Toast.loading('加载中');
      map.set(el, toast);
    }
  },
  updated: function updated(el, binding, vnode) {
    var value = binding.value;

    if (binding.value !== binding.oldValue) {
      if (value) {
        var toast = Toast.loading('加载中', 30);
        map.set(el, toast);
      } else {
        var _toast = map.get(el);

        if (_toast) {
          _toast.destroy();
        }
      }
    }
  }
};