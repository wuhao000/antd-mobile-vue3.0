import {App} from 'vue';
import {InfiniteScroll} from './infinite-scroll';
import './infinite-scroll.less';

export type {InfiniteScrollProps} from './infinite-scroll';

InfiniteScroll.install = (app: App) => {
  app.component(InfiniteScroll.name, InfiniteScroll);
};

export default InfiniteScroll;
