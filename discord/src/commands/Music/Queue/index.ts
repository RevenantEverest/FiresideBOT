import Discord, { MessageEmbedAuthor, MessageEmbedOptions, ColorResolvable } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

import { CommandParams, CommandConfigParams } from '../../../types/commands.js';
import { PaginatedEmbed } from '../../../types/embeds.js';
import { colors, dates, embeds } from '../../../utils/index.js';

async function Queue({ dispatch, server, interaction}: CommandParams) {
    if(server.queue.info.length < 1) {
        return dispatch.reply("No other songs in queue.");
    }

    const queue = server.queue.info;
    const overalLength = queue.map(info => info.duration).reduce((a, b) => a + b);
    
    const paginatedEmbed: PaginatedEmbed = {
        title: `**Queue** (${dates.parseSeconds(overalLength)})`,
        author: {
            url: dispatch.guild.iconURL({ dynamic: true }) ?? "",
            name: dispatch.guild.name
            
        },
        color: colors.queueEmbed,
        content: []
    };

    for(let i = 0; i < Math.ceil(queue.length / 5); i++) {
        const startIndex = ((i + 1) * 5) - 5;
        const endIndex = ((i + 1) * 5) - 1;
        paginatedEmbed.content.push({
            fields: queue.slice(startIndex, endIndex).map((info, index) => {
                return{
                    name: `${(startIndex + index) + 1}. ${info.title}`,
                    value: `**Author:** ${info.author}\n**Duration:** ${dates.parseSeconds(info.duration)}`
                }
            })
        });
    };

    return embeds.pagination(dispatch, paginatedEmbed, interaction);
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