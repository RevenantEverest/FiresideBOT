import Discord from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandParams, CommandConfigParams } from '../../../types/commands.js';

import { colors } from '../../../utils/index.js';

async function Loop({ dispatch, server }: CommandParams) {
    const currentLoopState = server.queue.options.loop;
    server.queue.options.loop = !currentLoopState;

    if(server.queue.currentSongInfo) {
        server.queue.info.push(server.queue.currentSongInfo);
    }

    const embed = new Discord.MessageEmbed({
        color: colors.fuchsia,
        fields: [{
            name: "Music Options",
            value: `Looping is now **${!currentLoopState ? "On 🟢" : "Off 🔴"}**`
        }]
    });

    return dispatch.reply({ embeds: [embed] });
};

export const config: CommandConfigParams = {
    aliases: [],
    description: "Loops the current music queue",
    example: "loop"
};

export const slashCommand = new SlashCommandBuilder()
.setName("loop")
.setDescription(config.description)

export default Loop;