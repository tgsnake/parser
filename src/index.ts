// Tgsnake - Telegram MTProto framework developed based on gram.js.
// Copyright (C) 2021 Butthx <https://guthub.com/butthx>
//
// This file is part of Tgsnake
//
// Tgsnake is a free software : you can redistribute it and/or modify
//  it under the terms of the MIT License as published.
import { parse as MDParser } from './markdown.ts';
import { parse as HTMLParser } from './html.ts';
import { Entities, IEntities } from './Entities.ts';
import ParserError from './ParserError.ts';
import * as Parser from './Parser.ts';
export { MDParser, HTMLParser, Entities, IEntities, ParserError, Parser };
