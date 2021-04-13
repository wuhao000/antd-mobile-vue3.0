import {App} from 'vue';
import MFlex from './src';

MFlex.install = (app: App) => {
  app.component('MFlex', MFlex);
  app.component('MFlexItem', MFlex.Item);
};

export default MFlex;
