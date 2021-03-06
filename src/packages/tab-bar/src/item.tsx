import {unwrapFragment} from '../../utils/vue';
import {computed, defineComponent, getCurrentInstance, inject, onMounted, PropType, ref, VNode} from 'vue';
import getDataAttr from '../../utils/get-data-attr';
import Tab from './tab';

let _uid = 100;

export default defineComponent({
  inheritAttrs: false,
  name: 'MTabBarItem',
  props: {
    badge: {
      type: [String, Number] as PropType<string | number>
    },
    selected: {
      type: Boolean as PropType<boolean>,
      default: undefined
    },
    icon: {
      type: [String, Object] as PropType<string | VNode>
    },
    selectedIcon: {
      type: [String, Object] as PropType<any>
    },
    title: {
      type: [String, Object] as PropType<string>,
      default: ''
    },
    dot: {
      type: Boolean as PropType<boolean>
    },
    prefixCls: {
      type: String as PropType<string>,
      default: 'am-tab-bar'
    }
  },
  setup(props, {emit, slots}) {
    const store: { currentTab: string | number } = inject('store');
    const tabBar: any = inject('tabBar');
    const instance = getCurrentInstance();

    const localSelected = computed(() => {
      return props.selected !== undefined ? props.selected : (instance.vnode.key === store.currentTab);
    });
    const onClick = (e) => {
      tabBar.setCurrentTab(instance.vnode.key);
      emit('click', e);
    }
    return {
      tabBar, localSelected,
      onClick,
      _uid: _uid++
    };
  },
  render() {
    const {
      tintColor,
      unselectedTintColor
    } = this.tabBar.props;
    const icon = this.$slots.icon ? this.$slots.icon[0] : this.icon;
    const selectedIcon = this.$slots.selectedIcon ? this.$slots.selectedIcon : (this.selectedIcon || icon);
    const props = {
      ...this.$props,
      prefixCls: `${this.prefixCls}-tab`,
      tintColor,
      unselectedTintColor,
      icon,
      selectedIcon,
      selected: this.localSelected
    };
    return (
      <Tab {...props}
           onClick={this.onClick}
           v-slots={this.$slots}
           dataAttrs={getDataAttr(this.$props)}/>
    );
  }
});
