import {getPropsData} from '../../utils/props-util';
import BaseMixin from 'ant-design-vue/es/_util/BaseMixin';
import {
  isEmptyElement,
  initDefaultProps
} from 'ant-design-vue/es/_util/props-util';
import {cloneElement} from 'ant-design-vue/es/_util/vnode';
import {unwrapFragment} from '../../utils/vue';
import openAnimationFactory from './open-animation-factory';
import {collapseProps} from './common-props';
import {getDataAndAriaProps} from 'ant-design-vue/es/_util/util';
import {CSSProperties, defineComponent, ref, watch} from 'vue';

function _toArray(activeKey) {
  let currentActiveKey = activeKey;
  if (!Array.isArray(currentActiveKey)) {
    const activeKeyType = typeof currentActiveKey;
    currentActiveKey =
        activeKeyType === 'number' || activeKeyType === 'string' ? [currentActiveKey] : [];
  }
  return currentActiveKey.map(key => String(key));
}

export default defineComponent({
  name: 'Collapse',
  mixins: [BaseMixin],
  inheritAttrs: false,
  props: initDefaultProps(collapseProps(), {
    prefixCls: 'rc-collapse',
    accordion: false,
    destroyInactivePanel: false
  }),
  setup(props, {emit, slots}) {
    const {activeKey, defaultActiveKey, openAnimation, prefixCls} = props;
    let currentActiveKey = defaultActiveKey;
    if (props.activeKey !== undefined) {
      currentActiveKey = activeKey;
    }
    const currentOpenAnimations = ref(openAnimation || openAnimationFactory(prefixCls));
    const stateActiveKey = ref(_toArray(currentActiveKey));
    watch(() => props.activeKey, val => {
      stateActiveKey.value = _toArray(val);
    });
    watch(() => props.openAnimation, val => {
      currentOpenAnimations.value = val;
    });
    const setActiveKey = (activeKey) => {
      if (props.activeKey === undefined) {
        stateActiveKey.value = activeKey;
      }
      emit('change', props.accordion ? activeKey[0] : activeKey);
    };
    const onClickItem = (key) => {
      let activeKey = stateActiveKey.value;
      if (props.accordion) {
        activeKey = activeKey[0] === key ? [] : [key];
      } else {
        activeKey = [...activeKey];
        const index = activeKey.indexOf(key);
        const isActive = index > -1;
        if (isActive) {
          // remove active state
          activeKey.splice(index, 1);
        } else {
          activeKey.push(key);
        }
      }
      setActiveKey(activeKey);
    };
    const getNewChild = (child, index) => {
      if (isEmptyElement(child)) {
        return;
      }
      const activeKey = stateActiveKey.value;
      const {prefixCls, accordion, destroyInactivePanel, expandIcon} = props;

      // If there is no key provide, use the panel order as default key
      const key = String(child.key ?? index);
      const {header, headerClass, disabled} = getPropsData(child) as any;
      let isActive;
      if (accordion) {
        isActive = activeKey[0] === key;
      } else {
        isActive = activeKey.indexOf(key) > -1;
      }

      let panelEvents = {};
      if (!disabled && disabled !== '') {
        panelEvents = {
          onItemClick: onClickItem
        };
      }
      return cloneElement(child, {
        key,
        panelKey: key,
        header,
        headerClass,
        isActive,
        prefixCls,
        destroyInactivePanel,
        openAnimation: currentOpenAnimations.value,
        accordion,
        expandIcon,
        ...panelEvents
      });
    };
    const getItems = () => {
      const newChildren = [];
      const children = unwrapFragment(slots.default?.());
      children &&
      children.forEach((child, index) => {
        newChildren.push(getNewChild(child, index));
      });
      return newChildren;
    };
    return {
      currentOpenAnimations,
      stateActiveKey,
      getItems,
      onClickItem,
      getNewChild
    };
  },
  render() {
    const {prefixCls, accordion} = this.$props;
    const {class: className, style} = this.$attrs;
    const collapseClassName = {
      [prefixCls]: true,
      [className as string]: className
    };
    return (
        <div
            class={collapseClassName}
            {...getDataAndAriaProps(this.$attrs)}
            style={style as CSSProperties}
            role={accordion ? 'tablist' : null}>
          {this.getItems()}
        </div>
    );
  }
});
