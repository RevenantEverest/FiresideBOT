import { SlashCommandBuilder } from '@discordjs/builders';

import { CommandParams, CommandConfig } from '../../../types/commands.js';
import { queue } from '../../../utils/index.js';

async function Skip({ bot, dispatch, server}: CommandParams) {
    if(!server.queue.player) return;
    
    if(dispatch.interaction) {
        dispatch.reply("Skipping...");
    }

    queue.nextInQueue(bot, dispatch, server);  
};

export const config: CommandConfig = {
    aliases: [],
    permissions: [],
    description: "Skips the currently playing song",
    example: ""
};

export const slashCommand = new SlashCommandBuilder()
.setName("skip")
.setDescription(config.description)

export default Skip;