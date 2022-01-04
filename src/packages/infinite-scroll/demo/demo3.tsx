import {defineComponent, ref} from 'vue';
import {Button, InfiniteScroll, List, Loading, SearchBar} from '../../';
import {sleep} from '../../utils/sleep';

import './demo3.less';

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

    const loadMore = async () => {
      const append = await mockRequest();
      data.value = [...data.value, ...append];
      hasMore.value = append.length > 0;
    };

    const doSearch = () => {
      data.value = [];
      hasMore.value = true;
      loadMore();
    };
    doSearch();
    return {data, loadMore, hasMore, doSearch};
  },
  render() {
    return (
        <div style={{
          maxHeight: '400px',
          overflowY: 'auto'
        }}>
          <div class={'header'}>
            <div class={'left'}>
              <SearchBar/>
            </div>
            <div class={'right'}>
              <Button size="small" type="primary" onClick={this.doSearch}>
                搜索
              </Button>
            </div>
          </div>
          {this.data.length > 0 ? (
              <>
          <List>
            {this.data.map((item, index) => (
                <List.Item key={index}>{item}</List.Item>
            ))}
          </List>
          <InfiniteScroll
              loadMore={this.loadMore}
              hasMore={this.hasMore}/>
        </>
          ) : (
              <div class={'placeholder'}>
                <div class={'loadingWrapper'}>
                  <Loading/>
                </div>
                正在拼命加载数据
              </div>
          )}
        </div>
    );
  }
});

