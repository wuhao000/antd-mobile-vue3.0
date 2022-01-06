import {App} from 'vue';
import MList from './src';
import Item, {Brief} from './src/item';
import './style';

export type FormLayout = 'vertical' | 'horizontal'


Item.Brief = Brief;
MList.Item = Item;
MList.install = (app: App) => {
  app.component(MList.name, MList);
  app.component(MList.Item.name, MList.Item);
  app.component(MList.Item.Brief.name, MList.Item.Brief);
};

export default MList;
