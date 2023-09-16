const { Parser } = require('../lib');
let text = `
**hello**
[a](tg://emoji?id=1)
||spoiler||
`;
console.log(Parser.parse(text, 'markdown'));
