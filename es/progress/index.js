import MProgress from './src';
import './style';

MProgress.install = function (app) {
  app.component('MProgress', MProgress);
};

export default MProgress;