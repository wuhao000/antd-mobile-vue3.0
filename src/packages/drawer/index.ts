import {App} from 'vue';
import MDrawer from './src';
import './style';

MDrawer.install = (app: App) => {
  app.component(MDrawer.name, MDrawer);
};

export default MDrawer;
