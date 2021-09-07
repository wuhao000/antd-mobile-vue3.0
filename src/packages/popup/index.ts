import './style';
import {App} from 'vue';
import MPopup from './src';

MPopup.install = (app: App) => {
  app.component(MPopup.name, MPopup);
};

export default MPopup;
