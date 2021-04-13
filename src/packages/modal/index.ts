import {App} from 'vue';
import MModal from './src';
import './style';

MModal.install = (app: App) => {
  app.component('MModal', MModal);
};

export default MModal;
