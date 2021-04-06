module.exports = {
  presets: [
    ['@vue/cli-plugin-babel/preset', { useBuiltIns: 'entry' }]
  ],
  'plugins': [
    ['import', { 'libraryName': 'ant-design-vue', 'libraryDirectory': 'es', 'style': true }] // `style: true` for less
  ]
};
