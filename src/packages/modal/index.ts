import {App} from 'vue';
import MModal from './src';
import './style';

MModal.install = (app: App) => {
  app.component(MModal.name, MModal);
};

export default MModal;
