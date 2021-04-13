import {App} from 'vue';
import Popover from './src';
import Item from './src/item';
import './style';

Popover.Item = Item;

Popover.install = (app: App) => {
  app.component('MPopover', Popover);
  app.component('MPopoverItem', Popover.Item);
};

export default Popover;
