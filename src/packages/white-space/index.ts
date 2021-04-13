import {App} from 'vue';
import MWhiteSpace from './src';
import './style';

const Plugin: any = MWhiteSpace;

Plugin.install = (app: App) => {
  app.component('MWhiteSpace', MWhiteSpace);
};

export default Plugin;
