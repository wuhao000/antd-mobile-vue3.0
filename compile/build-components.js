/**
 * Compile components
 */
const fs = require('fs-extra');
const path = require('path');
const babel = require('@babel/core');
const vueCompiler = require('@vue/compiler-sfc');

const esDir = path.join(__dirname, '../es');
const srcDir = path.join(__dirname, '../src/packages');
const babelConfig = {
  configFile: path.join(__dirname, './babel.config.js')
};

const scriptRegExp = /\.(js|jsx|ts|tsx)$/;
const isDir = dir => fs.lstatSync(dir).isDirectory();
const isCode = path => !/(demo|test|\.md)$/.test(path);
const isScript = path => scriptRegExp.test(path);
const isVue = path => /\.vue$/.test(path);

function compile(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);

    // remove unnecessary files
    if (!isCode(file)) {
      return fs.removeSync(filePath);
    }

    // scan dir
    if (isDir(filePath)) {
      return compile(filePath);
    }

    // compile js or ts
    if (isScript(file)) {
      const { code } = babel.transformFileSync(filePath, babelConfig);
      fs.removeSync(filePath);
      fs.outputFileSync(filePath.replace(scriptRegExp, '.js'), code);
    } else if (isVue(file)) {
      const content = fs.readFileSync(filePath).toString();
      const r = vueCompiler.parse(content);
      if (r.descriptor.script) {
        const { code } = babel.transformSync(r.descriptor.script.content, {
          ...babelConfig,
          filename: file + '.tsx'
        });
        fs.outputFileSync(
            filePath,
            `<template>${r.descriptor.template.content}</template>
<script>
${code}
</script>
${r.descriptor.styles.map(it => {
              let str = '<style';
              if (it.lang) {
                str += ` lang="${it.lang}"`;
              }
              if (it.scoped) {
                str += ' scoped';
              }
              str += '>';
              str += it.content;
              str += '</style>';
              return str;
            })}
`
        );
      }
    }
  });
}

// clear dir
fs.emptyDirSync(esDir);

// compile es dir
fs.copySync(srcDir, esDir);
compile(esDir);
