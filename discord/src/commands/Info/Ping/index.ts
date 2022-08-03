import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandParams, CommandConfigParams } from '../../../types/commands.js';

async function Ping({ dispatch }: CommandParams) {
    return await dispatch.reply("Pong");
};

export const config: CommandConfigParams = {
    aliases: [],
    description: "Check Fireside's ping",
    example: ""
};

export const slashCommand = new SlashCommandBuilder()
.setName("ping")
.setDescription(config.description);

export default Ping;