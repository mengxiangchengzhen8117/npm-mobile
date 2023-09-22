const siteConfig = require('./site');

module.exports = {
  name: 'activity-ui',
  build: {
    css: {
      preprocessor: 'sass',
    },
    site: {
      publicPath: '/activity-ui/',
    },
  },
  site: siteConfig,
};
