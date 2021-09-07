import {App} from 'vue';
import MPullRefresh from './src/index';
import './style';

const Plugin: any = MPullRefresh;

Plugin.install = (app: App) => {
  app.component(MPullRefresh.name, MPullRefresh);
};

export default Plugin;
