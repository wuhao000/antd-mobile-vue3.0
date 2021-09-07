import {App} from 'vue';
import Slider from './src';
import Item from './src/slider-item';
import './style';

Slider.Item = Item;
Slider.install = (app: App) => {
  app.component(Slider.name, Slider);
  app.component(Item.name, Slider.Item);
};
export default Slider;
