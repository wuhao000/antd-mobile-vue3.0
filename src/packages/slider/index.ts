import {App} from 'vue';
import Slider from './src';
import Item from './src/slider-item';
import './style';

Slider.Item = Item;
Slider.install = (app: App) => {
  app.component('MSlider', Slider);
  app.component('MSliderItem', Slider.Item);
};
export default Slider;
