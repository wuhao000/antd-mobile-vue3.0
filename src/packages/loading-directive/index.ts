import LoadingDirective from './src';

export default {
  install(Vue) {
    Vue.directive('loading', LoadingDirective);
  }
};
