import {App} from 'vue';
import MStepper from './src';
import './style';

MStepper.install = (app: App) => {
  app.component('MStepper', MStepper);
};

export default MStepper;
