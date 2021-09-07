import {App} from 'vue';
import MCarousel from './src';
import './style';

MCarousel.install = (app: App) => {
  app.component(MCarousel.name, MCarousel);
};

export default MCarousel;
