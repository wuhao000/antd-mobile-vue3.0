import {App} from 'vue';
import MPagination from './src';
import './style';

MPagination.install = (app: App) => {
  app.component('MPagination', MPagination);
};

export default MPagination;
