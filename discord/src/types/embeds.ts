import { MessageEmbedAuthor, MessageEmbedOptions, ColorResolvable } from 'discord.js';


export interface PaginatedEmbedPage {
    title?: string,
    description?: string,
    author?: MessageEmbedAuthor,
    thumbnail?: string,
    color: ColorResolvable,
    content: MessageEmbedOptions,
};
export interface PaginatedEmbed {
    pages: PaginatedEmbedPage[],
    flavorText?: string,
    time?: number
};