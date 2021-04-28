import {defineComponent} from 'vue';
import Icon from '../index';
import Grid from '../../grid';
import {PlusOutlined} from '@ant-design/icons-vue';

const list = [
  'check-circle', 'check', 'check-circle-o',
  'cross-circle', 'cross', 'cross-circle-o',
  'up', 'down', 'left',
  'right', 'ellipsis',
  'loading'
];

export default defineComponent({
  render() {
    const data = list.map(item => ({
      icon: <Icon type={item}/>,
      text: item
    }));
    return (
      <>
        <Grid data={data}/>
      </>
    );
  }
});
