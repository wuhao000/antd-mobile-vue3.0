  import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import {defineConfig} from 'vite';
import Markdown from 'vite-plugin-md';
import vitePluginString from 'vite-plugin-string';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vitePluginString(
        {
          include: [
            '**/*.txt'
          ],
          compress: false
        }),
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
    }),
    vue({
      include: [/\.vue$/, /\.md$/]
    }),
    Markdown()
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
});
