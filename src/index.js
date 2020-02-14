const lodash = require('lodash');
const { stringifyInfo } = require('./stringify');
const { parseJsDoc } = require('./parse');

function stringifyContents(contents, deep = 0) {
  const lines = [];
  Object.entries(contents).forEach(([name, value]) => {
    if (lodash.isObject(value)) {
      lines.push(`${lodash.repeat('    ', deep)}- ${name}`);
      lines.push(stringifyContents(value, deep + 1));
    } else {
      lines.push(`${lodash.repeat('    ', deep)}- [${name}](#${value})`);
    }
  });
  return lines.join('\n');
}

/**
 * Generate directory markdown string.
 *
 * @param path {string} - - Filename or directory path
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
  const object = parseJsDoc(path, filter);

  const contents = {};
  const lines = [];
  Object.entries(object).forEach(([key, info]) => {
    if (info.id) {
      lodash.set(contents, info.id.split('/'), key);
    }
    lines.push(stringifyInfo(info));
  });

  return [
    content ? stringifyContents(contents) : '',
    ...lines,
  ].filter(Boolean).join('\n\n----------------------------------------\n\n');
}

module.exports = jsdocToMd;
