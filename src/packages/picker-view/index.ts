import {App} from 'vue';
import MPickerView from './src';
import './style';

const Plugin = MPickerView;

Plugin.install = (app: App) => {
  app.component('MPickerView', MPickerView);
};

export default Plugin;
