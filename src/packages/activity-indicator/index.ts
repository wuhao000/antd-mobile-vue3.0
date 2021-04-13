import {App} from 'vue';
import MActivityIndicator from './src';
import './style';

MActivityIndicator.install = (app: App) => {
  app.component('MActivityIndicator', MActivityIndicator);
};

export default MActivityIndicator;
