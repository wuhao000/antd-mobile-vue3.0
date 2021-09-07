import {App} from 'vue';
import MCalendar from './src';
import Item from './src/item';
import View from './src/view';
import './style';

MCalendar.Item = Item;
MCalendar.View = View;

MCalendar.install = (app: App) => {
  app.component(MCalendar.name, MCalendar);
  app.component(Item.name, MCalendar.Item);
  app.component(View.name, MCalendar.View);
};

export default MCalendar;
