import {App} from 'vue';
import MIcon from './src';
import './style';

const Plugin: any = MIcon;

Plugin.install = (app: App) => {
  app.component('MIcon', MIcon);
};

export default Plugin;
