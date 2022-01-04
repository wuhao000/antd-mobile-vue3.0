import {defineComponent, ref} from 'vue';
import InfiniteScroll from '../';
import {List} from '../../';
import {sleep} from '../../utils/sleep';

let count = 0;

async function mockRequest() {
  if (count >= 5) {
    return [];
  }
  await sleep(2000);
  count++;
  return [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q'
  ];
}

export default defineComponent({
  setup() {
    const data = ref<string[]>([]);
    const hasMore = ref(true);

    async function loadMore() {
      const append = await mockRequest();
      data.value = [...data.value, ...append];
      hasMore.value = append.length > 0;
    }
    return {data, loadMore, hasMore};
  },
  render() {
    return (<div style={{
      maxHeight: '400px',
      overflowY: 'auto'
    }}>
      <List>
        {this.data.map((item, index) => (
            <List.Item key={index}>{item}</List.Item>
        ))}
      </List>
      <InfiniteScroll loadMore={this.loadMore} hasMore={this.hasMore}/>
    </div>);
  }
});

