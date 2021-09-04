module.exports = function(api) {

  api && api.cache(false);

  return {
    presets: [
      ['@vue/cli-plugin-babel/preset', { useBuiltIns: 'entry' }],
      '@babel/preset-typescript'
    ],
    plugins: [
      '@babel/plugin-transform-runtime',
      '@babel/plugin-transform-object-assign'
    ]
  };
};
