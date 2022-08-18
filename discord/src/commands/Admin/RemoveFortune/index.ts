import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandParams, CommandConfigParams } from '../../../types/commands.js';

import * as api from '../../../api/index.js';

import { ERROR_MESSAGES } from '../../../constants/index.js';
import { errors } from '../../../utils/index.js';

async function RemoveFortune({ bot, args, dispatch }: CommandParams) {
    if(!dispatch.interaction && !args[0]) {
        return dispatch.reply(ERROR_MESSAGES.COMMANDS.CREATE_FORTUNE.NO_ARGS);
    }

    const fortuneId = dispatch.interaction?.options.getNumber("id") ?? parseInt(args[0], 10);

    const [res, err] = await api.fortunes.destroy(dispatch.guildId, dispatch, fortuneId);

    if(!res || err) {
        const error = err ?? new Error("");
        return errors.command({ bot, dispatch, err: error, errMessage: error.message, commandName: "RemoveFortune" });
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