import MIcon from './src';
import './style';
var Plugin = MIcon;

Plugin.install = function (app) {
  app.component('MIcon', MIcon);
};

export default Plugin;