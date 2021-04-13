import {App} from 'vue';
import MActionSheet from './src';
import './style';

MActionSheet.install = (app: App) => {
  app.component('MActionSheet', MActionSheet);
};

export default MActionSheet;
