import {DirectiveBinding} from '@vue/runtime-core';
import {Directive, VNode} from 'vue';
import Toast from '../../toast';

const map = new Map();
export default {
  beforeMount(el: HTMLElement, binding: DirectiveBinding, vnode: VNode) {
    const value = binding.value;
    if (value) {
      const toast = Toast.loading('加载中');
      map.set(el, toast);
    }
  },
  updated(el: HTMLElement, binding: DirectiveBinding, vnode: VNode) {
    const value = binding.value;
    if (binding.value !== binding.oldValue) {
      if (value) {
        const toast = Toast.loading('加载中', 30);
        map.set(el, toast);
      } else {
        const toast = map.get(el);
        if (toast) {
          toast.destroy();
        }
      }
    }
  }
} as Directive;
