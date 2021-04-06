import VuePlugin from 'rollup-plugin-vue';
import typescript from 'rollup-plugin-typescript2';
import path from 'path';
import vueJsx from "rollup-plugin-vue-jsx-compat"
import esbuild from "rollup-plugin-esbuild";

export default [
  {
    input: 'src/packages/index.ts',
    output: {
      file: 'dist/app.js',
      format: 'esm',
      sourcemap: 'inline'
    },
    plugins: [
      VuePlugin(),
      typescript({
        // Absolute path to import correct config in e2e tests
        tsconfig: path.resolve(__dirname, 'tsconfig.json')
      }),
      vueJsx(),
      esbuild({
        jsxFactory: "vueJsxCompat",
      }),
    ],
    external: ['vue']
  }
];
