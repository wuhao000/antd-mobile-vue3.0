import {App} from 'vue';
import MNavBar from './src';
import './style';

MNavBar.install = (app: App) => {
  app.component('MNavBar', MNavBar);
};

export default MNavBar;
