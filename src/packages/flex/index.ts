import {App} from 'vue';
import MFlex from './src';
import Item from './src/flex-item';

MFlex.Item = Item;
MFlex.install = (app: App) => {
  app.component('MFlex', MFlex);
  app.component('MFlexItem', MFlex.Item);
};

export default MFlex;
