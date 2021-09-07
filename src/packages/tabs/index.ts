import {App} from 'vue';
import MTabs from './src';
import './style';

const Plugin: any = MTabs;

Plugin.install = (app: App) => {
  app.component(MTabs.name, MTabs);
};

export default Plugin;
