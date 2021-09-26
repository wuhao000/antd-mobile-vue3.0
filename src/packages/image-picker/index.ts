import {App} from 'vue';
import ImagePicker from './src';
import './style';

ImagePicker.install = (app: App) => {
  app.component(ImagePicker.name, ImagePicker);
};
export default ImagePicker;
