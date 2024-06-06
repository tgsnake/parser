import { Parser } from '../src/index.ts';
const text = `
>Block quotation started
>Block quotation continued
>Block quotation continued
>Block quotation continued
>The last line of the block quotation
aaaa
**>Block quotation started
>Block quotation continued
>Block __quotation continued__
>Block **quotation continued**
>The last line of the block quotation
[a](tg://)
**bold**
`;
console.log(Parser.parse(text, 'markdown'));
