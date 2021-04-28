import {unwrapFragment} from '../../utils/vue';
import {defineComponent, PropType, provide, reactive, watch} from 'vue';
import Tabs from '../../tabs';


const TabBar = defineComponent({
  name: 'MTabBar',
  props: {
    prefixCls: {
      default: 'am-tab-bar'
    },
    className: {},
    hidden: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    placeholder: {
      type: String as PropType<string>,
      default: '正在加载'
    },
    noRenderContent: {},
    prerenderingSiblingsNumber: {
      type: Number as PropType<number>,
      default: 1
    },
    barTintColor: {
      type: String as PropType<string>,
      default: 'white'
    },
    tintColor: {
      type: String as PropType<string>,
      default: '#108ee9'
    },
    unselectedTintColor: {
      type: String as PropType<string>,
      default: '#888'
    },
    tabBarPosition: {
      type: String as PropType<'top' | 'bottom'>,
      default: 'bottom'
    },
    animated: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    swipeable: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    value: {
      type: [Number, String] as PropType<string | number>
    }
  },
  setup(props, {emit, slots}) {
    const store = reactive({
      currentTab: undefined
    });
    watch(() => props.value, (value: number | string) => {
      store.currentTab = value;
    }, {immediate: true});
    watch(() => store.currentTab, (value: number | string) => {
      emit('update:value', value);
    });

    const setCurrentTab = (tab: string) => {
      const children = unwrapFragment(slots.default());
      store.currentTab = tab;
      emit('click', tab, children.find(it => it.key === tab));
    };
    const renderTabBar = () => {
      let cls = `${props.prefixCls}-bar`;
      if (props.hidden) {
        cls += ` ${props.prefixCls}-bar-hidden-${props.tabBarPosition}`;
      }
      return <div class={cls} style={{backgroundColor: props.barTintColor}}>
        {slots.default()}
      </div>;
    };
    provide('tabBar', {
      setCurrentTab,
      slots,
      props
    });
    provide('store', store);
    return {
      store, renderTabBar
    };
  },
  render() {
    const {
      prefixCls,
      animated,
      swipeable,
      noRenderContent,
      prerenderingSiblingsNumber,
      tabBarPosition
    } = this.$props;
    return (
      <div class={prefixCls}>
        <Tabs renderTabBar={this.renderTabBar}
              onClick={(e) => {
                e.stopPropagation();
              }}
              tabBarPosition={tabBarPosition}
              animated={animated}
              swipeable={swipeable}
              noRenderContent={noRenderContent}
              prerenderingSiblingsNumber={prerenderingSiblingsNumber}>
          {this.$slots.default?.()}
        </Tabs>
      </div>
    );
  }
});

export default TabBar;
