import {App} from 'vue';
import MCarousel from './src';
import './style';

const Plugin: any = MCarousel;

Plugin.install = (app: App) => {
  app.component('MCarousel', MCarousel);
};

export default Plugin;
