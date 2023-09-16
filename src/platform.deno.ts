/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2023 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
import { Parser } from 'https://deno.land/x/html_parser@v0.1.3/src/mod.ts';
import { type Handler } from 'https://deno.land/x/html_parser@v0.1.3/src/Parser.ts';
import { Raw, Client } from 'https://deno.land/x/tgsnake_core@1.10.1/src/index.ts';
export const { inspect } = Deno;
export { Parser, Handler, Raw, Client };
