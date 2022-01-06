// Tgsnake - Telegram MTProto framework developed based on gram.js.
// Copyright (C) 2021 Butthx <https://guthub.com/butthx>
//
// This file is part of Tgsnake
//
// Tgsnake is a free software : you can redistribute it and/or modify
//  it under the terms of the MIT License as published.
import { Entities, IEntities } from "./Entities";
import { format } from "util";

function splice(
  source: string,
  start: number,
  delCount: number,
  newSubStr: string
) {
  return (
    source.slice(0, start) +
    newSubStr +
    source.slice(start + Math.abs(delCount))
  );
}

const DEFAULT_DELIMITERS = {
  "**": "bold",
  __: "italic",
  "```": "pre",
  "`": "code",
  "~~": "strike",
  "||": "spoiler",
  "--": "underline",
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
/**
 * parse markdown message to valid entities array.
 * you can escape the markdown format using backslash (\) <br/>
 * Valid Escape : <br/>
 * [text]\\(link) <br/>
 * \\` \\** \\``` \\|| \\-- \\~~ \\__ <br/>
 * @param {String} text - input markdown text.
 */
export function parse(text: string): [string, Entities[]] {
  if (text == "") return [text, []];
  let delims: string[] = [];
  // getting all delims
  for (let key in DEFAULT_DELIMITERS) {
    delims.push(key);
  }
  let i = 0;
  let tmp: Map<string, IEntities> = new Map();
  let xe = new Set();
  let entities: Entities[] = [];
  // check if delims is escape or not.
  let igr = (index) =>
    index > -1 && text[index - 1] == "\\" && text[index] !== "\\";
  // convert the LINK_FORMAT to entities
  for (let match of execAll(text, LINK_REGEX)) {
    let [full, text_url, url] = match;
    if (text_url) {
      if (url.startsWith("mailto:")) {
        url = url.slice("mailto:".length, url.length);
        entities.push(
          new Entities({
            offset: Number(match.index),
            length: url.length,
            type: "email",
          })
        );
      } else if (/tg:\/\/user\?id=(\d+)/gi.test(url)) {
        let mention = /tg:\/\/user\?id=(\d+)/gi.exec(url);
        if (mention == null) continue;
        entities.push(
          new Entities({
            offset: Number(match.index),
            length: text_url.length,
            type: "mentionName",
            userId: BigInt(String(mention[1])),
          })
        );
      } else {
        entities.push(
          new Entities({
            offset: Number(match.index),
            length: text_url.length,
            type: "textUrl",
            url: url,
          })
        );
      }
      text =
        text.substring(-1, Number(match.index)) +
        text.substring(Number(match.index)).replace(full, text_url);
    }
  }
  // convert the LINK_ESC_REGEX to LINK_REGEX
  for (let match of execAll(text, LINK_ESC_REGEX)) {
    let [full, text_url, url] = match;
    text =
      text.substring(-1, Number(match.index)) +
      text
        .substring(Number(match.index))
        .replace(full, `[${text_url}](${url})`);
  }
  while (i < text.length) {
    let index = -1;
    let delim = "";
    for (let de in DEFAULT_DELIMITERS) {
      let dei = text.indexOf(de, i);
      if (dei > -1 && (index == -1 || dei < index)) {
        index = dei;
        delim = de;
      }
    }
    if (index == -1 || delim == "" || delim == undefined) break;
    if (!igr(index)) {
      if (xe.has(delim)) {
        let cv = tmp.get(delim);
        xe.delete(delim);
        tmp.delete(delim);
        if (cv) {
          let m = { ...cv };
          m.length = index - cv.offset;
          if (m.type !== "pre") delete m.language;
          entities.push(new Entities(m));
        }
      } else {
        xe.add(delim);
        tmp.set(delim, {
          offset: index,
          length: -1,
          language: "",
          type: DEFAULT_DELIMITERS[delim],
        });
      }
      text =
        text.substring(-1, index) + text.substring(index).replace(delim, "");
    } else {
      xe.delete(delim);
      tmp.delete(delim);
      delim = "";
      text =
        text.substring(-1, index - 1) +
        text.substring(index - 1).replace("\\", ""); //text.replace("\\","")
      index++;
    }
    i = index;
  }
  // short from low offset
  entities.sort((a, b) => {
    return a.offset - b.offset;
  });
  // remove any entities if it inside code-style.
  for (let im = 0; im < entities.length; im++) {
    let em = entities[im];
    let pm = entities[im - 1];
    let nm = entities[im + 1];
    if (nm) {
      if (inRange(nm.offset, em.offset, em.offset + em.length)) {
        if (em.type == "code") {
          if (nm.type !== "spoiler") entities.splice(im + 1, 1);
        } else if (nm.type == "code") {
          if (em.type !== "spoiler") entities.splice(im, 1);
        }
      }
    } else if (pm) {
      if (inRange(pm.offset, em.offset, em.offset + em.length)) {
        if (em.type == "code") {
          if (pm.type !== "spoiler") entities.splice(im - 1, 1);
        } else if (pm.type == "code") {
          if (em.type !== "spoiler") entities.splice(im, 1);
        }
      }
    }
  }
  return [text, entities];
}
