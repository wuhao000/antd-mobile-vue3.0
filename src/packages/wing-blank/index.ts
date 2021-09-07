import {App} from 'vue';
import MWingBlank from './src';
import './style';

MWingBlank.install = (app: App) => {
  app.component(MWingBlank.name, MWingBlank);
};

export default MWingBlank;
