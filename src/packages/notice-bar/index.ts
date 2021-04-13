import {App} from 'vue';
import MNoticeBar from './src';
import './style';

MNoticeBar.install = (app: App) => {
  app.component('MNoticeBar', MNoticeBar);
};

export default MNoticeBar;
