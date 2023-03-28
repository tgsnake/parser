// Tgsnake - Telegram MTProto framework developed based on gram.js.
// Copyright (C) 2021 Butthx <https://guthub.com/butthx>
//
// This file is part of Tgsnake
//
// Tgsnake is a free software : you can redistribute it and/or modify
//  it under the terms of the MIT License as published.
import { Entities, IEntities } from './Entities.ts';
import { parse as HTMLParser } from './html.ts';

function splice(source: string, start: number, delCount: number, newSubStr: string) {
  return source.slice(0, start) + newSubStr + source.slice(start + Math.abs(delCount));
}

const DEFAULT_DELIMITERS = {
  '**': 'b',
  __: 'i',
  '```': 'pre',
  '`': 'code',
  '~~': 's',
  '||': 'spoiler',
  '--': 'u',
};
// [text](link)
//const LINK_FORMAT = "[%s](%s)"
const LINK_REGEX = /\[(.+?)\]\((.+?)\)/gi;
const LINK_ESC_REGEX = /\[(.+?)\]\\\((.+?)\)/gi;
function inRange(x, min, max) {
  return (x - min) * (x - max) <= 0;
}
function execAll(text: string, regex: RegExp) {
  let list = [] as RegExpExecArray[];
  let ex;
  while ((ex = regex.exec(text))) {
    list.push(ex);
  }
  return list;
}
function replaceTag(text) {
  return text.replace(/\&/gm, '&amp;').replace(/\</gm, '&lt;').replace(/\>/gm, '&rt;');
}
/**
 * parse markdown message to valid entities array.
 * you can escape the markdown format using backslash (\) <br/>
 * Valid Escape : <br/>
 * [text]\\(link) <br/>
 * \\` \\** \\``` \\|| \\-- \\~~ \\__ <br/>
 * @param {String} text - input markdown text.
 */
export function parse(text: string): [string, Entities[]] {
  if (text == '') return [text, []];
  text = replaceTag(text);
  let delims: string[] = [];
  // getting all delims
  for (let key in DEFAULT_DELIMITERS) {
    delims.push(key);
  }
  let i = 0;
  let xe = new Set();
  // check if delims is escape or not.
  let igr = (index) => index > -1 && text[index - 1] == '\\' && text[index] !== '\\';
  // convert the LINK_FORMAT to entities
  for (let match of execAll(text, LINK_REGEX)) {
    let [full, text_url, url] = match;
    if (text_url) {
      text =
        text.substring(-1, Number(match.index)) +
        text.substring(Number(match.index)).replace(full, `<a href="${url}">${text_url}</a>`);
    }
  }
  // convert the LINK_ESC_REGEX to LINK_REGEX
  for (let match of execAll(text, LINK_ESC_REGEX)) {
    let [full, text_url, url] = match;
    text =
      text.substring(-1, Number(match.index)) +
      text.substring(Number(match.index)).replace(full, `[${text_url}](${url})`);
  }
  while (i < text.length) {
    let index = -1;
    let delim = '';
    for (let de in DEFAULT_DELIMITERS) {
      let dei = text.indexOf(de, i);
      if (dei > -1 && (index == -1 || dei < index)) {
        index = dei;
        delim = de;
      }
    }
    if (index == -1 || delim == '' || delim == undefined) break;
    if (!igr(index)) {
      if (xe.has(delim)) {
        xe.delete(delim);
        if (DEFAULT_DELIMITERS[delim] == 'pre') {
          text =
            text.substring(-1, index) +
            text.substring(index).replace(delim, `</code></${DEFAULT_DELIMITERS[delim]}>`);
        } else {
          text =
            text.substring(-1, index) +
            text.substring(index).replace(delim, `</${DEFAULT_DELIMITERS[delim]}>`);
        }
      } else {
        xe.add(delim);
        if (DEFAULT_DELIMITERS[delim] == 'pre') {
          text =
            text.substring(-1, index) +
            text.substring(index).replace(delim, `<${DEFAULT_DELIMITERS[delim]}><code>`);
        } else {
          text =
            text.substring(-1, index) +
            text.substring(index).replace(delim, `<${DEFAULT_DELIMITERS[delim]}>`);
        }
      }
    } else {
      xe.delete(delim);
      delim = '';
      text = text.substring(-1, index - 1) + text.substring(index - 1).replace('\\', ''); //text.replace("\\","")
      index++;
    }
    i = index;
  }
  return HTMLParser(text);
}
