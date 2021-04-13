import {App} from 'vue';
import MGrid from './src';
import './style';

MGrid.install = (app: App) => {
  app.component('MGrid', MGrid);
};

export default MGrid;
