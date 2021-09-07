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
  app.component(MRadio.name, MRadio);
  app.component(MRadioItem.name, MRadioItem);
  app.component(MRadioPopupList.name, MRadioPopupList);
  app.component(MRadioList.name, MRadioList);
};

export default MRadio;
