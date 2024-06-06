/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2024 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
export default class ParserError extends Error {
  message: string = '';
  description: string = '';
  code: number = 500;
  runningFunction: string = '';
  constructor(message: string, description: string, code?: number, runningFunction?: string) {
    super();
    this.message = message;
    this.description = description;
    this.code = code || 500;
    this.runningFunction = runningFunction || '';
  }
}
