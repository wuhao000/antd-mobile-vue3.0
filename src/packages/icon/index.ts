import {App} from 'vue';
import MIcon from './src';
import './style';

MIcon.install = (app: App) => {
  app.component('MIcon', MIcon);
};

export default MIcon;
