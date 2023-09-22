const { copySync, existsSync, readdirSync, removeSync } = require('fs-extra');
const path = require('path');
const execa = require('execa');
const { isDir } = require('./utils');

async function buildTypeDeclarations() {
  const tsConfig = path.resolve(__dirname, '../tsconfig.declaration.json');

  if (existsSync(tsConfig)) {
    await execa('tsc', ['-p', tsConfig]);
  }
}

const SRC_DIR = path.resolve(__dirname, '../src');
const TEMP_TYPES_DIR = path.resolve(__dirname, '../tempTypes');
const LIB_DIR = path.resolve(__dirname, '../lib');
const ES_DIR = path.resolve(__dirname, '../es');

const isDeclarationFile = (filename) => {
  return /.d.ts$/.test(filename);
};

const removeFiles = (dir) => {
  const filenameList = readdirSync(dir);
  filenameList.forEach((filename) => {
    const pathOfFile = path.resolve(dir, filename);
    if (isDir(pathOfFile)) {
      removeFiles(pathOfFile);
    } else if (!isDeclarationFile(pathOfFile)) {
      removeSync(pathOfFile);
    }
  });
};

const emitTypes = async () => {
  console.log('🚀   emit types start!!');
  removeSync(TEMP_TYPES_DIR);
  copySync(SRC_DIR, TEMP_TYPES_DIR);
  copySync(
    path.resolve(ES_DIR, 'index.js'),
    path.resolve(TEMP_TYPES_DIR, 'index.js')
  );
  await buildTypeDeclarations();
  removeFiles(TEMP_TYPES_DIR);
  copySync(TEMP_TYPES_DIR, LIB_DIR);
  copySync(TEMP_TYPES_DIR, ES_DIR);
  removeSync(TEMP_TYPES_DIR);
  console.log('🚀   emit types success!!');
};

emitTypes();
