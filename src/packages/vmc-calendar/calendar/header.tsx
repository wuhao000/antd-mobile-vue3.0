import {defineComponent, PropType, VNode} from 'vue';
import {Locale} from '../data-types';

export interface PropsType {
  title?: string;
  locale?: Locale;
  showClear?: boolean;
  onCancel?: () => void;
  onClear?: () => void;
  closeIcon?: VNode;
  clearIcon?: VNode;
}

const Header = defineComponent({
  name: 'Header',
  props: {
    title: {type: String},
    locale: {type: Object as PropType<Locale>},
    showClear: {type: Boolean},
    clearIcon: {},
    prefixCls: String
  },
  render() {
    const {
      title,
      locale = {} as Locale,
      showClear,
      clearIcon
    } = this.$props;
    return (
      <div class={this.prefixCls + '-header'}>
        <span class={this.prefixCls + '-header-left'}
              onClick={() => this.$emit('cancel')}>关闭</span>
        <span class={this.prefixCls + '-header-title'}>{title || locale.title}</span>
        {
          showClear &&
          <span class={this.prefixCls + '-header-right'}
                onClick={() => this.$emit('clear')}
          >{clearIcon || locale.clear}</span>
        }
      </div>
    );
  }
});

export default Header as any;
