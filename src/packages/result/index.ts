import {App} from 'vue';
import MResult from './src';
import './style';

MResult.install = (app: App) => {
  app.component('MResult', MResult);
};

export default MResult;
