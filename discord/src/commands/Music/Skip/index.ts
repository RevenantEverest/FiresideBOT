import { SlashCommandBuilder } from '@discordjs/builders';

import { CommandParams, CommandConfigParams } from '../../../types/commands.js';
import { queue } from '../../../utils/index.js';

async function Skip({ bot, dispatch, interaction, server}: CommandParams) {
    if(!server.queue.player) return;
    
    if(interaction) {
        dispatch.reply("Skipping...");
    }

    queue.nextInQueue(bot, dispatch, server);  
};

export const config: CommandConfigParams = {
    aliases: [],
    description: "Skips the currently playing song",
    example: ""
};

export const slashCommand = new SlashCommandBuilder()
.setName("skip")
.setDescription(config.description)

export default Skip;