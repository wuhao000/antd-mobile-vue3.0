import {arrayTreeFilter} from '../utils/array';
import {defineComponent, inject, onBeforeUpdate, PropType, reactive} from 'vue';
import MultiPicker from '../vmc-picker/multi-picker';
import RmcPicker from '../vmc-picker/picker';

export default defineComponent({
  name: 'MCascader',
  props: {
    onChange: {},
    onScrollChange: {},
    defaultValue: {},
    value: {},
    data: {
      type: Array as PropType<any[]>,
      default: () => []
    },
    cols: {
      type: Number as PropType<number>,
      default: 3
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    pickerItemStyle: {},
    indicatorStyle: {},
    prefixCls: {
      default: 'rmc-cascader'
    },
    pickerPrefixCls: {
      default: 'rmc-picker'
    }
  },
  setup(props, {emit}) {
    const store: {
      onCancel: () => void;
      onOk: (...args: any) => any
    } = inject('store', undefined);
    const getValue = (d, val) => {
      let data = d || props.data;
      let value = val || props.value || props.defaultValue;
      if (!value || !value.length || value.indexOf(undefined) > -1) {
        value = [];
        for (let i = 0; i < props.cols; i++) {
          if (data && data.length) {
            value[i] = data[0].value;
            data = data[0].children;
          }
        }
      }
      return value;
    };
    const state = reactive({
      value: getValue(props.data, props.defaultValue || props.value)
    });
    const onOk = () => {
      emit('update:value', state.value);
      emit('change', state.value);
    };
    const onCancel = () => {
      state.value = getValue(props.data, props.defaultValue || props.value);
      emit('cancel', state.value);
    };
    const onScrollChange = () => {
      emit('scroll-change');
    };
    const onValueChange = (value) => {
      state.value = value;
      emit('change', value);
    };
    const getCols = () => {
      const {data, cols, pickerPrefixCls, disabled, pickerItemStyle, indicatorStyle} = props;
      const value = state.value;
      const childrenTree = arrayTreeFilter(data, (c, level) => {
        return c.value === value[level];
      }).map(c => c.children);

      // in case the users data is async get when select change
      const needPad = cols! - childrenTree.length;
      if (needPad > 0) {
        for (let i = 0; i < needPad; i++) {
          childrenTree.push([]);
        }
      }
      childrenTree.length = cols! - 1;
      childrenTree.unshift(data);
      return childrenTree.map((children: any[] = [], level) => (
          <RmcPicker
              key={level}
              prefixCls={pickerPrefixCls}
              style={{flex: 1}}
              disabled={disabled}
              data={children}
              itemStyle={pickerItemStyle}
              indicatorStyle={indicatorStyle}/>
      ));
    };
    {
      if (store) {
        store.onOk = onOk;
        store.onCancel = onCancel;
      }
    }
    onBeforeUpdate(() => {
      if (props.value !== undefined) {
        state.value = getValue(props.data, props.value);
      }
    });

    return {
      getCols, state, onValueChange, onScrollChange
    };
  },
  render() {
    const props = this.$props;
    const {prefixCls} = props;
    const cols = this.getCols();
    const multiStyle = {
      flexDirection: 'row',
      alignItems: 'center'
    };
    const pickerProps = {
      prefixCls,
      value: this.state.value,
      style: multiStyle,
      ['onUpdate:value']: this.onValueChange,
      onScrollChange: this.onScrollChange
    };
    return <MultiPicker {...pickerProps}>{cols}</MultiPicker>;
  }
});
