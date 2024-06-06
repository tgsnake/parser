# @tgsnake/parser

core framework for tgsnake for parsing message.  
example :

```js
'**bold**';
```

it will be

```js
[
  'bold',
  [
    {
      offset: 0,
      length: 4,
      type: 'bold',
    },
  ],
];
```

# Quick Start

> **Breaking Changes in v2!**  
> In this v2 is not supported gramjs framework by default! Unlike v1 which supports it, in v2 we fully use `@tgsnake/core`.

```ts
// index.ts
import { Parser } from '@tgsnake/parser'
import { Client } from '@tgsnake/core'
const client = new Client(...)

const entities = Parser.parse('**Hello World**,'markdown')
```

## converting tgsnake entities to raw api

```ts
Parser.toRaw(client, entities);
```

## converting raw entities to tgsnake entities

```ts
Parser.fromRaw(TypeMessageEntities);
```

## available parseMode

### markdown

````ts
'**bold**';
'__italic__';
'~~strike~~';
'`code`';
'```pre```';
'[text](link)';
'--underline--';
'||spoiler||';
'>blockquote';
'**>expandable blockquote';
````

**Escaping**  
for escaping just add backslash (`\`) before markdown syntax.

````ts
'\\**bold\\**';
'\\__italic\\__';
'\\~~strike\\~~';
'\\`code\\`';
'\\```pre\\```';
'[text]\\(link)';
'\\--underline\\--';
'\\||spoiler\\||';
'\\>blockquote';
'\\**>expandable blockquote';
````

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
"<tg-emoji id="1">text<tg-emoji>" || "<span id="1" class="tg-emoji">text<span>"
"<blockquote>blockquote</blockquote>"
"<blockquote expandable>expandable blockquote</blockquote>"
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

### Available Formating Style

| Entity Type | Markdown style | HTML style | Description |
| :-: | :-: | :-: | :-- |
| **Bold** | `*text*` | `<b>text</b>` or `<strong>text</strong>` |  |
| **Italic** | `__text__` | `<i>text</i>` or `<em>text</em>` |  |
| ~~Strike~~ | `~~text~~` | `<s>text</s>` or `<del>text</del>` |  |
| `Code` | <code>\`text\`</code> | `<code>text</code>` |  |
| `Pre` | <code>\`\`\`text\`\`\`</code> | `<pre><code>text</code></pre>` or `<pre language-javascript><code>text</code></pre>` |  |
| [Link](#) | `[text](link)` | `<a href="link">text</a>` | You can fill the link params with `tg://user?id=123456` for mentioning user and `tg://emoji?id=123456` for custom emoji. |
| <u>Underline</u> | `--text--` | `<u>text</u>` |  |
| Spoiler | `\|\|text\|\|` | `<spoiler>text</spoiler>` or `<sp>text</sp>` or `<tg-spoiler>text</tg-spoiler>` or `<span class="tg-spoiler">text</span>` |  |
| Custom Emoji | `[text](tg://emoji?id=123456)` | `<tg-emoji id="123456">text</tg-emoji>` or `<emoji id="123456">text</emoji>` or `<span class="tg-emoji" id="123456">text</span>` | HTML tag has 2 way to define the emojiId. First using `id` attribute and seconds use `emojiId` attribute. |
| Blockquote | `>text` | `<blockquote>text</blockquote>` |  |

Build with ♥️ by [tgsnake dev](https://t.me/tgsnakechat).
