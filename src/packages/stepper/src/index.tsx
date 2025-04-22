import classnames from 'classnames';
import {defineComponent, PropType} from 'vue';
import Icon from '../../icon';
import RMCInputNumber from '../../vmc-input-number';

export default defineComponent({
  install: null,
  name: 'MStepper',
  props: {
    prefixCls: {
      type: String,
      default: 'am-stepper'
    },
    showNumber: {
      type: Boolean,
      default: true
    },
    min: {
      type: Number
    },
    max: {
      type: Number
    },
    step: {
      default: 1
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean
    },
    autoFocus: {
      type: Boolean
    },
    value: {
      type: [Number, String] as PropType<number>
    },
    defaultValue: {
      type: Number
    },
    valueEditable: {
      type: Boolean,
      default: true
    },
    upStyle: {},
    downStyle: {},
    inputStyle: {},
    name: {
      type: String
    }
  },
  setup(props, {emit, slots}) {


    const getCurrentValue = () => {
      const value = props.value;
      let currentValue = null;
      if (typeof value === 'string') {
        if (value === '') {
          currentValue = null;
        } else {
          currentValue = parseInt(value);
        }
      } else {
        currentValue = value;
      }
      return currentValue;
    };


    return {
      getCurrentValue
    };
  },
  render() {
    const {showNumber, value, ...restProps} = this.$props;

    const stepperClass = classnames({
      showNumber: !!showNumber
    });
    const props: any = {
      ...restProps
    }
    props.upHandler = <Icon type="plus" size="xxs"/>;
    props.downHandler = <Icon type="minus" size="xxs"/>;
    return (
      <RMCInputNumber
        {...{
          ...this.$attrs,
          ...props,
          value: this.getCurrentValue(),
        }}
        class={stepperClass}/>
    );
  }
});
