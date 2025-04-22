import {unwrapFragment} from '../utils/vue';
import classnames from 'classnames';
import {defineComponent, PropType, ref} from 'vue';
import {setListeners, setProps} from '../utils/vnode';

export default defineComponent({
  name: 'MultiPickerMixin',
  props: {
    onValueChange: {},
    onScrollChange: {},
    prefixCls: {
      type: String
    },
    value: {type: Array as PropType<any[]>}
  },
  setup(props, {slots, emit}) {
    const stateValue = ref(props.value);
    const onChange = (i, v, cb) => {
      const value = stateValue.value.concat();
      value[i] = v;
      if (cb) {
        cb(value, i);
      }
    };
    const onValueChange = (i, v) => {
      const value = stateValue.value;
      value[i] = v;
      emit('update:value', value, i);
    };
    const onScrollChange = (i, v) => {
      onChange(i, v, (...args) => {
        emit('scroll-change', ...args);
      });
    };
    return {onValueChange, stateValue, onScrollChange};
  },
  render() {
    const {prefixCls, value} = this.$props;
    const colElements = this.$slots.default();
    unwrapFragment(colElements).forEach((col: any, i) => {
      setProps(col, {
        value: value[i]
      });
      setListeners(col, {
        'onUpdate:value': value => {
          this.onValueChange(i, value);
        },
        scrollChange: (value) => {
          this.onScrollChange(i, value);
        }
      });
    });
    return (
        <div class={classnames(prefixCls)}>
          {colElements}
        </div>
    );
  }
});
