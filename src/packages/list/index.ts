import {App} from 'vue';
import MList from './src';
import Item, {Brief} from './src/item';
import './style';

Item.Brief = Brief;
MList.Item = Item;
MList.install = (app: App) => {
  app.component('MList', MList);
  app.component('MListItem', MList.Item);
  app.component('MListItemBrief', MList.Item.Brief);
};

export default MList;
