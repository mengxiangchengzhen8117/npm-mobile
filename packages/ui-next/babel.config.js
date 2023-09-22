module.exports = {
  presets: ['@vant/cli/preset'],
  plugins: [
    'const-enum',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
  ],
};
