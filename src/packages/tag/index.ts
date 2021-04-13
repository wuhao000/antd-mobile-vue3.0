import {App} from 'vue';
import MTag from './src';
import './style';

MTag.install = (app: App) => {
  app.component('MTag', MTag);
};

export default MTag;
