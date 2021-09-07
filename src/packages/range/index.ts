import {App} from 'vue';
import MRange from './src';
import Item from './src/item';
import './style';

MRange.Item = Item;

MRange.install = (app: App) => {
  app.component(MRange.name, MRange);
  app.component(Item.name, Item);
};

export default MRange;
