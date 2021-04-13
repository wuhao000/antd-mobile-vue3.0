import LoadingDirective from './src';

export default {
  install(app) {
    app.directive('loading', LoadingDirective);
  }
};
