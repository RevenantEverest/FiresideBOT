import Discord from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandParams, CommandConfigParams } from '../../../types/commands.js';

import { colors, dates } from '../../../utils/index.js';

async function ServerInfo({ bot, dispatch }: CommandParams) {

    const roles = await dispatch.guild.roles.fetch();
    const roleCount = roles.size;

    const channels = await dispatch.guild.channels.fetch();
    const textChannelCount = channels.filter(channel => channel.type === "GUILD_TEXT").size;
    const voiceChannelCount = channels.filter(channel => channel.type === "GUILD_VOICE").size;
    
    const createdAt = dates.format(dispatch.guild.createdAt, {
        dateFormat: "MMMM D, YYYY"
    });

    const embed = new Discord.MessageEmbed({
        color: colors.fuchsia,
        author: {
            name: `Server Info for ${dispatch.guild.name}`,
            iconURL: dispatch.guild.iconURL({ dynamic: true }) ?? ""
        },
        thumbnail: {
            url: dispatch.guild.iconURL({ dynamic: true }) ?? ""
        },
        fields: [
            { name: "Owner:", value: `<@${dispatch.guild.ownerId}>`, inline: true },
            { name: "Created At:", value: `${createdAt.date}`, inline: true },
            { name: "Members:", value: `${dispatch.guild.memberCount}`, inline: true },
            { name: "Roles:", value: `${roleCount}`, inline: true },
            { name: "Text Channels:", value: `${textChannelCount}`, inline: true },
            { name: "Voice Channels:", value: `${voiceChannelCount}`, inline: true },
        ],
        footer: {
            text: `Guild ID: ${dispatch.guildId}`
        }
    });

    return dispatch.reply({ embeds: [embed] });
};

export const config: CommandConfigParams = {
    aliases: ["si"],
    description: "Displays information about the current Server (Guild)",
    example: "serverinfo"
};

export const slashCommand = new SlashCommandBuilder()
.setName("serverinfo")
.setDescription(config.description)

export default ServerInfo;