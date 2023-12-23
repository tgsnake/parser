import { Parser } from '../src/index.ts';
console.log(
  Parser.parse(
    `**hello**
[a](tg://emoji?id=1)
||spoiler||
\`\`\`py\nhello\`\`\``,
    'markdown',
  ),
);
