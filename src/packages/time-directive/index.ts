import time from './src';

export default {
  install(app) {
    app.directive('time', time);
  }
};
