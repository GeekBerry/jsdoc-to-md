const os = require('os');
const lodash = require('lodash');
const parseJsDoc = require('./parse');
const { stringifyInfo, stringifyContents } = require('./stringify');

/**
 * Generate directory markdown string.
 *
 * @param path {string} - Filename or directory path
 * @param [options] {object}
 * @param [options.content=true] {boolean} - Generate content.
 * @param [options.filter=()=>true] {function} - Filename filter/
 * @return {string} Markdown string
 *
 * @example
 * > const jsdocToMd = require('@geekberry/jsdoc-to-md')
 * > const string = jsdocToMd('./src')
 */
function jsdocToMd(path, {
  content = true,
  filter = () => true,
} = {}) {
  let object = parseJsDoc(path, filter);

  const lines = lodash.map(object, stringifyInfo);

  const contents = {};
  lodash.forEach(object, info => {
    if (info.id) {
      lodash.set(contents, info.stack, info.id);
    }
    lodash.forEach(info.static, (_info) => {
      if (_info.id) {
        lodash.set(contents, _info.stack, _info.id);
      }
    });
    lodash.forEach(info.instance, (_info) => {
      if (_info.id) {
        lodash.set(contents, _info.stack, _info.id);
      }
    });
  });

  return [content ? stringifyContents(contents) : '', ...lines]
    .filter(Boolean)
    .join(`${os.EOL}${os.EOL}----------------------------------------${os.EOL}${os.EOL}`);
}

module.exports = jsdocToMd;
