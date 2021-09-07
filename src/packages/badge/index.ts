import {App} from 'vue';
import MBadge from './src';
import './style';

const Plugin: any = MBadge;

Plugin.install = (app: App) => {
  app.component(MBadge.name, MBadge);
};

export default Plugin;
