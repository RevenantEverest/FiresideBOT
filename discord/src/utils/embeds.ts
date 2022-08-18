import Discord, { Message, MessageEmbed, MessageEmbedOptions } from 'discord.js';

import { CommandDispatch } from '../types/commands.js';
import { Server } from '../types/server.js';
import { PaginatedEmbed } from '../types/embeds.js';
import { ApiPaginationOptions } from '../types/pagination.js';

import { URLS } from '../constants/index.js';
import * as colors from './colors.js';
import * as dates from './dates.js';
import * as reactions from './reactions.js';

type SetFieldElement<T> = (element: T, index: number, startIndex: number, endIndex: number) => string;

interface GeneratePaginatedEmbedFieldsParams<T> {
    data: T[],
    amountPerPage: number,
    setFieldName: SetFieldElement<T>,
    setFieldValue: SetFieldElement<T>
};

export function generatePaginatedEmbedFields<T>({ data, amountPerPage, setFieldName, setFieldValue }: GeneratePaginatedEmbedFieldsParams<T>): MessageEmbedOptions[] {
    let arr = [];
    for(let i = 0; i < Math.ceil(data.length / amountPerPage); i++) {
        const startIndex = ((i + 1) * amountPerPage) - amountPerPage;
        const endIndex = ((i + 1) * amountPerPage);

        arr.push({
            fields: data.slice(startIndex, endIndex).map((element: T, index: number) => {
                return{
                    name: element ? setFieldName(element, index, startIndex, endIndex) : "",
                    value: element ? setFieldValue(element, index, startIndex, endIndex) : ""
                }
            })
        });
    };

    return arr;
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
    const embed = new Discord.MessageEmbed({ color: paginatedEmbed.color });

    if(paginatedEmbed.title) {
        embed.setTitle(paginatedEmbed.title);
    }

    if(paginatedEmbed.author) {
        embed.setAuthor(paginatedEmbed.author);
    }

    if(paginatedEmbed.thumbnail) {
        embed.setThumbnail(paginatedEmbed.thumbnail);
    }

    if(paginatedEmbed.content.length > 1) {
        let currentPage = index + 1;
        let maxLength = paginatedEmbed.content.length;
        
        if(paginationOptions?.count) {
            maxLength = Math.ceil(paginationOptions.count / paginationOptions.amountPerPage);
        }

        embed.setFooter({
            text: `Page ${currentPage}/${maxLength}`
        });
    }

    paginatedEmbed.content[index].fields?.forEach(field => embed.addField(field.name, field.value, field.inline));

    return embed;
};

export async function pagination<T>(dispatch: CommandDispatch, paginatedEmbed: PaginatedEmbed, paginationOptions?: ApiPaginationOptions<T>) {

    const index = 0;
    const embed = generateEmbed(index, paginatedEmbed, paginationOptions);

    if(paginatedEmbed.content.length <= 1) {
        return dispatch.reply({ embeds: [embed] });
    }

    if(dispatch.interaction) {
        dispatch.reply("Generating queue...");
        return dispatch.channel.send({ embeds: [embed] })
        .then((msg: Message) => reactions.createReactionNavigator(msg, index, paginatedEmbed, paginationOptions))
        .catch((err: Error) => console.error(err));
    }

    dispatch.reply({ embeds: [embed] })
    .then((msg: Message) => reactions.createReactionNavigator(msg, index, paginatedEmbed, paginationOptions))
    .catch((err: Error) => console.error(err));
};