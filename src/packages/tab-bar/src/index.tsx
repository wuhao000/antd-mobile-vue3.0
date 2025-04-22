import {unwrapFragment} from '../../utils/vue';
import {defineComponent, isVNode, PropType, provide, reactive, watch} from 'vue';
import Tabs from '../../tabs';
import Icon from "../../icon";
import Badge from "../../badge";

const tabClsPrefix = 'am-tab-bar-tab'

const TabBar = defineComponent({
  name: 'MTabBar',
  props: {
    prefixCls: {
      default: 'am-tab-bar'
    },
    className: {},
    hidden: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '正在加载'
    },
    noRenderContent: {},
    prerenderingSiblingsNumber: {
      type: Number,
      default: 1
    },
    barTintColor: {
      type: String,
      default: 'white'
    },
    tintColor: {
      type: String,
      default: '#108ee9'
    },
    unselectedTintColor: {
      type: String,
      default: '#888'
    },
    tabBarPosition: {
      type: String as PropType<'top' | 'bottom'>,
      default: 'bottom'
    },
    animated: {
      type: Boolean,
      default: false
    },
    swipeable: {
      type: Boolean,
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
    const renderIcon = (tabProps) => {
      const selected = tabProps.key === store.currentTab;
      const {
        dot,
        badge,
        selectedIcon,
        icon,
        prefixCls
      } = tabProps;
      const realIcon: any = selected ? selectedIcon ?? icon : icon;
      const iconDom = realIcon ? (
        isVNode(realIcon) ? realIcon : <Icon
          class={`${prefixCls}-image`}
          type={realIcon}
        />
      ) : null;
      if (badge) {
        return (
          <Badge text={badge} class={`${prefixCls}-badge tab-badge`}>
            {' '}
            {iconDom}{' '}
          </Badge>
        );
      }
      if (dot) {
        return (
          <Badge dot class={`${prefixCls}-badge tab-dot`}>
            {iconDom}
          </Badge>
        );
      }
      return iconDom;
    };
    const getContent = (tabProps) => {
      const selected = tabProps.key === store.currentTab;
      const iconColor = selected ? tabProps.tintColor : tabProps.unselectedTintColor;
      return <div
        onClick={() => {
          setCurrentTab(tabProps.key)
        }}
        class={{
          [tabClsPrefix]: true,
          [`${tabClsPrefix}-selected`]: selected
        }}>
        <div class={`${tabClsPrefix}-icon`} style={{color: iconColor}}>
          {renderIcon(tabProps)}
        </div>
        <p class={`${tabClsPrefix}-title`}
           style={{color: iconColor}}>
          {tabProps.title}
        </p>
      </div>
    }
    const getTabs = () => {
      const children = unwrapFragment(slots.default());
      return children.map((it, index) => ({
        key: it.key ?? `tab_${index}`,
        ...it.props
      }));
    }
    const renderTabBar = () => {
      let cls = `${props.prefixCls}-bar`;
      if (props.hidden) {
        cls += ` ${props.prefixCls}-bar-hidden-${props.tabBarPosition}`;
      }
      const tabs = getTabs();
      return <div class={cls} style={{backgroundColor: props.barTintColor}}>
        {tabs.map(it => getContent(it))}
      </div>;
    };
    provide('tabBar', {
      slots,
      props
    });
    provide('tabBarStore', store);
    return {
      store, renderTabBar, getTabs
    };
  },
  render() {
    const {
      prefixCls,
      animated,
      swipeable,
      prerenderingSiblingsNumber,
      tabBarPosition
    } = this.$props;
    const tabs = this.getTabs();
    const value = tabs.findIndex(it => it.key === this.store.currentTab);
    return (
      <div class={prefixCls}>
        <Tabs renderTabBar={this.renderTabBar}
              value={value}
              tabBarPosition={tabBarPosition}
              animated={animated}
              swipeable={swipeable}
              prerenderingSiblingsNumber={prerenderingSiblingsNumber}>
          {this.$slots.default()}
        </Tabs>
      </div>
    );
  }
});

export default TabBar;
