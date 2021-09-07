import {App} from 'vue';
import MDatePicker from './src';
import Item from './src/item';
import './style';

MDatePicker.Item = Item;

MDatePicker.install = (app: App) => {
  app.component(MDatePicker.name, MDatePicker);
  app.component(Item.name, Item);
};

export default MDatePicker;
