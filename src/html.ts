/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2023 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
import { Parser, Handler } from './platform.deno.ts';
import { Entities, IEntities } from './Entities.ts';

function stripText(text: string, entities: Entities[]) {
  if (!entities || !entities.length) {
    return text.trim();
  }
  while (text && text[text.length - 1].trim() === '') {
    const e = entities[entities.length - 1];
    if (e.offset + e.length == text.length) {
      if (e.length == 1) {
        entities.pop();
        if (!entities.length) {
          return text.trim();
        }
      } else {
        e.length -= 1;
      }
    }
    text = text.slice(0, -1);
  }
  while (text && text[0].trim() === '') {
    for (let i = 0; i < entities.length; i++) {
      const e = entities[i];
      if (e.offset != 0) {
        e.offset--;
        continue;
      }
      if (e.length == 1) {
        entities.shift();
        if (!entities.length) {
          return text.trimLeft();
        }
      } else {
        e.length -= 1;
      }
    }
    text = text.slice(1);
  }
  return text;
}

class HTMLParser implements Handler {
  text: string;
  entities: Entities[];
  private readonly _buildingEntities: Map<string, Entities>;
  private readonly _openTags: string[];
  private readonly _openTagsMeta: (string | undefined)[];

  constructor() {
    this.text = '';
    this.entities = [];
    this._buildingEntities = new Map<string, Entities>();
    this._openTags = [];
    this._openTagsMeta = [];
  }

  onopentag(
    name: string,
    attributes: {
      [s: string]: string;
    },
  ) {
    this._openTags.unshift(name);
    this._openTagsMeta.unshift(undefined);
    let EntityType;
    const args: any = {};
    if (name == 'strong' || name == 'b') {
      EntityType = 'bold';
    } else if (name == 'em' || name == 'i') {
      EntityType = 'italic';
    } else if (name == 'u') {
      EntityType = 'underline';
    } else if (name == 'del' || name == 's') {
      EntityType = 'strike';
    } else if (name == 'blockquote') {
      EntityType = 'blockquote';
    } else if (name == 'code') {
      const pre = this._buildingEntities.get('pre');
      if (pre && pre.type == 'pre') {
        try {
          pre.language = attributes.class.slice('language-'.length, attributes.class.length);
        } catch (e) {}
      } else {
        EntityType = 'code';
      }
    } else if (name == 'pre') {
      EntityType = 'pre';
      args['language'] = '';
    } else if (name == 'a') {
      let url: string | undefined = attributes.href;
      if (!url) {
        return;
      }
      let mention = /tg:\/\/user\?id=(\d+)/gi.exec(url);
      let emoji = /tg:\/\/emoji\?id=(\d+)/gi.exec(url);
      if (url.startsWith('mailto:')) {
        url = url.slice('mailto:'.length, url.length);
        EntityType = 'email';
      } else if (mention) {
        EntityType = 'mentionName';
        args['userId'] = BigInt(String(mention[1]));
        url = undefined;
      } else if (emoji) {
        EntityType = 'customEmoji';
        args['emojiId'] = BigInt(String(emoji[1]));
        url = undefined;
      } else {
        EntityType = 'textUrl';
        args['url'] = url;
        url = undefined;
      }
      this._openTagsMeta.shift();
      this._openTagsMeta.unshift(url);
    } else if (
      name == 'spoiler' ||
      (name == 'span' && attributes.class && attributes.class == 'tg-spoiler') ||
      name == 'sp' ||
      name == 'tg-spoiler'
    ) {
      EntityType = 'spoiler';
    } else if (
      (name == 'tg-emoji' ||
        (name == 'span' && attributes.class && attributes.class == 'tg-emoji') ||
        name == 'emoji') &&
      (attributes.id || attributes.emojiId)
    ) {
      EntityType = 'customEmoji';
      args['emojiId'] = attributes.id ? BigInt(attributes.id) : attributes.emojiId;
    }
    if (EntityType && !this._buildingEntities.has(name)) {
      this._buildingEntities.set(
        name,
        new Entities({
          offset: this.text.length,
          length: 0,
          type: EntityType,
          ...args,
        }),
      );
    }
  }

  ontext(text: string) {
    const previousTag = this._openTags.length > 0 ? this._openTags[0] : '';
    if (previousTag == 'a') {
      const url = this._openTagsMeta[0];
      if (url) {
        text = url;
      }
    }
    for (let [tag, entity] of this._buildingEntities) {
      entity.length += text.length;
    }
    this.text += text;
  }

  onclosetag(tagname: string) {
    this._openTagsMeta.shift();
    this._openTags.shift();
    const entity = this._buildingEntities.get(tagname);
    if (entity) {
      this._buildingEntities.delete(tagname);
      this.entities.push(entity);
    }
  }
  onattribute(name: string, value: string, quote?: string | undefined | null): void {}
  oncdataend(): void {}
  oncdatastart(): void {}
  oncomment(data: string): void {}
  oncommentend(): void {}
  onend(): void {}
  onerror(error: Error): void {}
  onopentagname(name: string): void {}
  onparserinit(parser: Parser): void {}
  onprocessinginstruction(name: string, data: string): void {}
  onreset(): void {}
}
function inRange(x, min, max) {
  return (x - min) * (x - max) <= 0;
}
function unEscape(text) {
  return text
    .replace(/\&amp\;/gm, '&')
    .replace(/\&lt\;/gm, '<')
    .replace(/\&rt\;/gm, '>');
}
export function parse(html: string): [string, Entities[]] {
  if (!html) {
    return [html, []];
  }
  const handler = new HTMLParser();
  const parser = new Parser(handler);
  parser.write(html);
  parser.end();
  const text = stripText(handler.text, handler.entities);
  const entities: Entities[] = handler.entities;
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
        if (em.type == 'code') {
          if (nm.type !== 'spoiler') entities.splice(im + 1, 1);
        } else if (nm.type == 'code') {
          if (em.type !== 'spoiler') entities.splice(im, 1);
        }
      }
    } else if (pm) {
      if (inRange(pm.offset, em.offset, em.offset + em.length)) {
        if (em.type == 'code') {
          if (pm.type !== 'spoiler') entities.splice(im - 1, 1);
        } else if (pm.type == 'code') {
          if (em.type !== 'spoiler') entities.splice(im, 1);
        }
      }
    }
  }
  return [unEscape(text), entities];
}
