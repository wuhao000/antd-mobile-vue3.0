import {App} from 'vue';
import {Mask} from './mask';
import './mask.less';

Mask.install = (app: App) => {
  app.component(Mask.name, Mask);
};

export default Mask;
