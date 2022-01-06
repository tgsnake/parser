// Tgsnake - Telegram MTProto framework developed based on gram.js.
// Copyright (C) 2021 Butthx <https://guthub.com/butthx>
//
// This file is part of Tgsnake
//
// Tgsnake is a free software : you can redistribute it and/or modify
//  it under the terms of the MIT License as published.
import { parse as MDParser } from "./markdown";
import { parse as HTMLParser } from "./html";
import { Entities, IEntities } from "./Entities";
import ParserError from "./ParserError";
import { Parser } from "./Parser";
export default Parser;
export { MDParser, HTMLParser, Entities, IEntities, ParserError };
