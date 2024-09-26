module.exports = {
  root: true,
  env: {
    'vue/setup-compiler-macros': true, // 处理error ‘defineProps’ is not defined no-undef
    node: true,
    es6: true,
    browser: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    ecmaFeatures: {
      jsx: true
    }
  },
  globals: {
    _: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended'
  ],
  rules: {
    indent: [
      2,
      2,
      {
        "SwitchCase": 1
      }
    ],
    'vue/html-closing-bracket-spacing': [
      'error',
      {
        selfClosingTag: 'always'
      }
    ],
    // 'vue/script-indent': 'off',
    'vue/no-v-html': 'off',
    // ---js---
    'no-var': 'error', // 禁止使用var
    '@typescript-eslint/no-unused-vars': 1,
    // ---ts---
    '@typescript-eslint/ban-ts-comment': 'off', // 关闭‘禁止使用@ts-’，默认开启
    '@typescript-eslint/no-empty-function': 'off', // 关闭‘禁止空方法’，默认为开启
    '@typescript-eslint/no-var-requires': 'warn', // 允许使用require，但是警告(默认不允许)
    '@typescript-eslint/explicit-module-boundary-types': 'off', // 关闭'函数必须定义参数类型和返回类型'，默认即开启
    'vue/require-default-prop': 'off', // 不检查默认属性
    'vue/multi-word-component-names': 'off', // 组件名字必须多词
    // 'vue/html-indent': 'off', // 关闭标签缩进
    'vue/attributes-order': 'warn', // 对组件属性进行排序
    'vue/attribute-hyphenation': ['error', 'always'], // 模板定义属性使用中划线
    'vue/html-closing-bracket-newline': 'off', // 关闭标签换行
    'vue/singleline-html-element-content-newline': 'off', // 关闭单行标签换行
    'vue/component-definition-name-casing': ['error', 'PascalCase'], // 组件定义命名规范
    'vue/component-name-in-template-casing': ['error', 'kebab-case', {
      registeredComponentsOnly: false
    }], // 模板中引入组件名规范
    'vue/html-self-closing': ['error', {
      html: {void: 'always'}
    }] // 自闭合标签
  }
};
