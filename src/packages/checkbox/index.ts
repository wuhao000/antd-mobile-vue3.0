import '../list/style';
import MCheckbox from './src';
import AgreeItem from './src/agree-item';
import CheckboxItem from './src/checkbox-item';
import MCheckboxList from './src/checkbox-list';
import MCheckboxPopupList from './src/checkbox-popup-list';
import './style';

const Plugin: any = MCheckbox;
Plugin.AgreeItem = AgreeItem;
Plugin.CheckboxItem = CheckboxItem;
Plugin.install = Vue => {
  Vue.component('MCheckbox', MCheckbox);
  Vue.component('MCheckboxList', MCheckboxList);
  Vue.component('MCheckboxItem', MCheckbox.CheckboxItem);
  Vue.component('MAgreeItem', MCheckbox.AgreeItem);
  Vue.component('MCheckboxPopupList', MCheckboxPopupList);
};

export default Plugin;
