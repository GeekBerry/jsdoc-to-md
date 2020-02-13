const { formatHead, formatName, formatText, formatType } = require('./format');
const { itemsToMarkdown } = require('./util');

// ============================================================================
function dumpFile(title, array) {
  // array.forEach(({ kind, name, meta }) => console.log(kind, name, (meta || {}).filename)); // for DEBUG
  return `
----------
# ${title}

${array.filter(({ kind }) => kind === 'class').map(dumpClass).join('\n')}
${array.filter(({ kind }) => kind === 'member').map(dumpMember).join('\n')}
${array.filter(({ kind }) => kind === 'function').map(dumpFunction).join('\n')}`;
}

function dumpClass({ description }) {
  return formatText(description);
}

function dumpMember(data) {
  return `
## ${formatHead(data)}

\`${formatType(data.type)}\`

${dumpDescription(data)}
${dumpExamples(data)}`;
}

function dumpFunction(data) {
  // if (data.name === 'constructor') console.log(JSON.stringify(data, null, 2)); // for DEBUG
  return `
## ${formatHead(data)}

${dumpDescription(data)}
${dumpParams(data)}
${dumpReturns(data)}
${dumpExamples(data)}`;
}

function dumpDescription({ description }) {
  return formatText(description);
}

function dumpParams({ params = [] }) {
  const items = params.map(p => {
    return {
      Name: formatName(p),
      Type: formatType(p.type),
      Required: !p.optional,
      Default: p.defaultvalue,
      Description: p.description,
    };
  });

  const str = itemsToMarkdown(items).trim();
  return `
### Parameters

${str ? str : '`void`'}`;
}

function dumpReturns({ returns = [] }) {
  const str = returns.map(r => `\`${formatType(r.type)}\` ${formatText(r.description)}`).join('\n\n');
  return `
### Return

${str ? str : '`void`'}`;
}

function dumpExamples({ examples = [] }) {
  const str = examples.map(e => `${'```'}\n${e.trim()}\n${'```'}`).join('\n\n');

  if (!str) {
    return '';
  }

  return `
### Example

${str}`;
}

// ----------------------------------------------------------------------------

module.exports = {
  dumpFile,
  dumpClass,
  dumpMember,
  dumpFunction,
  dumpDescription,
  dumpParams,
  dumpReturns,
  dumpExamples,
};
