import MTabs from './src';
import './style';
var Plugin = MTabs;

Plugin.install = function (app) {
  app.component('MTabs', MTabs);
};

export default Plugin;