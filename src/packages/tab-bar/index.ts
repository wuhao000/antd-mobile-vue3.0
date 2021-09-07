import {App} from 'vue';
import MTabBar from './src';
import Item from './src/item';
import './style';

MTabBar.Item = Item;

MTabBar.install = (app: App) => {
  app.component(MTabBar.name, MTabBar);
  app.component(Item.name, MTabBar.Item);
};

export default MTabBar;
