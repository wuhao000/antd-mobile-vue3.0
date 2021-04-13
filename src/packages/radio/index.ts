import {App} from 'vue';
import MRadio from './src';
import MRadioItem from './src/radio-item';
import MRadioList from './src/radio-list';
import MRadioPopupList from './src/radio-popup-list';
import './style';

MRadio.Item = MRadioItem;
MRadio.List = MRadioList;
MRadio.PopupList = MRadioPopupList;

MRadio.install = (app: App) => {
  app.component('MRadio', MRadio);
  app.component('MRadioItem', MRadioItem);
  app.component('MRadioPopupList', MRadioPopupList);
  app.component('MRadioList', MRadioList);
};

export default MRadio;
