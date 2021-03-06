const fs = require('fs');
const pathLib = require('path');
const lodash = require('lodash');
const jsdocApi = require('jsdoc-api');
const jsdocParse = require('jsdoc-parse');

/**
 * @param path {string} - Filename or directory path
 * @param [stack=[]] {array} - Relative path to root dir
 * @return {object[]}
 */
function listPath(path, stack = []) {
  const list = [];

  if (fs.statSync(path).isDirectory()) {
    for (const name of fs.readdirSync(path)) {
      list.push(...listPath(pathLib.resolve(path, name), [...stack, name]));
    }
  } else {
    list.push({ filename: path, stack });
  }

  return list;
}

function translateInfo(info) {
  switch (info.kind) {
    case 'class':
      if (info.scope !== 'global') { // sub class as global scope
        info.scope = 'global';
        info.name = `${info.memberof}.${info.name}`;
        info.memberof = undefined;
      }
      break;

    case 'constructor':
      info.kind = 'function';
      info.name = 'constructor';
      info.scope = 'instance';
      break;

    case 'member':
      const paramsLength = lodash.get(info, ['params', 'length']);
      const returnsLength = lodash.get(info, ['returns', 'length']);

      if (paramsLength && returnsLength) {
        info.kind = 'function';
      } else if (paramsLength) {
        info.kind = 'function';
        info.role = 'setter';
      } else if (returnsLength) {
        info.kind = 'function';
        info.role = 'getter';
      }
      break;

    case 'constant':
      info.kind = 'member';
      break;

    case 'function':
    default:
      break;
  }

  switch (info.scope) {
    case 'static':
      info.longname = `${info.memberof}.${info.name}`;
      break;

    case 'instance':
      info.longname = `${info.memberof}.prototype.${info.name}`;
      break;

    case 'global':
    default:
      info.longname = info.name;
      break;
  }

  delete info.meta;
  delete info.order;
  delete info.thisvalue;
  return info;
}

/**
 * Parse '.js' file jsdoc
 *
 * @param path {string} - Filename or directory path
 * @param filter {function} - Filename filter
 * @return {object}
 */
function parseJsDoc(path, filter = () => true) {
  const idToInfo = {};

  lodash.forEach(listPath(path), ({ filename, stack }) => {
    if (!filename.endsWith('.js') || !filter(filename)) {
      return undefined;
    }

    const array = jsdocParse(jsdocApi.explainSync({ files: filename }));

    array
      .filter(info => !['protected', 'private'].includes(info.access))
      .map(translateInfo)
      .forEach(info => {
        const staticLabel = info.scope === 'static' ? '(static)' : '';
        const roleLabel = info.role ? `(${info.role})` : '';
        const name = `${staticLabel}${info.name}${roleLabel}`;

        info.stack = [...stack, info.memberof, name].filter(Boolean);
        info.id = info.stack.join('/');

        const parentId = [...stack, info.memberof].filter(Boolean).join('/');
        switch (info.scope) {
          case 'static':
            lodash.set(idToInfo, [parentId, 'static', name], info);
            break;

          case 'instance':
            lodash.set(idToInfo, [parentId, 'instance', name], info);
            break;

          case 'global':
          default:
            idToInfo[info.id] = { ...info, ...(idToInfo[info.id] || {}) };
            break;
        }
      });
  });

  return idToInfo;
}

module.exports = parseJsDoc;
