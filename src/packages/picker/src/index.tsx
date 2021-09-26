import {arrayTreeFilter} from '../../utils/array';
import {cloneVNode, defineComponent, PropType, provide, reactive, ref, Ref, VNode, watch} from 'vue';
import {setProps} from '../../utils/vnode';
import RMCCascader from '../../vmc-cascader/cascader';
import RMCPopupCascader from '../../vmc-cascader/popup';
import RMCMultiPicker from '../../vmc-picker/multi-picker';
import RMCPicker from '../../vmc-picker/picker';
import {PickerData} from './props-type';

export const PickerMixin = (isView) => {
  return defineComponent({
    name: 'MPicker',
    props: {
      placeholder: {
        type: String as PropType<string>,
        default: ''
      },
      cancelText: {
        type: String as PropType<string>,
        default: '取消'
      },
      okText: {
        type: String as PropType<string>,
        default: '确定'
      },
      prefixCls: {
        type: String as PropType<string>,
        default: 'am-picker'
      },
      triggerType: {
        type: String as PropType<string>,
        default: 'click'
      },
      pickerPrefixCls: {
        type: String as PropType<string>,
        default: 'am-picker-col'
      },
      popupPrefixCls: {
        type: String as PropType<string>,
        default: 'am-picker-popup'
      },
      title: {
        type: [String, Object] as PropType<string>,
        default: ''
      },
      data: {},
      cascade: {
        type: Boolean as PropType<boolean>,
        default: true
      },
      value: {
        type: Array as PropType<any[]>
      },
      format: {
        type: Function as PropType<(values: Array<VNode | string>) => string | VNode[]>,
        default: (values: VNode[]) => {
          // label is JSX.Element or other
          if (values.length > 0 && typeof values[0] !== 'string') {
            return values;
          }
          return values.join(',');
        }
      },
      cols: {
        type: Number as PropType<number>,
        default: 3
      },
      extra: {},
      onChange: {},
      itemStyle: {},
      indicatorStyle: {},
      visible: {
        type: Boolean, default: false
      }
    },
    setup(props, {emit, slots}) {
      const state = reactive({
        visible: props.visible
      });
      watch(() => props.visible, v => {
        state.visible = v;
      });
      watch(() => state.visible, v => emit('update:visible', v));
      const currentValue: Ref<Array<any>> = ref(props.value ?? []);
      const popupProps: Ref<{
        WrapComponent: 'div',
        transitionName: 'am-slide-up',
        maskTransitionName: 'am-fade',
      }> = ref(null);
      watch(() => props.value, (v: any[]) => {
        if (v && v !== currentValue.value) {
          currentValue.value = [...v];
        }
      }, {immediate: true});
      const getSel = () => {
        const value = currentValue.value || [];
        let treeChildren: PickerData[];
        const data = props.data;
        if (props.cascade) {
          treeChildren = arrayTreeFilter(data as PickerData[], (c: any, level: any) =>
              c.value === value[level]);
        } else {
          treeChildren = value.map((v, i) => (data as PickerData[][])[i].filter(d => d.value === v)[0]);
        }
        const extra = (
            props.format &&
            props.format(treeChildren.map(v => v.label))
        );
        if (Array.isArray(extra)) {
          return extra[0];
        }
        return extra;
      };
      const getPickerCol = () => {
        const {data, pickerPrefixCls, itemStyle, indicatorStyle} = props;
        return (data as PickerData[][]).map((col, index) => {
          return (
              <RMCPicker
                  key={index}
                  prefixCls={pickerPrefixCls}
                  style={{flex: 1}}
                  data={col}
                  itemStyle={itemStyle}
                  indicatorStyle={indicatorStyle}/>
          );
        });
      };
      const onOk = (v: any) => {
        emit('update:value', [...currentValue.value]);
        state.visible = false;
      };
      const setScrollValue = (v: any) => {
        currentValue.value = v;
      };
      const setCasecadeScrollValue = (v: any) => {
        // 级联情况下保证数据正确性，滚动过程中只有当最后一级变化时才变更数据
        if (v && currentValue.value) {
          const length = currentValue.value.length;
          if (
              length === v.length &&
              currentValue.value[length - 1] === v[length - 1]
          ) {
            return;
          }
        }
        setScrollValue(v);
      };
      const onPickerChange = (v: Array<string | number>) => {
        setScrollValue(v);
        emit('pickerChange', v);
      };
      const onCancel = () => {
        state.visible = false;
        currentValue.value = props.value ?? [];
      };
      const getPlaceholder = () => props.placeholder || '';
      provide('store', {onOk: null});
      return {
        onOk, onPickerChange, getSel,
        getPlaceholder, state, onCancel,
        setCasecadeScrollValue, setScrollValue,
        getPickerCol, popupProps, currentValue
      };
    },
    render() {
      const {
        popupPrefixCls,
        itemStyle,
        indicatorStyle,
        okText,
        cancelText,
        extra,
        cascade,
        prefixCls,
        pickerPrefixCls,
        data,
        cols,
        ...restProps
      } = this.$props;

      let cascader;
      let popupMoreProps = {};
      if (cascade) {
        cascader = (
            <RMCCascader
                prefixCls={prefixCls}
                pickerPrefixCls={pickerPrefixCls}
                data={data as PickerData[]}
                cols={cols}
                v-model={[this.currentValue, 'value']}
                onChange={this.onPickerChange}
                onScrollChange={this.setCasecadeScrollValue}
                pickerItemStyle={itemStyle}
                indicatorStyle={indicatorStyle}/>
        );
      } else {
        cascader = (
            <RMCMultiPicker
                style={{flexDirection: 'row', alignItems: 'center'}}
                prefixCls={prefixCls}
                v-model={[this.currentValue, 'value']}
                onScrollChange={this.setScrollValue}>
              {this.getPickerCol()}
            </RMCMultiPicker>
        );
        popupMoreProps = {
          pickerValueProp: 'value',
          pickerValueChangeProp: 'onValueChange'
        };
      }
      if (isView) {
        return cascader;
      }
      const props = {
        ...this.popupProps,
        ...restProps,
        ...popupMoreProps,
        prefixCls: popupPrefixCls,
        visible: this.state.visible,
        cascader,
        cancelText,
        okText,
        onOk: this.onOk,
        onCancel: this.onCancel
      };
      const childExtra = this.getSel() || extra || this.getPlaceholder() || '';
      return (
          <RMCPopupCascader
              v-slots={{
                cascader: () => cascader,
                default: () => {
                  return this.$slots.default && this.$slots.default().map(child => {
                    const node = cloneVNode(child);
                    setProps(node, {
                      touchFeedback: true,
                      extra: childExtra,
                      arrow: 'horizontal',
                      onClick: () => {
                        this.state.visible = true;
                      }
                    });
                    return node;
                  });
                }
              }}
              {...props}>
          </RMCPopupCascader>
      );
    }
  });
};

export default PickerMixin(false);
