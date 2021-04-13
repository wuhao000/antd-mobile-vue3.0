import {App} from 'vue';
import MRange from './src';
import Item from './src/item';
import './style';

MRange.Item = Item;

MRange.install = (app: App) => {
  app.component('MRange', MRange);
  app.component('MRangeItem', Item);
};

export default MRange;
