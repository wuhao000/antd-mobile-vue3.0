import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { defineConfig } from 'vite';
import Markdown, { Mode } from 'vite-plugin-markdown';
import vitePluginString from 'vite-plugin-string';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Markdown({
      mode: [Mode.HTML]
    }),
    vitePluginString({
      include: ['**/*.txt'],
      compress: false
    }),
    vueJsx(),
    vue({include: [/\.vue$/]})
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
});
