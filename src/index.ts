/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2023 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
import { parse as MDParser } from './markdown.ts';
import { parse as HTMLParser } from './html.ts';
import { Entities, type IEntities } from './Entities.ts';
import ParserError from './ParserError.ts';
import * as Parser from './Parser.ts';
export { MDParser, HTMLParser, Entities, IEntities, ParserError, Parser };
