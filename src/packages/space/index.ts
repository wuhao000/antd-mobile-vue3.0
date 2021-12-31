import './style/index.less'
import {Space} from './src/space'
import {App} from "vue";

Space.install = (app: App) => {
  app.component(Space.name, Space);
}

export default Space;
