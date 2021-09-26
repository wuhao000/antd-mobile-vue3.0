import {App} from 'vue';
import MAnimate from './src/index.vue';

MAnimate.install = (app: App) => {
  app.component(MAnimate.name, MAnimate);
};

export default MAnimate;
