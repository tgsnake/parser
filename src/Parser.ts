// Tgsnake - Telegram MTProto framework developed based on gram.js.
// Copyright (C) 2021 Butthx <https://guthub.com/butthx>
//
// This file is part of Tgsnake
//
// Tgsnake is a free software : you can redistribute it and/or modify
//  it under the terms of the MIT License as published.
import { Entities } from "./Entities";
import { parse as MDParser } from "./markdown";
import { parse as HTMLParser } from "./html";
import ParserError from "./ParserError";
import bigInt from "big-integer";
export class Parser {
  private raw: any;
  constructor(api?: any) {
    this.raw = api;
  }
  /**
   * Extract entities from text.
   * @param {String} text - input text.
   * @param {String} parseMode - parseMode
   */
  parse(text: string, parseMode: "html" | "markdown"): [string, Entities[]] {
    try {
      if (text === "") {
        return [text, []];
      }
      if (parseMode === "markdown") {
        return MDParser(text);
      }
      if (parseMode === "html") {
        return HTMLParser(text);
      }
      return [text, []];
    } catch (error: any) {
      throw new ParserError(
        error.message,
        "Parser error when parsing message.",
        500,
        "Parser.parse"
      );
    }
  }
  /**
   * converting raw entities to tgsnake entities.
   * @param {Object} entities - input raw entities
   */
  fromRaw(entities: any[]) {
    if (!this.raw) {
      throw new ParserError(
        `Raw not found!`,
        `Plase make sure you set the raw. eg : new Parser(raw).`,
        404,
        "Parser.fromRaw"
      );
    }
    let tmp: Entities[] = [];
    let raw: any = this.raw;
    for (let ent of entities) {
      if (ent instanceof raw.MessageEntityMention) {
        //@ts-ignore
        ent as raw.MessageEntityMention;
        tmp.push(
          new Entities({
            offset: ent.offset,
            length: ent.length,
            type: "mention",
          })
        );
        continue;
      }
      if (ent instanceof raw.MessageEntityHashtag) {
        //@ts-ignore
        ent as raw.MessageEntityHashtag;
        tmp.push(
          new Entities({
            offset: ent.offset,
            length: ent.length,
            type: "hashtag",
          })
        );
        continue;
      }
      if (ent instanceof raw.MessageEntityBotCommand) {
        //@ts-ignore
        ent as raw.MessageEntityBotCommand;
        tmp.push(
          new Entities({
            offset: ent.offset,
            length: ent.length,
            type: "botCommand",
          })
        );
        continue;
      }
      if (ent instanceof raw.MessageEntityUrl) {
        //@ts-ignore
        ent as raw.MessageEntityUrl;
        tmp.push(
          new Entities({
            offset: ent.offset,
            length: ent.length,
            type: "url",
          })
        );
        continue;
      }
      if (ent instanceof raw.MessageEntityEmail) {
        //@ts-ignore
        ent as raw.MessageEntityEmail;
        tmp.push(
          new Entities({
            offset: ent.offset,
            length: ent.length,
            type: "email",
          })
        );
        continue;
      }
      if (ent instanceof raw.MessageEntityBold) {
        //@ts-ignore
        ent as raw.MessageEntityBold;
        tmp.push(
          new Entities({
            offset: ent.offset,
            length: ent.length,
            type: "bold",
          })
        );
        continue;
      }
      if (ent instanceof raw.MessageEntityItalic) {
        //@ts-ignore
        ent as raw.MessageEntityItalic;
        tmp.push(
          new Entities({
            offset: ent.offset,
            length: ent.length,
            type: "italic",
          })
        );
        continue;
      }
      if (ent instanceof raw.MessageEntityCode) {
        //@ts-ignore
        ent as raw.MessageEntityCode;
        tmp.push(
          new Entities({
            offset: ent.offset,
            length: ent.length,
            type: "code",
          })
        );
        continue;
      }
      if (ent instanceof raw.MessageEntityPre) {
        //@ts-ignore
        ent as raw.MessageEntityPre;
        tmp.push(
          new Entities({
            offset: ent.offset,
            length: ent.length,
            language: ent.language,
            type: "pre",
          })
        );
        continue;
      }
      if (ent instanceof raw.MessageEntityTextUrl) {
        //@ts-ignore
        ent as raw.MessageEntityTextUrl;
        tmp.push(
          new Entities({
            offset: ent.offset,
            length: ent.length,
            url: ent.url,
            type: "textUrl",
          })
        );
        continue;
      }
      if (ent instanceof raw.MessageEntityMentionName) {
        //@ts-ignore
        ent as raw.MessageEntityMentionName;
        tmp.push(
          new Entities({
            offset: ent.offset,
            length: ent.length,
            userId: BigInt(String(ent.userId)),
            type: "mentionName",
          })
        );
        continue;
      }
      if (ent instanceof raw.MessageEntityPhone) {
        //@ts-ignore
        ent as raw.MessageEntityPhone;
        tmp.push(
          new Entities({
            offset: ent.offset,
            length: ent.length,
            type: "phone",
          })
        );
        continue;
      }
      if (ent instanceof raw.MessageEntityCashtag) {
        //@ts-ignore
        ent as raw.MessageEntityCashtag;
        tmp.push(
          new Entities({
            offset: ent.offset,
            length: ent.length,
            type: "cashtag",
          })
        );
        continue;
      }
      if (ent instanceof raw.MessageEntityUnderline) {
        //@ts-ignore
        ent as raw.MessageEntityUnderline;
        tmp.push(
          new Entities({
            offset: ent.offset,
            length: ent.length,
            type: "underline",
          })
        );
        continue;
      }
      if (ent instanceof raw.MessageEntityStrike) {
        //@ts-ignore
        ent as raw.MessageEntityHashtag;
        tmp.push(
          new Entities({
            offset: ent.offset,
            length: ent.length,
            type: "strike",
          })
        );
        continue;
      }
      if (ent instanceof raw.MessageEntityBlockquote) {
        //@ts-ignore
        ent as raw.MessageEntityBlockquote;
        tmp.push(
          new Entities({
            offset: ent.offset,
            length: ent.length,
            type: "blockquote",
          })
        );
        continue;
      }
      if (ent instanceof raw.MessageEntityBankCard) {
        //@ts-ignore
        ent as raw.MessageEntityBankCard;
        tmp.push(
          new Entities({
            offset: ent.offset,
            length: ent.length,
            type: "bankCard",
          })
        );
        continue;
      }
      if (ent instanceof raw.MessageEntitySpoiler) {
        //@ts-ignore
        ent as raw.MessageEntitySpoiler;
        tmp.push(
          new Entities({
            offset: ent.offset,
            length: ent.length,
            type: "spoiler",
          })
        );
        continue;
      }
    }
    return tmp;
  }
  /**
   * converting tgsnake entities to raw entities.
   * @param {Object} entities - input tgsnake entities
   */
  toRaw(entities: Entities[]) {
    if (!this.raw) {
      throw new ParserError(
        `Raw not found!`,
        `Plase make sure you set the raw. eg : new Parser(raw).`,
        404,
        "Parser.fromRaw"
      );
    }
    let tmp: any[] = [];
    let raw: any = this.raw;
    for (let ent of entities) {
      switch (ent.type) {
        case "mention":
          tmp.push(
            //@ts-ignore
            new raw.MessageEntityMention({
              offset: ent.offset,
              length: ent.length,
            })
          );
          break;
        case "hashtag":
          tmp.push(
            //@ts-ignore
            new raw.MessageEntityHashtag({
              offset: ent.offset,
              length: ent.length,
            })
          );
          break;
        case "botCommand":
          tmp.push(
            //@ts-ignore
            new raw.MessageEntityBotCommand({
              offset: ent.offset,
              length: ent.length,
            })
          );
          break;
        case "url":
          tmp.push(
            //@ts-ignore
            new raw.MessageEntityMention({
              offset: ent.offset,
              length: ent.length,
            })
          );
          break;
        case "email":
          tmp.push(
            //@ts-ignore
            new raw.MessageEntityEmail({
              offset: ent.offset,
              length: ent.length,
            })
          );
          break;
        case "bold":
          tmp.push(
            //@ts-ignore
            new raw.MessageEntityBold({
              offset: ent.offset,
              length: ent.length,
            })
          );
          break;
        case "italic":
          tmp.push(
            //@ts-ignore
            new raw.MessageEntityItalic({
              offset: ent.offset,
              length: ent.length,
            })
          );
          break;
        case "code":
          tmp.push(
            //@ts-ignore
            new raw.MessageEntityCode({
              offset: ent.offset,
              length: ent.length,
            })
          );
          break;
        case "pre":
          tmp.push(
            //@ts-ignore
            new raw.MessageEntityPre({
              offset: ent.offset,
              length: ent.length,
              language: ent.language,
            })
          );
          break;
        case "textUrl":
          tmp.push(
            //@ts-ignore
            new raw.MessageEntityTextUrl({
              offset: ent.offset,
              length: ent.length,
              url: ent.url,
            })
          );
          break;
        case "mentionName":
          tmp.push(
            //@ts-ignore
            new raw.MessageEntityMentionName({
              offset: ent.offset,
              length: ent.length,
              userId: bigInt(String(ent.userId)),
            })
          );
          break;
        case "phone":
          tmp.push(
            //@ts-ignore
            new raw.MessageEntityPhone({
              offset: ent.offset,
              length: ent.length,
            })
          );
          break;
        case "cashtag":
          tmp.push(
            //@ts-ignore
            new raw.MessageEntityCashtag({
              offset: ent.offset,
              length: ent.length,
            })
          );
          break;
        case "underline":
          tmp.push(
            //@ts-ignore
            new raw.MessageEntityUnderline({
              offset: ent.offset,
              length: ent.length,
            })
          );
          break;
        case "strike":
          tmp.push(
            //@ts-ignore
            new raw.MessageEntityStrike({
              offset: ent.offset,
              length: ent.length,
            })
          );
          break;
        case "blockquote":
          tmp.push(
            //@ts-ignore
            new raw.MessageEntityBlockquote({
              offset: ent.offset,
              length: ent.length,
            })
          );
          break;
        case "bankCard":
          tmp.push(
            //@ts-ignore
            new raw.MessageEntityBankCard({
              offset: ent.offset,
              length: ent.length,
            })
          );
          break;
        case "spoiler":
          tmp.push(
            //@ts-ignore
            new raw.MessageEntitySpoiler({
              offset: ent.offset,
              length: ent.length,
            })
          );
          break;
        default:
      }
    }
    return tmp;
  }
}
