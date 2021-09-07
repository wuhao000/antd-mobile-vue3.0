import {App} from 'vue';
import MNavBar from './src';
import './style';

MNavBar.install = (app: App) => {
  app.component(MNavBar.name, MNavBar);
};

export default MNavBar;
