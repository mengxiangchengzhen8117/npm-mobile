const { lstatSync, readdirSync } = require('fs-extra');
const pathObj = require('path');

const isDir = (path) => {
  try {
    const stat = lstatSync(path);
    return stat.isDirectory();
  } catch (e) {
    return false;
  }
};

const getAllFilesOfDir = (path) => {
  const fileList = [];
  const traverseDir = (filename) => {
    if (!filename) return;
    if (isDir(filename)) {
      readdirSync(filename)
        .map((f) => pathObj.join(filename, f))
        .forEach(traverseDir);
    } else {
      fileList.push(filename);
    }
  };

  traverseDir(path);

  return fileList;
};

module.exports = {
  isDir,
  getAllFilesOfDir,
};
