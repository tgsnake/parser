// Tgsnake - Telegram MTProto framework developed based on gram.js.
// Copyright (C) 2021 Butthx <https://guthub.com/butthx>
//
// This file is part of Tgsnake
//
// Tgsnake is a free software : you can redistribute it and/or modify
//  it under the terms of the MIT License as published.
export default class ParserError extends Error {
  message: string = "";
  description: string = "";
  code: number = 500;
  runningFunction: string = "";
  constructor(
    message: string,
    description: string,
    code?: number,
    runningFunction?: string
  ) {
    super();
    this.message = message;
    this.description = description;
    this.code = code || 500;
    this.runningFunction = runningFunction || "";
  }
}
