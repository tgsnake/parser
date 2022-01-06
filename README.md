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
parser.toRaw(tgsnake_entities)
```
## converting raw entities to tgsnake entities
```ts 
parser.fromRaw(raw_entities)
```
## available parseMode 
### markdown 
- bold   
  using double star (`**`) to formating text as bold.  
  example :  
  ```ts 
  **bold**
  ```  
  for escaping, just add backslash `\\` before star.   
  example :  
  ```ts 
  \\**escaped\\**
  ```
- italic    
  using double underscore (`__`) to formating text as italic.  
  example :  
  ```ts 
  __italic__
  ```  
  for escaping, just add backslash `\\` before underscore.   
  example :  
  ```ts 
  \\__escaped\\__
  ```
- underline   
  using double line (`--`) to formating text as underline.  
  example :  
  ```ts 
  --underline--
  ```  
  for escaping, just add backslash `\\` before line.   
  example :  
  ```ts 
  \\--escaped\\--
  ```
- strike   
  using double waveline (`~~`) to formating text as strike.  
  example :  
  ```ts 
  ~~strike~~
  ```  
  for escaping, just add backslash `\\` before waveline   
  example :  
  ```ts 
  \\~~escaped\\~~
  ```
- spoiler   
  using double pipe (`||`) to formating text as spoiler.  
  example :  
  ```ts 
  ||spoiler||
  ```  
  for escaping, just add backslash `\\` before pipe.   
  example :  
  ```ts 
  \\||escaped\\||
  ```
- code   
  using backtick (`` ` ``) to formating text as code.  
  example :  
  ```ts 
  `bold`
  ```  
  for escaping, just add `\\` before backtick.   
  example :  
  ```ts 
  \\`escaped\\`
  ```
- pre  
  using triple backtick (`` ``` ``) to formating text as pre.    
  example :  
  ```ts 
  ```bold```
  ```  
  for escaping, just add `\\` before backtick.   
  example :  
  ```ts 
  \\```escaped\\```
  ```
## html
- bold   
  `<b></b>`
- core framework for tgsnake for parsing message.   
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
parser.toRaw(tgsnake_entities)
```
## converting raw entities to tgsnake entities
```ts 
parser.fromRaw(raw_entities)
```
## available parseMode 
### markdown 
- bold   
  using double star (`**`) to formating text as bold.  
  example :  
  ```ts 
  **bold**
  ```  
  for escaping, just add backslash `\\` before star.   
  example :  
  ```ts 
  \\**escaped\\**
  ```
- italic    
  using double underscore (`__`) to formating text as italic.  
  example :  
  ```ts 
  __italic__
  ```  
  for escaping, just add backslash `\\` before underscore.   
  example :  
  ```ts 
  \\__escaped\\__
  ```
- underline   
  using double line (`--`) to formating text as underline.  
  example :  
  ```ts 
  --underline--
  ```  
  for escaping, just add backslash `\\` before line.   
  example :  
  ```ts 
  \\--escaped\\--
  ```
- strike   
  using double waveline (`~~`) to formating text as strike.  
  example :  
  ```ts 
  ~~strike~~
  ```  
  for escaping, just add backslash `\\` before waveline   
  example :  
  ```ts 
  \\~~escaped\\~~
  ```
- spoiler   
  using double pipe (`||`) to formating text as spoiler.  
  example :  
  ```ts 
  ||spoiler||
  ```  
  for escaping, just add backslash `\\` before pipe.   
  example :  
  ```ts 
  \\||escaped\\||
  ```
- code   
  using backtick (`` ` ``) to formating text as code.  
  example :  
  ```ts 
  `bold`
  ```  
  for escaping, just add `\\` before backtick.   
  example :  
  ```ts 
  \\`escaped\\`
  ```
- pre  
  using triple backtick (`` ``` ``) to formating text as pre.    
  example :  
  ```ts 
  ```bold```
  ```  
  for escaping, just add `\\` before backtick.   
  example :  
  ```ts 
  \\```escaped\\```
  ```
## html
the html format is same with bot api, so you can check that.  
  
Build with ♥️ by [tgsnake dev](https://t.me/+Fdu8unNApTg3ZGU1).