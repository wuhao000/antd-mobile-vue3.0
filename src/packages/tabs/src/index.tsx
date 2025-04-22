import {
  computed,
  CSSProperties,
  defineComponent,
  onMounted,
  onUpdated,
  PropType,
  Ref,
  ref,
  Slots,
  VNode,
  watch
} from 'vue';
import {Models} from '../../../types/models';
import {unwrapFragment} from '../../utils/vue';
import Gesture, {IGestureStatus} from '../../vmc-gesture';
import {DIRECTION_DOWN, DIRECTION_LEFT, DIRECTION_RIGHT, DIRECTION_UP} from '../../vmc-gesture/config';
import DefaultTabBar from './default-tab-bar';
import TabPane from './tab-pane';
import {getTransformPropValue, setPxStyle, setTransform} from './utils';
import {camelize, flattenChildren, isValidElement} from "ant-design-vue/es/_util/props-util";

export const getPanDirection = (direction: number | undefined) => {
  switch (direction) {
    case DIRECTION_LEFT:
    case DIRECTION_RIGHT:
      return 'horizontal';
    case DIRECTION_UP:
    case DIRECTION_DOWN:
      return 'vertical';
    default:
      return 'none';
  }
};

const getTabTitle = (it: VNode) => {
  if (it.children && typeof it.children === 'object' && (it.children as Slots).title) {
    return (it.children as Slots).title()
  }
  return it.props.title;
};

const tabsProps = () => ({
  /**
   * 使用卡片样式
   */
  card: {
    type: Boolean
  },
  /**
   * 激活的卡片背景色（未激活卡片的边框色与之相同）
   */
  activeCardColor: {
    type: String
  },
  /**
   * class前缀
   */
  prefixCls: {
    type: String,
    default: 'am-tabs'
  },
  useOnPan: {
    type: Boolean,
    default: true
  },
  renderTabBar: {type: Function},
  /** TabBar's position | default: top */
  tabBarPosition: {
    default: 'top'
  },
  /**
   * 当前激活的卡片的索引
   */
  value: {
    type: [Number] as PropType<number>,
    default: 0
  },
  /**
   * 是否支持手势
   */
  swipeable: {
    type: Boolean,
    default: true
  },
  /**
   * 与当前激活标签相邻的提前渲染的标签数量
   */
  prerenderingSiblingsNumber: {
    type: Number,
    default: 1
  },
  /**
   * 切换标签时是否有动画
   */
  animated: {
    type: Boolean,
    default: true
  },
  /**
   * 是否销毁未激活的标签页
   */
  destroyInactiveTab: {
    type: Boolean,
    default: false
  },
  /**
   * 切换卡片的滑动距离，0-1之间
   */
  distanceToChangeTab: {
    type: Number,
    default: 0.3
  },
  usePaged: {
    type: Boolean,
    default: true
  },
  /**
   * 标签页方向
   */
  tabDirection: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal'
  },
  /** 标签下划线样式 */
  tabBarUnderlineStyle: {
    type: Object as PropType<any>
  },
  /** 标签页背景颜色 */
  tabBarBackgroundColor: {
    type: String
  },
  page: {
    type: Number,
    default: 5
  },
  /** 激活的标签页文字颜色 */
  tabBarActiveTextColor: {
    type: String
  },
  /** 未激活的标签页文字颜色 */
  tabBarInactiveTextColor: {
    type: String
  },
  /** 标签栏文字样式 */
  tabBarTextStyle: {
    type: Object as PropType<any>
  },
  /** use left instead of transform | default: false */
  useLeftInsteadTransform: {
    type: Boolean
  },
  onChange: Function
});


const InternalTabs = defineComponent({
  DefaultTabBar,
  name: 'MTabsInternal',
  props: {
    ...tabsProps(),
    tabs: Array
  },
  setup(props, {emit, slots}) {
    const contentPos: Ref<string> = ref('');
    const isMoving = ref(false);
    const instanceId: Ref<number> = ref(null);
    const currentTab: Ref<number> = ref(0);
    const nextCurrentTab: Ref<number> = ref(null);
    const prevCurrentTab: Ref<number> = ref(null);
    watch(() => props.value, tab => {
      if (typeof tab === 'number') {
        currentTab.value = tab;
      }
    }, {immediate: true});
    const layoutRef = ref(null);
    watch(() => currentTab.value, (index) => {
      emit('update:value', index);
    });
    const onPan = computed(() => {
      let lastOffset: number | string = 0;
      let finalOffset = 0;
      let panDirection: string;

      const getLastOffset = (isVertical = isTabVertical()) => {
        let offset = +`${lastOffset}`.replace('%', '');
        if (`${lastOffset}`.indexOf('%') >= 0) {
          offset /= 100;
          offset *= isVertical ? layoutRef.value.clientHeight : layoutRef.value.clientWidth;
        }
        return offset;
      };

      return {
        onPanStart: (status: IGestureStatus) => {
          if (!props.swipeable || !props.animated) {
            return;
          }
          panDirection = getPanDirection(status.direction);
          isMoving.value = true;
        },

        onPanMove: (status: IGestureStatus) => {
          const {swipeable, animated, useLeftInsteadTransform} = props;
          if (!status.moveStatus || !layoutRef.value.value || !swipeable || !animated) {
            return;
          }
          const isVertical = isTabVertical();
          let offset = getLastOffset();
          if (isVertical) {
            offset += panDirection === 'horizontal' ? 0 : status.moveStatus.y;
          } else {
            offset += panDirection === 'vertical' ? 0 : status.moveStatus.x;
          }
          const canScrollOffset = isVertical ?
            -layoutRef.value.scrollHeight + layoutRef.value.clientHeight :
            -layoutRef.value.scrollWidth + layoutRef.value.clientWidth;
          offset = Math.min(offset, 0);
          offset = Math.max(offset, canScrollOffset);
          setPxStyle(layoutRef.value.value, offset, 'px', isVertical, useLeftInsteadTransform);
          finalOffset = offset;
        },

        onPanEnd: () => {
          if (!props.swipeable || !props.animated) {
            return;
          }
          lastOffset = finalOffset;
          const isVertical = isTabVertical();
          const offsetIndex = getOffsetIndex(finalOffset, isVertical ? layoutRef.value.clientHeight : layoutRef.value.clientWidth);
          isMoving.value = false;
          if (offsetIndex === currentTab.value) {
            if (props.usePaged) {
              setTransform(
                layoutRef.value.style,
                getContentPosByIndex(
                  offsetIndex,
                  isTabVertical(),
                  props.useLeftInsteadTransform
                )
              );
            }
          } else {
            goToTab(offsetIndex);
          }
        },
        setCurrentOffset: (offset: number | string) => lastOffset = offset
      };
    });
    /** on tab click */
    const onTabClick = (tab: Models.TabData, index: number) => {
      emit('tab-click', index);
    };
    const isTabVertical = (direction = props.tabDirection) => {
      return direction === 'vertical';
    };
    onMounted(() => {
      nextCurrentTab.value = currentTab.value;
      instanceId.value = instanceId.value++;
      contentPos.value = getContentPosByIndex(
        currentTab.value,
        isTabVertical(props.tabDirection),
        props.useLeftInsteadTransform
      );
      prevCurrentTab.value = currentTab.value;
    });
    const getOffsetIndex = (current: number, width: number, threshold = props.distanceToChangeTab || 0) => {
      const ratio = Math.abs(current / width);
      const direction = ratio > currentTab.value ? '<' : '>';
      const index = Math.floor(ratio);
      switch (direction) {
        case '<':
          return ratio - index > threshold ? index + 1 : index;
        case '>':
          return 1 - ratio + index > threshold ? index : index + 1;
        default:
          return Math.round(ratio);
      }
    };
    const baseGoToTab = (index: number, force = false, setState: () => any = null) => {
      if (!force && nextCurrentTab.value === index) {
        return false;
      }
      nextCurrentTab.value = index;
      if (index >= 0 && index < props.tabs.length) {
        if (!force) {
          emit('change', props.tabs[index], index);
        }
        currentTab.value = index;
        if (setState) {
          setState();
        }
      }
      return true;
    };
    const getTabBarBaseProps = () => {
      const {
        animated,
        tabBarActiveTextColor,
        tabBarBackgroundColor,
        tabBarInactiveTextColor,
        tabBarPosition,
        tabBarTextStyle,
        tabBarUnderlineStyle
      } = props;
      return {
        activeTab: currentTab.value,
        animated,
        card: props.card,
        activeCardColor: props.activeCardColor,
        page: props.page,
        goToTab: tabClickGoToTab,
        tabBarActiveTextColor,
        tabBarBackgroundColor,
        tabBarInactiveTextColor,
        tabBarPosition,
        tabBarTextStyle,
        tabBarUnderlineStyle,
        instanceId: instanceId.value
      };
    };
    const getSubElements = () => {
      const children = unwrapFragment(slots.default());
      const subElements: { [key: string]: any } = {};
      return (defaultPrefix: string = '$i$-', allPrefix: string = '$ALL$') => {
        if (Array.isArray(children)) {
          children.forEach((child: any, index) => {
            if (child.key) {
              subElements[child.key] = child;
            }
            subElements[`${defaultPrefix}${index}`] = child;
          });
        } else if (children) {
          subElements[allPrefix] = children;
        }
        return subElements;
      };
    };
    const goToTab = (index: number, force = false, usePaged = props.usePaged) => {
      const {tabDirection, useLeftInsteadTransform} = props;
      let setState = () => {
      };
      if (usePaged) {
        setState = () => {
          contentPos.value = getContentPosByIndex(
            index,
            isTabVertical(tabDirection),
            useLeftInsteadTransform
          );
        };
      }
      return baseGoToTab(index, force, setState);
    };
    const tabClickGoToTab = (index: number) => {
      goToTab(index, false, true);
    };
    watch(() => props.value, (value: number) => {
      tabClickGoToTab(value);
    });
    const getContentPosByIndex = (index: number, isVertical: boolean, useLeft = false) => {
      const value = `${-index * 100}%`;
      onPan.value.setCurrentOffset(value);
      if (useLeft) {
        return `${value}`;
      } else {
        const translate = isVertical ? `0px, ${value}` : `${value}, 0px`;
        // fix: content overlay TabBar on iOS 10. ( 0px -> 1px )
        return `translate3d(${translate}, 1px)`;
      }
    };
    const onSwipe = (status: IGestureStatus) => {
      const {tabBarPosition, swipeable, usePaged} = props;
      if (!swipeable || !usePaged || isTabVertical()) {
        return;
      }

      switch (tabBarPosition) {
        case 'top':
        case 'bottom':
          switch (status.direction) {
            case DIRECTION_LEFT:
              if (!isTabVertical()) {
                goToTab(prevCurrentTab.value + 1);
              }
              break;
            case DIRECTION_UP:
              if (isTabVertical()) {
                goToTab(prevCurrentTab.value + 1);
              }
              break;
            case DIRECTION_RIGHT:
              if (!isTabVertical()) {
                goToTab(prevCurrentTab.value - 1);
              }
              break;
            case DIRECTION_DOWN:
              if (isTabVertical()) {
                goToTab(prevCurrentTab.value - 1);
              }
              break;
          }
          break;
      }
    };
    const getContentStyle = (): CSSProperties => {
      const {animated, useLeftInsteadTransform} = props;
      if (animated) {
        if (useLeftInsteadTransform) {
          return {
            position: 'relative',
            ...isTabVertical() ? {top: contentPos.value} : {left: contentPos.value}
          }
        }
        return getTransformPropValue(contentPos.value);
      }
      return {
        position: 'relative',
        ...isTabVertical() ? {top: `${-currentTab.value * 100}%`} : {left: `${-currentTab.value * 100}%`}
      };
    }
    const renderContent = (children: VNode[]) => {
      const {prefixCls, animated, destroyInactiveTab, useLeftInsteadTransform} = props;
      let contentCls = `${prefixCls}-content-wrap`;
      if (animated && !isMoving.value) {
        contentCls += ` ${contentCls}-animated`;
      }
      const contentStyle = getContentStyle()
      const {instanceId} = getTabBarBaseProps();
      return <div class={contentCls}
                  style={contentStyle}
                  ref={(el) => {
                    layoutRef.value = el;
                  }}>
        {
          children.map((tab, index) => {
            let cls = `${prefixCls}-pane-wrap`;
            if (currentTab.value === index) {
              cls += ` ${cls}-active`;
            } else {
              cls += ` ${cls}-inactive`;
            }
            return <TabPane key={tab.key}
                            class={cls}
                            forceRender={tab.props.forceRender}
                            title={getTabTitle(tab)}
                            active={currentTab.value === index}
                            role="tabpanel"
                            aria-hidden={currentTab.value !== index}
                            aria-labelledby={`m-tabs-${instanceId}-${index}`}
                            fixX={isTabVertical()}
                            fixY={!isTabVertical()}>
              {tab}
            </TabPane>;
          })
        }
      </div>;
    };
    onUpdated(() => {
      prevCurrentTab.value = currentTab.value;
    });
    return {
      isTabVertical,
      getTabBarBaseProps,
      onPan,
      onTabClick,
      onSwipe,
      currentTab,
      renderContent
    };
  },
  render() {
    const {prefixCls, tabBarPosition, tabDirection, useOnPan, tabs} = this;
    const isTabVertical = this.isTabVertical(tabDirection);
    const children = unwrapFragment(this.$slots?.default?.()) || [];
    const tabBarProps: any = {
      ...this.getTabBarBaseProps(),
      tabs
    };
    const onPan = !isTabVertical && useOnPan ? this.onPan : {};
    const content = [
      <div key="tabBar" class={`${prefixCls}-tab-bar-wrap`}>
        {this.renderTabBar?.(tabBarProps)
          ?? <DefaultTabBar
            {...tabBarProps}
            onTabClick={(tab, index) => {
              this.onTabClick(tab, index);
            }}/>
        }
      </div>,
      <Gesture key="$content"
               onSwipe={this.onSwipe}
               {...{onPan}}>
        {this.renderContent(children)}
      </Gesture>
    ];
    return <div class={`${prefixCls} ${prefixCls}-${tabDirection} ${prefixCls}-${tabBarPosition}`}>
      {
        tabBarPosition === 'top' || tabBarPosition === 'left' ? content : content.reverse()
      }
    </div>;
  }
});

export default defineComponent({
  name: 'MTabs',
  props: {
    ...tabsProps()
  },
  setup(props, {attrs, slots}) {
    const parseTabList = (children) => {
      return children
        .map(node => {
          if (isValidElement(node)) {
            const props = {...(node.props || {})};
            for (const [k, v] of Object.entries(props)) {
              delete props[k];
              props[camelize(k)] = v;
            }
            const slots = node.children || {};
            const key = node.key !== undefined ? node.key : undefined;
            const {
              tab = slots.tab,
              disabled,
              forceRender,
              closable,
              animated,
              active,
              title,
              destroyInactiveTabPane,
            } = props;
            return {
              key,
              ...props,
              node,
              closeIcon: slots.closeIcon,
              title,
              tab,
              disabled: disabled === '' || disabled,
              forceRender: forceRender === '' || forceRender,
              closable: closable === '' || closable,
              animated: animated === '' || animated,
              active: active === '' || active,
              destroyInactiveTabPane: destroyInactiveTabPane === '' || destroyInactiveTabPane,
            };
          }
          return null;
        })
        .filter(tab => tab);
    };
    return () => {
      const tabs = parseTabList(flattenChildren(slots.default?.()));
      return (
        <InternalTabs
          {...props}
          {...attrs}
          tabs={tabs}
          v-slots={slots}
        />
      );
    };
  }
});
