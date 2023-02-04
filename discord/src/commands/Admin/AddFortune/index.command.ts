import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandParams, CommandConfig } from '../../../types/commands.js';

import * as api from '../../../api/index.js';

import { ERROR_MESSAGES } from '../../../constants/index.js';

async function AddFortune({ args, dispatch }: CommandParams) {
    if(!dispatch.interaction && !args[0]) {
        return dispatch.reply(ERROR_MESSAGES.COMMANDS.CREATE_FORTUNE.NO_ARGS);
    }

    const fortune = dispatch.interaction?.options.getString("fortune") ?? args.join(" ");

    const [res, err] = await api.fortunes.create(dispatch.guildId, dispatch, fortune);

    if(err) {
        return console.error("Failure");
    }

    if(!res) {
        return console.error("No Return");
    }

    return dispatch.reply(`Fortune **${res.fortune}** added to list of 8-Ball responses with ID: **${res.id}**`);
};

export const config: CommandConfig = {
    aliases: ["af"],
    permissions: ["ADMINISTRATOR"],
    description: "Create a fortune to add to 8-Ball responses",
    example: ""
};

export const slashCommand = new SlashCommandBuilder()
.setName("addfortune")
.setDescription(config.description)
.addStringOption(option => 
    option
    .setName("fortune")
    .setDescription("frotune to add to 8-Ball responses")
    .setRequired(true)
);

export default AddFortune;