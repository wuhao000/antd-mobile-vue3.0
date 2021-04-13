import {App} from 'vue';
import ImagePicker from './src';
import './style';

ImagePicker.install = (app: App) => {
  app.component('MImagePicker', ImagePicker);
};
export default ImagePicker;
