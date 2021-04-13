import {App} from 'vue';
import MSearchBar from './src';
import './style';

MSearchBar.install = (app: App) => {
  app.component('MSearchBar', MSearchBar);
};

export default MSearchBar;
