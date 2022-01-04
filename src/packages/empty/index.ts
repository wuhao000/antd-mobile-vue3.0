import {App} from 'vue';
import Empty from './src/empty';
import './style/empty.less';

Empty.install = (app: App) => {
  app.component(Empty.name, Empty);
};

export type {EmptyProps} from './src/empty';

export default Empty;
