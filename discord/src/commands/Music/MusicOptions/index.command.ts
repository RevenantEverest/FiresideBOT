import Discord from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandParams, CommandConfigParams } from '../../../types/commands.js';

import { colors, boolean } from '../../../utils/index.js';

async function MusicOptions({ dispatch, server }: CommandParams) {
    const musicOptions = server.queue.options;

    const loopDisplay = boolean.onOrOff(musicOptions.loop, {
        withCapitalization: true,
        withEmojis: true,
        emojisLeft: true
    });

    const embed = new Discord.MessageEmbed({
        color: colors.fuchsia,
        title: "Music Options",
        author: {
            name: dispatch.guild.name,
            iconURL: dispatch.guild.iconURL({ dynamic: true }) ?? ""
        },
        fields: [
            { name: "Volume:", value: `${musicOptions.volume}`, inline: true },
            { name: "Looping:", value: `${loopDisplay}`, inline: true },
        ]
    });

    return dispatch.reply({ embeds: [embed] });
};

export const config: CommandConfigParams = {
    aliases: ["mo"],
    description: "Displays the current music options (Volume, Looping, etc)",
    example: "musicoptions"
};

export const slashCommand = new SlashCommandBuilder()
.setName("musicoptions")
.setDescription(config.description)

export default MusicOptions;