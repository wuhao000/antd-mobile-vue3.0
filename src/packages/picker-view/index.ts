import MPickerView from './src';
import './style';

const Plugin = MPickerView;

Plugin.install = app => {
  app.component('MPickerView', MPickerView);
};

export default Plugin;
