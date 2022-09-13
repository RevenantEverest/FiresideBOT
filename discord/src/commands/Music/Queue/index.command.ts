import { SlashCommandBuilder } from '@discordjs/builders';

import { CommandParams, CommandConfigParams } from '../../../types/commands.js';
import { PaginatedEmbed } from '../../../types/embeds.js';
import { ServerSongInfo } from '../../../types/server.js';

import { colors, dates, embeds } from '../../../utils/index.js';

async function Queue({ dispatch, server}: CommandParams) {
    if(server.queue.info.length < 1) {
        return dispatch.reply("No other songs in queue.");
    }

    const queue = server.queue.info;
    const overalLength = queue.map(info => info.duration).reduce((a, b) => a + b);

    const amountPerPage: number = 5;
    const paginatedEmbed: PaginatedEmbed = {
        pages: embeds.generatePaginatedEmbedPages<ServerSongInfo>({
            title: `**Queue** (${dates.parseSeconds(overalLength)})`,
            author: {
                iconURL: dispatch.guild.iconURL({ dynamic: true }) ?? "",
                name: dispatch.guild.name
                
            },
            color: colors.queueEmbed,
            data: queue,
            amountPerPage,
            setFieldName: (songInfo: ServerSongInfo, index: number, startIndex: number): string => {
                return `${(startIndex + index) + 1}. ${songInfo.title}`
            },
            setFieldValue: (songInfo: ServerSongInfo) => {
                const { author, duration } = songInfo;
                return `**Author:** ${author}\n**Duration:** ${dates.parseSeconds(duration)}`;
            }
        })
    };

    return embeds.pagination<ServerSongInfo>(dispatch, paginatedEmbed);
};

export const config: CommandConfigParams = {
    aliases: ["q"],
    description: "Display the current song queue",
    example: ""
};

export const slashCommand = new SlashCommandBuilder()
.setName("queue")
.setDescription(config.description)

export default Queue;