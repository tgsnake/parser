/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2023 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
import { Entities } from './Entities.ts';
import { parse as MDParser } from './markdown.ts';
import { parse as HTMLParser } from './html.ts';
import ParserError from './ParserError.ts';
import { Raw, type Client } from './platform.deno.ts';

export function parse(text: string, parseMode: 'html' | 'markdown'): [string, Entities[]] {
  try {
    if (text === '') {
      return [text, []];
    }
    if (parseMode === 'markdown') {
      return MDParser(text);
    }
    if (parseMode === 'html') {
      return HTMLParser(text);
    }
    return [text, []];
  } catch (error: any) {
    throw new ParserError(error.message, 'Parser error when parsing message.', 500, 'Parser.parse');
  }
}

export function fromRaw(entities: Raw.TypeMessageEntity[]) {
  let tmp: Entities[] = [];
  for (let ent of entities) {
    if (ent instanceof Raw.MessageEntityMention) {
      ent as Raw.MessageEntityMention;
      tmp.push(
        new Entities({
          offset: ent.offset,
          length: ent.length,
          type: 'mention',
        }),
      );
      continue;
    }
    if (ent instanceof Raw.MessageEntityHashtag) {
      ent as Raw.MessageEntityHashtag;
      tmp.push(
        new Entities({
          offset: ent.offset,
          length: ent.length,
          type: 'hashtag',
        }),
      );
      continue;
    }
    if (ent instanceof Raw.MessageEntityBotCommand) {
      ent as Raw.MessageEntityBotCommand;
      tmp.push(
        new Entities({
          offset: ent.offset,
          length: ent.length,
          type: 'botCommand',
        }),
      );
      continue;
    }
    if (ent instanceof Raw.MessageEntityUrl) {
      ent as Raw.MessageEntityUrl;
      tmp.push(
        new Entities({
          offset: ent.offset,
          length: ent.length,
          type: 'url',
        }),
      );
      continue;
    }
    if (ent instanceof Raw.MessageEntityEmail) {
      ent as Raw.MessageEntityEmail;
      tmp.push(
        new Entities({
          offset: ent.offset,
          length: ent.length,
          type: 'email',
        }),
      );
      continue;
    }
    if (ent instanceof Raw.MessageEntityBold) {
      ent as Raw.MessageEntityBold;
      tmp.push(
        new Entities({
          offset: ent.offset,
          length: ent.length,
          type: 'bold',
        }),
      );
      continue;
    }
    if (ent instanceof Raw.MessageEntityItalic) {
      ent as Raw.MessageEntityItalic;
      tmp.push(
        new Entities({
          offset: ent.offset,
          length: ent.length,
          type: 'italic',
        }),
      );
      continue;
    }
    if (ent instanceof Raw.MessageEntityCode) {
      ent as Raw.MessageEntityCode;
      tmp.push(
        new Entities({
          offset: ent.offset,
          length: ent.length,
          type: 'code',
        }),
      );
      continue;
    }
    if (ent instanceof Raw.MessageEntityPre) {
      ent as Raw.MessageEntityPre;
      tmp.push(
        new Entities({
          offset: ent.offset,
          length: ent.length,
          language: ent.language,
          type: 'pre',
        }),
      );
      continue;
    }
    if (ent instanceof Raw.MessageEntityTextUrl) {
      ent as Raw.MessageEntityTextUrl;
      tmp.push(
        new Entities({
          offset: ent.offset,
          length: ent.length,
          url: ent.url,
          type: 'textUrl',
        }),
      );
      continue;
    }
    if (ent instanceof Raw.MessageEntityMentionName) {
      ent as Raw.MessageEntityMentionName;
      tmp.push(
        new Entities({
          offset: ent.offset,
          length: ent.length,
          userId: BigInt(String(ent.userId)),
          type: 'mentionName',
        }),
      );
      continue;
    }
    if (ent instanceof Raw.MessageEntityPhone) {
      ent as Raw.MessageEntityPhone;
      tmp.push(
        new Entities({
          offset: ent.offset,
          length: ent.length,
          type: 'phone',
        }),
      );
      continue;
    }
    if (ent instanceof Raw.MessageEntityCashtag) {
      ent as Raw.MessageEntityCashtag;
      tmp.push(
        new Entities({
          offset: ent.offset,
          length: ent.length,
          type: 'cashtag',
        }),
      );
      continue;
    }
    if (ent instanceof Raw.MessageEntityUnderline) {
      ent as Raw.MessageEntityUnderline;
      tmp.push(
        new Entities({
          offset: ent.offset,
          length: ent.length,
          type: 'underline',
        }),
      );
      continue;
    }
    if (ent instanceof Raw.MessageEntityStrike) {
      ent as Raw.MessageEntityHashtag;
      tmp.push(
        new Entities({
          offset: ent.offset,
          length: ent.length,
          type: 'strike',
        }),
      );
      continue;
    }
    if (ent instanceof Raw.MessageEntityBlockquote) {
      ent as Raw.MessageEntityBlockquote;
      tmp.push(
        new Entities({
          offset: ent.offset,
          length: ent.length,
          type: 'blockquote',
        }),
      );
      continue;
    }
    if (ent instanceof Raw.MessageEntityBankCard) {
      ent as Raw.MessageEntityBankCard;
      tmp.push(
        new Entities({
          offset: ent.offset,
          length: ent.length,
          type: 'bankCard',
        }),
      );
      continue;
    }
    if (ent instanceof Raw.MessageEntitySpoiler) {
      ent as Raw.MessageEntitySpoiler;
      tmp.push(
        new Entities({
          offset: ent.offset,
          length: ent.length,
          type: 'spoiler',
        }),
      );
      continue;
    }
    if (ent instanceof Raw.MessageEntityCustomEmoji) {
      ent as Raw.MessageEntityCustomEmoji;
      tmp.push(
        new Entities({
          offset: ent.offset,
          length: ent.length,
          emojiId: ent.documentId,
          type: 'customEmoji',
        }),
      );
    }
  }
  return tmp;
}
export async function toRaw(client: Client, entities: Entities[]) {
  if (!client) {
    throw new ParserError(
      `Client not found!`,
      `Plase make sure you set the client. eg : Parser.fromRaw(client,entities).`,
      404,
      'Parser.fromRaw',
    );
  }
  let tmp: Raw.TypeMessageEntity[] = [];
  for (let ent of entities) {
    switch (ent.type) {
      case 'mention':
        tmp.push(
          new Raw.MessageEntityMention({
            offset: ent.offset,
            length: ent.length,
          }),
        );
        break;
      case 'hashtag':
        tmp.push(
          new Raw.MessageEntityHashtag({
            offset: ent.offset,
            length: ent.length,
          }),
        );
        break;
      case 'botCommand':
        tmp.push(
          new Raw.MessageEntityBotCommand({
            offset: ent.offset,
            length: ent.length,
          }),
        );
        break;
      case 'url':
        tmp.push(
          new Raw.MessageEntityMention({
            offset: ent.offset,
            length: ent.length,
          }),
        );
        break;
      case 'email':
        tmp.push(
          new Raw.MessageEntityEmail({
            offset: ent.offset,
            length: ent.length,
          }),
        );
        break;
      case 'bold':
        tmp.push(
          new Raw.MessageEntityBold({
            offset: ent.offset,
            length: ent.length,
          }),
        );
        break;
      case 'italic':
        tmp.push(
          new Raw.MessageEntityItalic({
            offset: ent.offset,
            length: ent.length,
          }),
        );
        break;
      case 'code':
        tmp.push(
          new Raw.MessageEntityCode({
            offset: ent.offset,
            length: ent.length,
          }),
        );
        break;
      case 'pre':
        tmp.push(
          new Raw.MessageEntityPre({
            offset: ent.offset,
            length: ent.length,
            language: ent.language,
          }),
        );
        break;
      case 'textUrl':
        tmp.push(
          new Raw.MessageEntityTextUrl({
            offset: ent.offset,
            length: ent.length,
            url: ent.url,
          }),
        );
        break;
      case 'mentionName':
        const peer = await client.resolvePeer(ent.userId);
        tmp.push(
          new Raw.InputMessageEntityMentionName({
            offset: ent.offset,
            length: ent.length,
            userId: await getInputUser(peer),
          }),
        );
        break;
      case 'phone':
        tmp.push(
          new Raw.MessageEntityPhone({
            offset: ent.offset,
            length: ent.length,
          }),
        );
        break;
      case 'cashtag':
        tmp.push(
          new Raw.MessageEntityCashtag({
            offset: ent.offset,
            length: ent.length,
          }),
        );
        break;
      case 'underline':
        tmp.push(
          new Raw.MessageEntityUnderline({
            offset: ent.offset,
            length: ent.length,
          }),
        );
        break;
      case 'strike':
        tmp.push(
          new Raw.MessageEntityStrike({
            offset: ent.offset,
            length: ent.length,
          }),
        );
        break;
      case 'blockquote':
        tmp.push(
          new Raw.MessageEntityBlockquote({
            offset: ent.offset,
            length: ent.length,
          }),
        );
        break;
      case 'bankCard':
        tmp.push(
          new Raw.MessageEntityBankCard({
            offset: ent.offset,
            length: ent.length,
          }),
        );
        break;
      case 'spoiler':
        tmp.push(
          new Raw.MessageEntitySpoiler({
            offset: ent.offset,
            length: ent.length,
          }),
        );
        break;
      case 'customEmoji':
        tmp.push(
          new Raw.MessageEntityCustomEmoji({
            offset: ent.offset,
            length: ent.length,
            documentId: ent.emojiId,
          }),
        );
        break;
      default:
    }
  }
  return tmp;
}

function getInputUser(peer: Raw.TypeInputPeer) {
  if (peer instanceof Raw.InputPeerUser) {
    return new Raw.InputUser({
      userId: (peer as Raw.InputPeerUser).userId,
      accessHash: (peer as Raw.InputPeerUser).accessHash,
    });
  }
  if (peer instanceof Raw.InputPeerSelf) {
    return new Raw.InputUserSelf();
  }
  return new Raw.InputUserEmpty();
}
