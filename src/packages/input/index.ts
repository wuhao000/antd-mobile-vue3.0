import {App} from 'vue';
import MInput from './src';
import './style';

MInput.install = (app: App) => {
  app.component('MInput', MInput);
};

export default MInput as any;
