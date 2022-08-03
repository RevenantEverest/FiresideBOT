import { MessageEmbedAuthor, MessageEmbedOptions, ColorResolvable } from 'discord.js';

export interface PaginatedEmbed {
    title?: string,
    author?: MessageEmbedAuthor,
    thumbnail?: string,
    color: ColorResolvable,
    content: MessageEmbedOptions[],
    flavorText?: string,
    time?: number
};