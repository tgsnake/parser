// Tgsnake - Telegram MTProto framework developed based on gram.js.
// Copyright (C) 2021 Butthx <https://guthub.com/butthx>
//
// This file is part of Tgsnake
//
// Tgsnake is a free software : you can redistribute it and/or modify
//  it under the terms of the MIT License as published.
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
  | 'spoiler';
export interface IEntities {
  offset: number;
  length: number;
  type: TypeMessageEntity;
  language?: string;
  url?: string;
  userId?: bigint;
}

export class Entities {
  offset: number = 0;
  length: number = 0;
  type!: TypeMessageEntity;
  language!: string;
  url!: string;
  userId!: bigint;
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
