import {CopyOutlined, UserOutlined} from '@ant-design/icons-vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import 'highlight.js/styles/atelier-cave-dark.css';
import 'vite-plugin-vuedoc/style.css';
import {createApp} from 'vue';
import markdown from './components/markdown.vue';
import Antdm from './packages';
import zhCn from './packages/moment-zh_CN';
import router from './router';
import App from './views/app.vue';

moment.updateLocale('zh-cn', zhCn);
/**
 * 注册全局指令，hljs在router跳转时被清除
 */
import DemoPreview from './views/preview.vue';
const app = createApp(App);

app.config.warnHandler = (e) => {
  console.warn(e);
};
app.use(Antd);
app.use(router);
app.component('demoPreview', DemoPreview);
app.component('markdown', markdown);
app.component('UserOutlined', UserOutlined);
app.component('CopyOutlined', CopyOutlined);
app.mount('#app');
app.use(Antdm);

if (location.pathname === '/') {
  router.push('/install');
}

export default app;
