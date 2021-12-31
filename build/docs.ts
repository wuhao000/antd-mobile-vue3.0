import fs from 'fs';
import {Component} from './components';
import componentList from "./components";

import {render as renderTemplate} from "./tmpl";

const basePath = 'src/packages';

interface DemoDescriptor {
  fileName: string;
  markdownFileContent: string;
  name: string;
  /** 标题 */
  title: string;
  vueFileContent: string;
}

console.log('生成文档中……');

function createDemoFile(component: Component, componentDemoRootPath, demoName, fileName, vueContent) {
  const name = demoName.substring(0, 1).toUpperCase() + demoName.substring(1);
  const content = renderTemplate('src/templates/demo-index.vue.tmpl', {
    name, demoName, dir: component.dir, fileName
  });
  const componentGeneratedFilePath = 'src/generated/' + component.dir;
  if (!fs.existsSync('src/generated')) {
    fs.mkdirSync('src/generated');
  }
  if (!fs.existsSync(componentGeneratedFilePath)) {
    fs.mkdirSync(componentGeneratedFilePath);
  }
  const demoDir = `src/packages/${component.name}/demo`;
  if (!fs.existsSync(demoDir)) {
    fs.mkdirSync(demoDir);
  }
  fs.writeFileSync(`${componentGeneratedFilePath}/${demoName}.txt`, vueContent);
  fs.writeFileSync(`${componentGeneratedFilePath}/${demoName}.vue`, content);
}

const titleMap = {
  props: '属性说明',
  events: '事件说明',
  functions: '方法说明',
  slots: '插槽说明'
};

function createDemoTemplate(demos: DemoDescriptor[], options) {
  const demoComponents = demos.map(it => it.name).map(it => `    <${it} id="${it}"/>`).join('\n');
  const mdComponents = ['props', 'events', 'functions', 'slots'].map(it => {
    if (options[it]) {
      return `<div class="markdown-body" id="${it}">
      <span></span>
      <h2>${titleMap[it]}</h2>
    </div>
    <${it}-doc/>`;
    } else {
      return '';
    }
  }).filter(it => it.length > 0).join('\n\t\t');
  const title = options.title ? '<title-doc/>' : '';
  return renderTemplate('src/templates/demo.vue.tmpl', {
    title,
    demoComponents,
    mdComponents,
    anchors: '',
    propsExists: options['props'] || false,
    eventsExists: options['events'] || false,
    functionsExists: options['functions'] || false,
    slotsExists: options['slots'] || false
  });
}

/**
 * 生成组件的示例页和说明页
 * @param {Component} component
 * @param componentDemoRootPath
 * @param {DemoDescriptor[]} demos
 */
function createDemoIndex(component: Component, componentDemoRootPath, demos: DemoDescriptor[]) {
  const demoImports = demos.map(it => `  import ${it.name} from './${it.name}.vue';`)
      .join('\n');
  const options = {
    title: fs.existsSync(`${componentDemoRootPath}/README.md`),
    props: fs.existsSync(`${componentDemoRootPath}/props.md`),
    events: fs.existsSync(`${componentDemoRootPath}/events.md`),
    functions: fs.existsSync(`${componentDemoRootPath}/functions.md`),
    slots: fs.existsSync(`${componentDemoRootPath}/slots.md`)
  };
  const mdImports = Object.keys(options)
      .filter(it => options[it])
      .map(it => `import ${it.substr(0, 1).toUpperCase() + it.substr(1)}Doc from '../../packages/${component.dir}/demo/${it === 'title' ? 'README' : it}.md';`)
      .join('\n  ');

  function generateComponents(demos: DemoDescriptor[], options: {
    slots: boolean;
    functions: boolean;
    title: boolean;
    events: boolean;
    props: boolean
  }) {
    const components = [];
    Object.keys(options).forEach(key => {
      if (options[key]) {
        components.push(`${key.substr(0, 1).toUpperCase() + key.substr(1)}Doc`);
      }
    });
    if (demos.length) {
      components.push(`M${component.upperCase}: ${component.upperCase}`);
      components.push(...demos.map(it => it.name));
    }
    return components.join(', ');
  }

  const content = `${createDemoTemplate(demos, options)}
<script lang="ts">
${demoImports};
  
  import {defineComponent} from 'vue';
  ${component.type !== 'tool' ? `import ${component.upperCase} from '../../packages/${component.dir}';` : ''}
  ${mdImports}

  export default defineComponent({
    components: {${generateComponents(demos, options)}},
    setup() {
      return {};
    }
  });
</script>
<style lang="less" scoped>
  .toc-affix {
    width: 150px;
    position: fixed;
    top: 100px;
    right: 10px;
    bottom: 250px;
    z-index: 500;
  }
</style>
`;
  const dir = 'src/generated/' + component.dir;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  const demoPageContent = renderTemplate('src/templates/demo.tmpl', {
    tmpl: demos.map(demo => {
      return `<demo-wrapper title="${demo.title}">
      <${demo.name}/>
    </demo-wrapper>`;
    }).join('\n\t\t'),
    imports: demos.map(demo => {
      return `import ${demo.name} from '../../packages/${component.name}/demo/${pureFileName(demo.fileName)}';`;
    }).join('\n  '),
    components: demos.length ? demos.map(demo => demo.name).join(', ') + ',' : ''
  });
  fs.writeFileSync('src/generated/' + component.dir + '/index.vue', content);
  fs.writeFileSync('src/generated/' + component.dir + '/demo.vue', demoPageContent);
}

function pureFileName(name) {
  if (name.indexOf('.ts') > 0) {
    return name.substr(0, name.lastIndexOf('.'));
  }
  return name;
}

function resolveDemo(component) {
  const componentDemoRootPath = `${basePath}/${component.dir}/demo`;
  if (fs.existsSync(componentDemoRootPath)) {
    const paths = fs.readdirSync(componentDemoRootPath);
    const demoFiles = paths.filter(it => it.startsWith('demo') && (it.endsWith('.vue') || it.endsWith('.ts') || it.endsWith('.tsx')));
    const demos: DemoDescriptor[] = [];
    demoFiles.forEach(fileName => {
      const demoName = fileName.substr(0, fileName.lastIndexOf('.'));
      const demoFile = `${componentDemoRootPath}/${fileName}`;
      const vueContent = fs.readFileSync(demoFile).toString();
      const markdownPath = componentDemoRootPath + '/' + demoName + '.md';
      createDemoFile(component, componentDemoRootPath,
          demoName, fileName, vueContent);
      const markdownContent = fs.existsSync(markdownPath) ? fs.readFileSync(markdownPath).toString() : '';
      const firstLine = markdownContent.split('\n')[0];
      demos.push({
        name: fileName.substr(0, fileName.lastIndexOf('.')),
        fileName: fileName,
        title: firstLine ? (firstLine.startsWith('####') ? firstLine.substring(4).trim() : firstLine.trim()) : '',
        markdownFileContent: markdownContent,
        vueFileContent: fs.readFileSync(demoFile).toString()
      });
    });
    createDemoIndex(component, componentDemoRootPath, demos);
  }
}

componentList.forEach(component => {
  resolveDemo(component);
});
generateMainFile();

/**
 * 生成入口文件src/packages/index.ts
 */
export default function generateMainFile() {
  const res = renderTemplate('src/templates/index.ts.tmpl', {
    imports: componentList.map(it => {
      return `import ${it.upperCase} from './${it.dir}';`;
    }).join('\n'),
    vueComponents: componentList.filter(it => it.type !== 'tool').map(it => it.upperCase).join(',\n\t'),
    components: componentList.map(it => it.upperCase).join(',\n\t')
  });
  fs.writeFileSync('src/packages/index.ts', res);
}
require('./router');
console.log('生成文档完成');
