import './style';
import {App} from 'vue';
import Menu from './src';

Menu.install = (app: App) => {
  app.component('MMenu', Menu);
};

export default Menu;
