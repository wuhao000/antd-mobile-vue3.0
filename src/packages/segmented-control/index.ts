import {App} from 'vue';
import MSegmentedControl from './src';
import './style';

MSegmentedControl.install = (app: App) => {
  app.component(MSegmentedControl.name, MSegmentedControl);
};

export default MSegmentedControl;
