import {defineComponent, PropType, VNode} from 'vue';
import Icon from '../icon';

const httpReg = /^http(s)?:\/\//;

export interface IconResProps {
  iconType: 'img' | 'icon';
  [key: string]: any;
}

export default defineComponent({
  name: 'IconRes',
  props: {
    type: [String, Object] as PropType<string | object>
  },
  render() {
    const icon = this.type;
    if (typeof icon === 'string') {
      if (httpReg.test(icon)) {
        return <img src={icon} alt={''}/>;
      } else {
        return <Icon type={icon} size={'md'}/>;
      }
    } else if (typeof icon === 'object') {
      if ((icon as any).context) {
        return icon;
      } else if (['icon', 'img'].includes((icon as IconResProps).iconType)) {
        return <Icon {...icon}/>;
      }
    }
  }
});
