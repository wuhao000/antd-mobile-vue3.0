import {App} from 'vue';
import MCarousel from './src';
import './style';

MCarousel.install = (app: App) => {
  app.component('MCarousel', MCarousel);
};

export default MCarousel;
