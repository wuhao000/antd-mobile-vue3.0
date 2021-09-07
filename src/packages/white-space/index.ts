import {App} from 'vue';
import MWhiteSpace from './src';
import './style';

const Plugin: any = MWhiteSpace;

Plugin.install = (app: App) => {
  app.component(MWhiteSpace.name, MWhiteSpace);
};

export default Plugin;
