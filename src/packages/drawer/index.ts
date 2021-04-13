import {App} from 'vue';
import MDrawer from './src';
import './style';

MDrawer.install = (app: App) => {
  app.component('MDrawer', MDrawer);
};

export default MDrawer;
