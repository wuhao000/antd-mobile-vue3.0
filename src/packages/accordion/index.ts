import RcCollapse from 'ant-design-vue/lib/vc-collapse';
import {App} from 'vue';
import MAccordion from './src';
import './style';

MAccordion.Panel = RcCollapse.Panel;

MAccordion.install = (app: App) => {
  app.component('MAccordion', MAccordion);
  app.component('MAccordionPanel', MAccordion.Panel);
};

export default MAccordion;
