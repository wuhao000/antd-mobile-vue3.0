import {Drawer} from 'ant-design-vue';
import classNames from 'classnames';
import {defineComponent, inject, PropType, VNode} from 'vue';
import Icon from '../../icon';
import {useBaseInputComponent} from '../../mixins/base-input-component';
import {pureInputComponentProps} from '../../mixins/pure-input-component';
import Touchable from '../../vmc-feedback/feedback';
import omit from "omit.js";

export default defineComponent({
  name: 'MPopup',
  inheritAttrs: false,
  props: {
    ...pureInputComponentProps,
    onCancel: {},
    onOk: {},
    visible: {
      type: Boolean,
      default: false
    },
    cancelText: {
      type: String as PropType<string>,
      default: '取消'
    },
    showCancel: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    cancelButton: {
      type: Object as PropType<VNode>
    },
    showOk: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    title: {
      type: [String, Object] as PropType<string | VNode>,
      default: ''
    },
    prefixCls: {
      type: String as PropType<string>,
      default: 'am-popup'
    },
    height: {
      type: String as PropType<string>
    },
    width: {
      type: String as PropType<string>
    },
    placement: {
      type: String as PropType<string>,
      default: 'bottom'
    },
    showTitle: {
      type: Boolean as PropType<boolean>,
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
      type: Boolean as PropType<boolean>,
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
    }, form, {propName: 'visible', defaultValue: props.visible});
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
      return {
        ...props,
        title: renderHeader(),
        getContainer: props.getContainer,
        height: props.height || 'auto',
        width: props.width || 'auto',
        disabled: isDisabled.value,
        position: props.placement,
        open: isDisabled.value ? false : stateValue.value
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
    return {
      getProps,
      slots,
      getDefaultSlot,
      cssStyle,
      stateValue,
      getListeners,
      isReadonly,
      isDisabled
    };
  },
  render() {
    const props: any = omit({
      ...this.getListeners(),
      ...this.getProps(),
      style: this.cssStyle,
      visible: this.stateValue,
      maskClosable: this.confirmLoading ? false : this.maskClosable
    }, ['cancelText', 'loadingText', 'okText', "position", 'showOk', 'showTitle',
      'block', 'confirmLoading', 'showCancel']);
    return <Drawer {...props}
                   v-slots={this.slots}>
      {this.getDefaultSlot()}
    </Drawer>;
  }
});
