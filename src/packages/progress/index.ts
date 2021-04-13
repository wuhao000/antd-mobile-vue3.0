import {App} from 'vue';
import MProgress from './src';
import './style';

MProgress.install = (app: App) => {
  app.component('MProgress', MProgress);
};

export default MProgress;
