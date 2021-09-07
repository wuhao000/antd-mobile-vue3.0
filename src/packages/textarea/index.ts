import {App} from 'vue';
import MTextarea from './src';
import './style';

const Plugin: any = MTextarea;

Plugin.install = (app: App) => {
  app.component(MTextarea.name, MTextarea);
};

export default Plugin;
