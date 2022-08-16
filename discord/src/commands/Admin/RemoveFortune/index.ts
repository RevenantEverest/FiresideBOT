import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandParams, CommandConfigParams } from '../../../types/commands.js';

import * as api from '../../../api/index.js';

import { ERROR_MESSAGES } from '../../../constants/index.js';

async function RemoveFortune({ args, dispatch }: CommandParams) {
    if(!dispatch.interaction && !args[0]) {
        return dispatch.reply(ERROR_MESSAGES.COMMANDS.CREATE_FORTUNE.NO_ARGS);
    }

    const fortuneId = dispatch.interaction?.options.getNumber("id") ?? parseInt(args[0], 10);

    const [res, err] = await api.fortunes.destroy(dispatch.guildId, dispatch, fortuneId);

    if(err) {
        return console.error("Failure");
    }

    if(!res) {
        return console.error("No Return");
    }

    return dispatch.reply(`Fortune **${fortuneId}** removed`);
};

export const config: CommandConfigParams = {
    aliases: ["rf"],
    description: "Remove a custom fortune",
    example: ""
};

export const slashCommand = new SlashCommandBuilder()
.setName("removefortune")
.setDescription(config.description)
.addNumberOption(option => 
    option
    .setName("id")
    .setDescription("ID of the fortune to remove")
    .setRequired(true)
);

export default RemoveFortune;