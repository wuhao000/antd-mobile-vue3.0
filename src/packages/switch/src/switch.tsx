import classnames from 'classnames';
import {defineComponent, PropType} from 'vue';
import {creatFormComponentProps, useFormComponent} from '../../mixins/form-component';

export default defineComponent({
  name: 'MSwitch',
  props: {
    ...creatFormComponentProps(),
    color: {
      type: String
    },
    name: {
      type: String
    },
    prefixCls: {
      type: String,
      default: 'am-switch'
    },
    platform: {
      type: String,
      default: 'ios'
    }
  },
  setup(props, ctx) {
    const {currentValue} = useFormComponent(props, ctx);

    const onChange = (e) => {
      currentValue.value = e.target.checked;
    };
    const onClick = (e: any) => {
      let val;
      // tslint:disable-next-line:prefer-conditional-expression
      if (e && e.target && e.target.checked !== undefined) {
        val = e.target.checked;
      } else {
        val = props.value;
      }
      currentValue.value = val;
    };

    return {currentValue, onChange, onClick};
  },
  render() {
    const {
      prefixCls,
      name,
      disabled,
      platform,
      color,
      ...restProps
    } = this.$props;
    const wrapCls = classnames(prefixCls, {
      [`${prefixCls}-android`]: platform === 'android'
    });

    const fackInputCls = classnames('checkbox', {
      [`checkbox-disabled`]: disabled
    });

    const globalProps = Object.keys({...restProps, ...this.$attrs}).reduce<{
      [key: string]: any;
    }>((prev, key) => {
      if (
        key.substr(0, 5) === 'aria-' ||
        key.substr(0, 5) === 'data-' ||
        key === 'role'
      ) {
        prev[key] = (restProps as any)[key];
      }
      return prev;
    }, {});

    const style: any = {};
    if (color && this.currentValue) {
      style.backgroundColor = color;
    }

    return (
      <label class={wrapCls}>
        <input
          type="checkbox"
          name={name}
          class={`${prefixCls}-checkbox`}
          disabled={disabled}
          checked={this.currentValue}
          onChange={this.onChange}
          value={this.currentValue ? 'on' : 'off'}
          {...(!disabled ? {onClick: this.onClick} : {})}
          {...globalProps}
        />
        <div
          class={fackInputCls}
          style={style}
          {...(disabled ? {onClick: this.onClick} : {})}
        />
      </label>
    );
  }
});
