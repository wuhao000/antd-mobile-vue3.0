import {App} from 'vue';
import Cascader from './src/index';

Cascader.install = (app: App) => {
  app.component(Cascader.name, Cascader);
};

export default Cascader;
