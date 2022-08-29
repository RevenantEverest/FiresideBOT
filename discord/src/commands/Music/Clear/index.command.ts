import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandParams, CommandConfigParams } from '../../../types/commands.js';

async function Clear({ dispatch, server }: CommandParams) {
    server.queue.info = [];
    
    return dispatch.reply("Queue cleared");
};

export const config: CommandConfigParams = {
    aliases: [],
    description: "Clears the current queue",
    example: "clear"
};

export const slashCommand = new SlashCommandBuilder()
.setName("clear")
.setDescription(config.description)

export default Clear;