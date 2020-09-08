const fs = require('fs');
const jsdocToMd = require('../');

const markdown = jsdocToMd('./src', {
  content: true,
  filter: (filename) => {
    console.log(`compiling: ${filename}`);
    return true;
  },
});

// console.log(markdown);

// save as file with extra prefix and suffix
fs.writeFileSync('./api.md', `
# Example

It is a example to gen markdown string by jsdoc.

${markdown}

---

*2020-01-01*
`);
