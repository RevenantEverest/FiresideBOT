import Discord, { 
    Message, 
    MessageEmbed, 
    MessageEmbedOptions, 
    MessageEmbedAuthor, 
    ColorResolvable 
} from 'discord.js';

import { CommandDispatch } from '../types/commands.js';
import { Server } from '../types/server.js';
import { PaginatedEmbed, PaginatedEmbedPage } from '../types/embeds.js';
import { ApiPaginationOptions } from '../types/pagination.js';

import { URLS } from '../constants/index.js';
import * as colors from './colors.js';
import * as dates from './dates.js';
import * as reactions from './reactions.js';

type SetFieldElement<T> = (element: T, index: number, startIndex: number, endIndex: number) => string;
type SetTitleElement = (index: number, startIndex: number, endIndex: number) =>  string;

interface GeneratePaginatedEmbedPagesParams<T> {
    title?: string | SetTitleElement,
    description?: string,
    author?: MessageEmbedAuthor,
    thumbnail?: string,
    color: ColorResolvable,
    data: T[],
    amountPerPage: number,
    setFieldName: SetFieldElement<T>,
    setFieldValue: SetFieldElement<T>,
    options?: GeneratePaginatedEmbedPagesOptions
};

interface GeneratePaginatedEmbedPagesOptions {
    blankFieldAfterDescription?: boolean
};

export function generatePaginatedEmbedPages<T>({ title, description, author, color, data, amountPerPage, setFieldName, setFieldValue, options }: GeneratePaginatedEmbedPagesParams<T>): PaginatedEmbedPage[] {
    const pages: PaginatedEmbedPage[] = [];
    for(let i = 0; i < Math.ceil(data.length / amountPerPage); i++) {
        const startIndex = ((i + 1) * amountPerPage) - amountPerPage;
        const endIndex = ((i + 1) * amountPerPage);

        const fields = data.slice(startIndex, endIndex).map((element: T, index: number) => {
            return{
                name: element ? setFieldName(element, index, startIndex, endIndex) : "",
                value: element ? setFieldValue(element, index, startIndex, endIndex) : ""
            }
        });

        if(options?.blankFieldAfterDescription) {
            console.log("Adding blank field...");
            fields.splice(0, 0, { name: "\u200b", value: "\u200b" });
        }

        pages.push({
            title: typeof title === "function" ? title(i, startIndex, endIndex) : title,
            description,
            author,
            color,
            content: {
                fields
            }
        })
    };
    return pages;
};

export function createCurrentSongEmbed(dispatch: CommandDispatch, server: Server) {
    const currentSong = server.queue.info[0];
    const embed = new Discord.MessageEmbed({
        color: colors.songEmbed,
        title: "**CURRENT SONG**",
        thumbnail: {
            url: currentSong.thumbnail_url
        },
        fields: [
            { name: currentSong.title, value: currentSong.author },
            { name: "Link", value: `[Click Me](${URLS.YOUTUBE_VIDEO + currentSong.videoId}) \nRequested By: ${currentSong.requestedBy}` },
        ],
        footer: {
            text: `Length ${dates.parseSeconds(currentSong.duration)}`
        }
    });

    server.queue.currentSongEmbed = embed;
    dispatch.channel.send({ embeds: [embed] });
};

export function generateEmbed<T>(index: number, paginatedEmbed: PaginatedEmbed, paginationOptions?: ApiPaginationOptions<T>): MessageEmbed {
    const page = paginatedEmbed.pages[index];
    const embed = new Discord.MessageEmbed({ color: page.color });

    if(page.title) {
        embed.setTitle(page.title);
    }

    if(page.description) {
        embed.setDescription(page.description);
    }

    if(page.author) {
        embed.setAuthor(page.author);
    }

    if(page.thumbnail) {
        embed.setThumbnail(page.thumbnail);
    }

    if(paginatedEmbed.pages.length > 1) {
        let currentPage = index + 1;
        let maxLength = paginatedEmbed.pages.length;
        
        if(paginationOptions?.count) {
            maxLength = Math.ceil(paginationOptions.count / paginationOptions.amountPerPage);
        }

        embed.setFooter({
            text: `Page ${currentPage}/${maxLength}`
        });
    }

    page.content.fields?.forEach(field => embed.addField(field.name, field.value, field.inline));

    return embed;
};

export async function pagination<T>(dispatch: CommandDispatch, paginatedEmbed: PaginatedEmbed, paginationOptions?: ApiPaginationOptions<T>) {

    const index = 0;
    const embed = generateEmbed(index, paginatedEmbed, paginationOptions);

    if(paginatedEmbed.pages.length <= 1) {
        return dispatch.reply({ embeds: [embed] });
    }

    if(dispatch.interaction) {
        dispatch.reply("Generating embed...");
        return dispatch.channel.send({ 
            content: paginatedEmbed.flavorText,
            embeds: [embed] 
        })
        .then((msg: Message) => reactions.createReactionNavigator(msg, index, paginatedEmbed, paginationOptions))
        .catch((err: Error) => console.error(err));
    }

    dispatch.reply({ 
        content: paginatedEmbed.flavorText,
        embeds: [embed]
    })
    .then((msg: Message) => reactions.createReactionNavigator(msg, index, paginatedEmbed, paginationOptions))
    .catch((err: Error) => console.error(err));
};