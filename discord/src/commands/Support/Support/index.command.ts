import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandParams, CommandConfigParams } from '../../../types/commands.js';

import { URLS } from '../../../constants/index.js';

async function Support({ dispatch }: CommandParams) {
    return dispatch.reply(URLS.SUPPORT_SERVER);
};

export const config: CommandConfigParams = {
    aliases: [],
    description: "Sends the link to the Fireside support server",
    example: "support"
};

export const slashCommand = new SlashCommandBuilder()
.setName("support")
.setDescription(config.description)

export default Support;