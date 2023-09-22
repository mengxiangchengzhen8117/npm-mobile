const fs = require('fs');
const postcss = require('postcss');
const pxtorem = require('postcss-pxtorem');
const descardDup = require('postcss-discard-duplicates');

const pathObj = require('path');

const { getAllFilesOfDir } = require('./utils');

const execPostCssFn = (plugins, generateFileFn = (filename) => filename) => {
  const formatPlugins = Array.isArray(plugins) ? plugins : [plugins];
  ['es', 'lib'].forEach((dirname) => {
    getAllFilesOfDir(pathObj.join(__dirname, '../', dirname)).forEach((f) => {
      if (/.css$/.test(f)) {
        const css = fs.readFileSync(f, 'utf8');
        const processedCss = postcss(...formatPlugins).process(css).css;
        fs.writeFileSync(generateFileFn(f), processedCss, (err) => {
          if (err) {
            throw err;
          }
          console.log('Rem file written.');
        });
      }
    });
  });
};

console.log('🚀   css discard duplicates start!!');
execPostCssFn(descardDup);
console.log('🚀   css discard duplicates success!!');

// 根节点font size 设置 初始值 为100
const ROOT_FONT_SIZE = 100;

console.log('🚀   px * 3 to rem start!!');
const optionsOfThreeTimes = {
  rootValue: ROOT_FONT_SIZE / 3,
  replace: true,
  propList: ['*'],
};
execPostCssFn(pxtorem(optionsOfThreeTimes), (f) =>
  f.replace(/(\.css)$/, '-3x$1')
);
console.log('🚀   px * 3 to rem success!!');

console.log('🚀   px to rem start!!');
const options = {
  rootValue: ROOT_FONT_SIZE,
  replace: true,
  propList: ['*'],
};

execPostCssFn(pxtorem(options));
console.log('🚀   px to rem success!!');
