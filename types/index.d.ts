export * from './antd-mobile-vue';

import {UIComponent} from "./components/component";

export class TouchFeedback extends UIComponent {}


declare const AntdMobileVue: {
  install: any;
}

export default AntdMobileVue;

