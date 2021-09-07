import {App} from 'vue';
import MFlex from './src';
import Item from './src/flex-item';

MFlex.Item = Item;
MFlex.install = (app: App) => {
  app.component(MFlex.name, MFlex);
  app.component(Item.name, Item);
};

export default MFlex;
