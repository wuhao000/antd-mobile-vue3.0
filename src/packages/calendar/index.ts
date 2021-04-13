import {App} from 'vue';
import MCalendar from './src';
import Item from './src/item';
import View from './src/view';
import './style';

MCalendar.Item = Item;
MCalendar.View = View;

MCalendar.install = (app: App) => {
  app.component('MCalendar', MCalendar);
  app.component('MCalendarItem', MCalendar.Item);
  app.component('MCalendarView', MCalendar.View);
};

export default MCalendar;
