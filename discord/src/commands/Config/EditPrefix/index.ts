import { SlashCommandBuilder } from '@discordjs/builders';

import { CommandParams, CommandConfigParams } from '../../../types/commands.js';

import * as api from '../../../api/index.js';
import { ERROR_MESSAGES } from '../../../constants/index.js';
import { errors } from '../../../utils/index.js';

async function EditPrefix({ args, dispatch, guildSettings }: CommandParams) {
    if(!dispatch.interaction && !args[0]) {
        return dispatch.reply(ERROR_MESSAGES.COMMANDS.EDIT_PREFIX.NO_ARGS);
    }

    const newPrefix = dispatch.interaction?.options.getString("prefix") || args[0];

    if(newPrefix.split("").includes(" ")) {
        return dispatch.reply(ERROR_MESSAGES.COMMANDS.EDIT_PREFIX.WHITESPACE_FOUND);
    }

    const [res, err] = await api.guildSettings.update(dispatch.guild.id, dispatch, {
        ...guildSettings,
        prefix: newPrefix
    });

    if(err) {
        return console.error(err);
    }

    if(!res) {
        return console.error("No GuildSettings returned");
    }

    return dispatch.reply(`Prefix set to **${res.prefix}**`);
};

export const config: CommandConfigParams = {
    aliases: ["ep"],
    description: "Edit the prefix used for Fireside commands",
    example: ""
};

export const slashCommand = new SlashCommandBuilder()
.setName("editprefix")
.setDescription(config.description)
.addStringOption(option => 
    option
    .setName("prefix")
    .setDescription("The new prefix for Fireside commands")
    .setRequired(true)
);

export default EditPrefix;