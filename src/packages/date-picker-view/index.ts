import './style';
import {App} from 'vue';
import DatePickerView from './src';

DatePickerView.install = (app: App) => {
  app.component(DatePickerView.name, DatePickerView);
};

export default DatePickerView;
