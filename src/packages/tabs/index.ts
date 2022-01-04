import {App} from 'vue';
import MTabs from './src';
import Tab from './src/tab';
import './style';

const Plugin: any = MTabs;

MTabs.Tab = Tab;

Plugin.install = (app: App) => {
  app.component(MTabs.name, MTabs);
  app.component(Tab.name, Tab);
};

export default Plugin;
