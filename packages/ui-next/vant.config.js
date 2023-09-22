const siteConfig = require('./site');

module.exports = {
  name: 'ui-next',
  build: {
    css: {
      preprocessor: 'sass',
    },
    site: {
      publicPath: '/ui-next/',
    },
  },
  site: siteConfig,
};
