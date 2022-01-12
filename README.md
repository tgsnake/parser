core framework for tgsnake for parsing message.   
example : 
```js 
"**bold**"
```
it will be  
```js 
[
  "bold",
  [{
    offset : 0,
    length : 4,
    type : "bold"
  }]
]
```
# Quick Start 
## Using tgsnake 
```ts 
// index.ts 
import {Snake,GramJs} from "tgsnake"
import Parser from "@tgsnake/parser"
const parser = new Parser(Gramjs.Api) 
let text = "**bold**"
console.log(parser.parse(text,"markdown"))
```
## Using gramjs 
```ts 
// index.ts 
import {Api} from "telegram"
import Parser from "@tgsnake/parser"
const parser = new Parser(Api) 
let text = "**bold**"
console.log(parser.parse(text,"markdown"))
```
## converting tgsnake entities to raw api
```ts 
parser.toRaw(gramjs_client,tgsnake_entities)
```
## converting raw entities to tgsnake entities
```ts 
parser.fromRaw(raw_entities)
```
## available parseMode 
### markdown 
```ts 
"**bold**"
"__italic__"
"~~strike~~"
"`code`" 
"```pre```" 
"[text](link)"
"--underline--" 
"||spoiler||"
```
**Escaping**  
for escaping just add backslash (`\`) before markdown syntax.
```ts
"\\**bold\\**"
"\\__italic\\__"
"\\~~strike\\~~"
"\\`code\\`" 
"\\```pre\\```" 
"[text]\\(link)"
"\\--underline\\--" 
"\\||spoiler\\||"
```
### html 
```ts 
"<b>bold</b>" || "<strong>bold</strong>"
"<i>italic</i>" || "<em>italic</em>"
"<s>strike</s>" || "<del>strike</del>"
"<code>code</code>" 
"<pre><code>pre</code></pre>"  || "<pre><code language-javascript >pre</code></pre>"
"<a href="link">text</a>"
"<u>underline</u>" 
"<spoiler>spoiler</spoiler>" || "<sp>spoiler</sp>" || "<tg-spoiler>spoiler</tg-spoiler>" || '<span class="tg-spoiler">spoiler</span>'
"<blockquote>blockquote</blockquote>"
```
**Escaping**  
for escaping replace `<` with `&lt;` , `>` with `&rt;` , `&` with `&amp;`
```ts 
"&lt;b&rt;bold&lt;/b&rt;" || "&lt;strong&rt;bold&lt;/strong&rt;"
"&lt;i&rt;italic&lt;/i&rt;" || "&lt;em&rt;italic&lt;/em&rt;"
"&lt;s&rt;strike&lt;/s&rt;" || "&lt;del&rt;strike&lt;/del&rt;"
"&lt;code&rt;code&lt;/code&rt;" 
"&lt;pre&rt;&lt;code&rt;pre&lt;/code&rt;&lt;/pre&rt;"  || "&lt;pre&rt;&lt;code language-javascript &rt;pre&lt;/code&rt;&lt;/pre&rt;"
"&lt;a href="link"&rt;text&lt;/a&rt;"
"&lt;u&rt;underline&lt;/u&rt;" 
"&lt;spoiler&rt;spoiler&lt;/spoiler&rt;" || "&lt;sp&rt;spoiler&lt;/sp&rt;" || "&lt;tg-spoiler&rt;spoiler&lt;/tg-spoiler&rt;" || '&lt;span class="tg-spoiler"&rt;spoiler&lt;/span&rt;'
"&lt;blockquote&rt;blockquote&lt;/blockquote&rt;"
```
  
Build with ♥️ by [tgsnake dev](https://t.me/+Fdu8unNApTg3ZGU1).