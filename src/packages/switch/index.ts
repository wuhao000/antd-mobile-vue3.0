import {App} from 'vue';
import MSwitch from './src/switch';
import MSwitchItem from './src/switch-item';
import './style';

MSwitch.Item = MSwitchItem;
MSwitch.install = (app: App) => {
  app.component('MSwitch', MSwitch);
  app.component('MSwitchItem', MSwitchItem);
};

export default MSwitch;
