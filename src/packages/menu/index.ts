import './style';
import {App} from 'vue';
import Menu from './src';

Menu.install = (app: App) => {
  app.component(Menu.name, Menu);
};

export default Menu;
