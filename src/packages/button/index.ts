import {App} from 'vue';
import MButton from './src';
import './style';

MButton.install = (app: App) => {
  app.component(MButton.name, MButton);
};
export default MButton;
