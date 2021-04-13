import {App} from 'vue';
import MPicker from './src';
import './style';

const Plugin: any = MPicker;

Plugin.install = (app: App) => {
  app.component('MPicker', MPicker);
};

export default Plugin;
