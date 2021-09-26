import {App} from 'vue';
import '../list/style';
import MCheckbox from './src';
import AgreeItem from './src/agree-item';
import CheckboxItem from './src/checkbox-item';
import MCheckboxList from './src/checkbox-list';
import MCheckboxPopupList from './src/checkbox-popup-list';
import './style';

MCheckbox.AgreeItem = AgreeItem;
MCheckbox.Item = CheckboxItem;
MCheckbox.List = MCheckboxList;
MCheckbox.PopupList = MCheckboxPopupList;

MCheckbox.install = (app: App) => {
  app.component(MCheckbox.name, MCheckbox);
  app.component(MCheckboxList.name, MCheckboxList);
  app.component(CheckboxItem.name, MCheckbox.CheckboxItem);
  app.component(AgreeItem.name, MCheckbox.AgreeItem);
  app.component(MCheckboxPopupList.name, MCheckboxPopupList);
};

export default MCheckbox;
