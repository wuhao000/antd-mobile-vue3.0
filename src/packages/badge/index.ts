import {App} from 'vue';
import MBadge from './src';
import './style';

const Plugin: any = MBadge;

Plugin.install = (app: App) => {
  app.component('MBadge', MBadge);
};

export default Plugin;
