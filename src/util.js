const os = require('os');
const lodash = require('lodash');

function stringWidth(string) {
  string = lodash.toString(string);

  let width = 0;
  for (let i = 0; i < string.length; i += 1) {
    width += string.charCodeAt(i) > 0xFF ? 2 : 1;
  }
  return width;
}

/**
 * @param items {object[]}
 * @param fields {undefined|Array|object} 域信息
 * @return {Array[]}
 */
function itemsToLines(items, fields) {
  let keys;
  let heads;

  if (lodash.isArray(fields)) {
    keys = fields;
    heads = keys;
  } else if (lodash.isObject(fields)) {
    keys = lodash.keys(fields);
    heads = lodash.values(fields);
  } else {
    keys = lodash.union(...items.map(lodash.keys));
    heads = keys;
  }

  const lines = [heads];
  lines.push(...items.map(item => lodash.at(item, keys)));
  return lines;
}

function linesToMarkdown(lines) {
  const widthMap = {};

  // 统计最大宽度
  lodash.forEach(lines, (line) => {
    lodash.forEach(line, (cell, i) => {
      widthMap[i] = Math.max(widthMap[i] || 1, stringWidth(cell)); // 至少有 1 个字符宽度
    });
  });

  const rows = lodash.map(lines, line =>
    lodash.map(line, (cell, i) =>
      lodash.padEnd(cell, widthMap[i])).join(' | ').trimRight(),
  );

  const separator = lodash.values(widthMap).map(width => lodash.repeat('-', width)).join('-|-');

  return [lodash.head(rows), separator, ...lodash.tail(rows)].join(os.EOL);
}

/**
 * @param items {object[]}
 * @param fields {undefined|Array|object} 域信息
 * @return {String}
 */
function itemsToMarkdown(items, fields) {
  return linesToMarkdown(itemsToLines(items, fields));
}

module.exports = {
  itemsToMarkdown,
};
