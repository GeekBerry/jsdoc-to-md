function formatHead({ memberof, name, deprecated }) {
  const head = memberof ? `${memberof}.${name}` : name;
  return !deprecated ? head : `${head} (deprecated)`;
}

function formatName(param) {
  return `${param.variable ? '...' : ''}${param.name}`;
}

function formatType({ names = [] } = {}) {
  return names.join(',');
}

function formatText(text = '') {
  return text.replace(/\n/g, '  \n').replace(/\r/g, '\n');
}

module.exports = {
  formatHead,
  formatName,
  formatText,
  formatType,
};
