import {App} from 'vue';
import MWingBlank from './src';
import './style';

MWingBlank.install = (app: App) => {
  app.component('MWingBlank', MWingBlank);
};

export default MWingBlank;
