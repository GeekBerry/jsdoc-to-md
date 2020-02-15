const { itemsToMarkdown } = require('./util');

function formatParamName(name, variable = false) {
  return `${variable ? '...' : ''}${name}`;
}

function formatItems(items) {
  return itemsToMarkdown(items).trim();
}

function formatType(type = { names: [] }) {
  const text = type.names.join(',');
  return text ? '`' + text + '`' : '';
}

function formatText(text = '') {
  return text.replace(/\n/g, '').replace(/\r/g, '\n');
}

// ----------------------------------------------------------------------------
function formatDescription(description) {
  return formatText(description);
}

function formatParams(params = []) {
  const items = params.map(p => {
    return {
      Name: formatParamName(p.name, p.variable),
      Type: formatType(p.type),
      Required: !p.optional,
      Default: p.defaultvalue,
      Description: p.description,
    };
  });

  const text = formatItems(items);

  return text ? ['* **Parameters**', text].join('\n\n') : '';
}

function formatReturns(returns = []) {
  const text = returns.map(r => `${formatType(r.type)} ${formatText(r.description)}`).join('\n\n');

  return text ? ['* **Returns**', text].join('\n\n') : '';
}

function formatExceptions(exceptions = []) {
  const text = exceptions.map(e => `> ${e.description}`).join('\n\n');

  return text ? ['* **Exceptions**', text].join('\n\n') : '';
}

function formatExamples(examples = []) {
  const text = examples.map(line => '```\n' + formatText(line) + '\n```').join('\n\n');

  return text ? ['* **Examples**', text].join('\n\n') : '';
}

// ============================================================================
function stringifyHead(info) {
  if (!info || !info.name || !info.longname) {
    throw new Error(`invalid info, got "${info}"`);
  }

  const text = info.deprecated ? `~~${info.longname}~~` : info.longname;
  return `## ${text} <a id="${info.id}"></a>`;
}

function stringifyFunction(info) {
  return [
    stringifyHead(info),
    formatDescription(info.description),
    formatParams(info.params),
    formatExceptions(info.exceptions),
    formatReturns(info.returns),
    formatExamples(info.examples),
  ].filter(Boolean).join('\n\n');
}

function stringifyMember(info) {
  return [
    stringifyHead(info),
    formatType(info.type),
    formatDescription(info.description),
    formatExamples(info.examples),
  ].filter(Boolean).join('\n\n');
}

function stringifyClass(info) {
  return [
    stringifyHead(info),
    formatDescription(info.description),
    ...Object.values(info.static || {}).map(stringifyInfo),
    ...Object.values(info.instance || {}).map(stringifyInfo),
  ].join('\n\n');
}

function stringifyModule(info) {
  return Object.values(info.static || {}).map(stringifyInfo).join('\n\n');
}

function stringifyInfo(info) {
  switch (info.kind) {
    case 'function':
      return stringifyFunction(info);

    case 'member':
      return stringifyMember(info);

    case 'class':
      return stringifyClass(info);

    default:
      return stringifyModule(info);
  }
}

// ----------------------------------------------------------------------------
module.exports = {
  stringifyInfo,
};
