import {App} from 'vue';
import {CascaderView} from './cascader-view';
import './cascader-view.less';

export type {
  CascaderViewProps,
  CascaderValue,
  CascaderValueExtend,
  CascaderOption
} from './cascader-view';

CascaderView.install = (app: App) => {
  app.component(CascaderView.name, CascaderView);
};

export default CascaderView;
