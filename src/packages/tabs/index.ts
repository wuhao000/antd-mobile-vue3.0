import MTabs from './src';
import './style';

const Plugin: any = MTabs;

Plugin.install = app => {
  app.component('MTabs', MTabs);
};

export default Plugin;
