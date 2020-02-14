const fs = require('fs');
const pathLib = require('path');
const lodash = require('lodash');
const jsdocApi = require('jsdoc-api');
const jsdocParse = require('jsdoc-parse');

/**
 * @param path {string}
 * @param stack {array}
 * @return {[{ filename:string, stack:[string]}, ...]}
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

/**
 * Parse '.js' file jsdoc
 *
 * @param path {string} - Filename or directory path
 * @param filter {function} - Filename filter
 * @return {object}
 */
function parseJsDoc(path, filter = () => true) {
  const object = {};

  listPath(path).forEach(({ filename, stack }) => {
    if (!filename.endsWith('.js') || !filter(filename)) {
      return undefined;
    }

    const array = jsdocParse(jsdocApi.explainSync({ files: filename }));

    array.forEach(info => {
      if (info.access && info.access !== 'public') {
        return; // TODO optional
      }

      // reset some relation
      if (info.kind === 'constructor') {
        info.kind = 'function';
        info.name = 'constructor';
        info.scope = 'instance';
      } else if (info.kind === 'class') {
        if (info.scope === 'static') { // sub class as global scope
          info.scope = 'global';
          info.name = `${info.memberof}.${info.name}`;
        }
      } else if (info.kind === 'member') {
        if (info.params && info.params.length) {
          info.kind = 'function';
          info.name = `${info.name} (setter)`;
        } else if (info.returns && info.returns.length) {
          info.kind = 'function';
          info.name = `${info.name} (getter)`;
        }
      } else if (info.kind === 'constant') {
        info.kind = 'member';
      }

      info.id = `${stack.join('/')}/${info.name}`;
      // delete info.meta;
      // delete info.order;

      // merge to one object
      switch (info.scope) {
        case 'static':
          info.longname = `${info.memberof}.${info.name}`;
          lodash.set(object, [`${stack.join('/')}/${info.memberof}`, 'static', info.name], info);
          break;

        case 'instance':
          info.longname = `${info.memberof}.prototype.${info.name}`;
          lodash.set(object, [`${stack.join('/')}/${info.memberof}`, 'instance', info.name], info);
          break;

        case 'global':
        default:
          info.longname = info.name;
          object[info.id] = { ...info, ...(object[info.id] || {}) };
          break;
      }
    });
  });

  return object;
}

module.exports = {
  parseJsDoc,
};
