const fs = require('fs');
const pathLib = require('path');
const jsdocApi = require('jsdoc-api');
const jsdocParse = require('jsdoc-parse');
const { dumpFile } = require('./dump');

function jsdocToMd(inputPath, outputPath, { condition } = {}) {
  const string = readDirSync(inputPath)
    .map(({ isDirectory, path, stack }) => {
      if (isDirectory) {
        return undefined;
      }

      if (condition && !condition(path, stack)) {
        return undefined;
      }

      const array = parseJsDoc(jsdocApi.explainSync({ files: path }));
      if (!array.length) {
        return undefined;
      }

      const title = pathLib.parse(stack.join('.')).name;
      return dumpFile(title, array);
    })
    .filter(md => md !== undefined)
    .join('\n');

  if (outputPath) {
    fs.writeFileSync(outputPath, string);
  }

  return string;
}

function parseJsDoc(jsdocData) {
  const memberArray = [];
  const globalArray = [];

  jsdocParse(jsdocData).forEach(data => {
    switch (data.kind) {
      case 'class':
        data.memberof = data.name;
        break;

      case 'constructor':
        data.kind = 'function';
        data.memberof = data.name;
        data.name = 'constructor';
        break;

      case 'member':
        if (data.returns) {
          data.kind = 'function';
        }
        break;

      default:
        break;
    }

    if (data.memberof) {
      memberArray.push(data);
    } else {
      data.memberof = pathLib.parse(data.meta.filename).name;
      globalArray.push(data);
    }
  });
  return [...memberArray, ...globalArray];
}

/**
 * @param path {string}
 * @param stack {array}
 * @return {[{isDirectory:boolean, path:string, stack:[string]}, ...]}
 */
function readDirSync(path, stack = []) {
  path = path.startsWith('.') ? pathLib.resolve(path) : path;

  const list = [];
  if (fs.statSync(path).isDirectory()) {
    list.push({ isDirectory: true, path, stack });
    for (const name of fs.readdirSync(path)) {
      const subList = readDirSync(pathLib.resolve(path, name), [...stack, name]);
      list.push(...subList);
    }
  } else {
    list.push({ isDirectory: false, path, stack });
  }

  return list;
}

module.exports = jsdocToMd;
