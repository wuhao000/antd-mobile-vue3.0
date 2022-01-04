import {App} from 'vue';
import Loading from './loading';
import './loading.less';

Loading.install = (app: App) => {
  app.component(Loading.name, Loading);
};

export default Loading;
