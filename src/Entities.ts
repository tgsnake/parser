/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2023 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
import { inspect } from './platform.deno.ts';
export type TypeMessageEntity =
  | 'mention'
  | 'hashtag'
  | 'botCommand'
  | 'url'
  | 'email'
  | 'bold'
  | 'italic'
  | 'code'
  | 'pre'
  | 'textUrl'
  | 'mentionName'
  | 'phone'
  | 'cashtag'
  | 'underline'
  | 'strike'
  | 'blockquote'
  | 'bankCard'
  | 'spoiler'
  | 'customEmoji';
export interface IEntities {
  offset: number;
  length: number;
  type: TypeMessageEntity;
  language?: string;
  url?: string;
  userId?: bigint;
  emojiId?: bigint;
}

export class Entities {
  offset: number = 0;
  length: number = 0;
  type!: TypeMessageEntity;
  language!: string;
  url!: string;
  userId!: bigint;
  emojiId!: bigint;
  constructor(entities: IEntities) {
    for (let [key, value] of Object.entries(entities)) {
      this[key] = value;
    }
  }
  [Symbol.for('nodejs.util.inspect.custom')](): { [key: string]: any } {
    const toPrint: { [key: string]: any } = {
      _: this.constructor.name,
    };
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        const value = this[key];
        if (!key.startsWith('_') && value !== undefined && value !== null) {
          toPrint[key] = value;
        }
      }
    }
    return toPrint;
  }
  [Symbol.for('Deno.customInspect')](): string {
    return String(inspect(this[Symbol.for('nodejs.util.inspect.custom')](), { colors: true }));
  }
  toJSON(): { [key: string]: any } {
    const toPrint: { [key: string]: any } = {
      _: this.constructor.name,
    };
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        const value = this[key];
        if (!key.startsWith('_') && value !== undefined && value !== null) {
          toPrint[key] = typeof value === 'bigint' ? String(value) : value;
        }
      }
    }
    return toPrint;
  }
  toString() {
    return `[constructor of ${this.constructor.name}] ${JSON.stringify(this, null, 2)}`;
  }
}
