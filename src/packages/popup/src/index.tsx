import {Drawer} from 'ant-design-vue';
import classNames from 'classnames';
import {defineComponent, inject, PropType, ref, VNode} from 'vue';
import Icon from '../../icon';
import {useBaseInputComponent} from '../../mixins/base-input-component';
import {pureInputComponentProps} from '../../mixins/pure-input-component';
import Touchable from '../../vmc-feedback/feedback';
import omit from "omit.js";
import { getZIndex } from "../../utils/zindex-manage";

export default defineComponent({
  name: 'MPopup',
  inheritAttrs: false,
  props: {
    ...pureInputComponentProps,
    onCancel: {},
    onOk: {},
    open: {
      type: Boolean,
      default: false
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    showCancel: {
      type: Boolean,
      default: false
    },
    cancelButton: {
      type: Object as PropType<VNode>
    },
    showOk: {
      type: Boolean,
      default: true
    },
    title: {
      type: [String, Object] as PropType<string | VNode>,
      default: ''
    },
    prefixCls: {
      type: String,
      default: 'am-popup'
    },
    height: {
      type: String
    },
    width: {
      type: String
    },
    placement: {
      type: String,
      default: 'bottom'
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    confirmLoading: {
      type: Boolean
    },
    getContainer: {
      type: [Object, String, Boolean],
      default: 'body'
    },
    loadingText: {
      type: String
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    okText: {
      type: String,
      default: '确定'
    }
  },
  install: null,
  setup(props, {emit, attrs, slots}) {
    const form = inject('list', undefined);
    const {stateValue, cssStyle, getDefaultSlot, isDisabled, isReadonly} = useBaseInputComponent(props, {
      emit,
      attrs,
      slots
    }, form, {propName: 'open', defaultValue: props.open});
    const onCancel = (e) => {
      if (props.onCancel) {
        emit('cancel', e);
      } else {
        stateValue.value = false;
      }
    };
    const onOk = (e) => {
      if (props.onOk) {
        emit('ok', e);
      } else {
        stateValue.value = false;
      }
    };
    const getProps = () => {
      const open = isDisabled.value ? false : stateValue.value
      return {
        block: props.block,
        cancelButton: props.cancelButton,
        cancelText: props.cancelText,
        confirmLoading: props.confirmLoading,
        getContainer: props.getContainer,
        loadingText: props.loadingText,
        maskClosable: props.maskClosable,
        prefixCls: props.prefixCls,
        okText: props.okText,
        onCancel: props.onCancel,
        onOk: props.onOk,
        showCancel: props.showCancel,
        showOk: props.showOk,
        showTitle: props.showTitle,
        value: props.value,
        title: renderHeader(),
        height: props.height || 'auto',
        width: props.width || 'auto',
        disabled: isDisabled.value,
        placement: props.placement,
        open
      };
    };
    const getListeners = () => {
      return {
        onClose: () => {
          stateValue.value = false;
          emit('cancel');
        }
      };
    };
    const renderHeader = () => {
      return props.showTitle ? <div class={`${props.prefixCls}-title-wrap`}>
        {renderCancel()}
        <div class={`${props.prefixCls}-item ${props.prefixCls}-title`}>
          {props.title}</div>
        {renderOk()}
      </div> : null;
    };
    const renderCancel = () => {
      return (props.showCancel && !props.confirmLoading) ?
        <Touchable
          disabled={props.confirmLoading}
          activeClassName={`${props.prefixCls}-item-active`}>
          <div
            onClick={(e) => {
              onCancel(e);
            }}
            class={classNames(`${props.prefixCls}-item ${props.prefixCls}-header-left`)}>{props.cancelText}</div>
        </Touchable> : null;
    };
    const renderOk = () => {
      return props.showOk ?
        <Touchable
          disabled={props.confirmLoading}
          activeClassName={`${props.prefixCls}-item-active`}>
          <div onClick={(e) => {
            if (!props.confirmLoading) {
              onOk(e);
            }
          }} class={classNames(`${props.prefixCls}-item ${props.prefixCls}-header-right`, {
            [`${props.prefixCls}-item-disabled`]: props.confirmLoading
          })}>
            {props.confirmLoading ? <Icon type={'loading'}/> : undefined}
            {props.confirmLoading ? props.loadingText : props.okText}</div>
        </Touchable> : null;
    };
    const drawerRef = ref();
    const setDrawerRef = (el) => {
      drawerRef.value = el;
    };
    const calcContentHeight = () => {
      // todo
    };
    return {
      getProps,
      slots,
      getDefaultSlot,
      cssStyle,
      calcContentHeight,
      setDrawerRef,
      stateValue,
      getListeners,
      isReadonly,
      isDisabled
    };
  },
  render() {
    const props = omit({
      ...this.getListeners(),
      ...this.getProps(),
      closable: false,
      style: this.cssStyle,
      open: this.stateValue,
      maskClosable: this.confirmLoading ? false : this.maskClosable,
    }, ['cancelText', 'loadingText', 'okText', 'showOk', 'showTitle',
      'block', 'confirmLoading', 'showCancel']);
    this.calcContentHeight();
    
    return <Drawer
      {...props}
      ref={this.setDrawerRef}
      zIndex={getZIndex()}
      push={{
        distance: 0
      }}
      v-slots={this.slots}/>;
  }
});
