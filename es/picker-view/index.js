import MPickerView from './src';
import './style';
var Plugin = MPickerView;

Plugin.install = function (app) {
  app.component('MPickerView', MPickerView);
};

export default Plugin;