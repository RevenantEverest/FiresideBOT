import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandParams, CommandConfigParams } from '../../../types/commands.js';

import * as api from '../../../api/index.js';

import { ERROR_MESSAGES } from '../../../constants/index.js';
import { errors } from '../../../utils/index.js';

async function CreatePlaylist({ bot, args, dispatch }: CommandParams) {

    if(!dispatch.interaction) {
        if(!args[0]) {
            return dispatch.reply(ERROR_MESSAGES.COMMANDS.CREATE_PLAYLIST.NO_ARGS);
        }

        if(args[1]) {
            return dispatch.reply(ERROR_MESSAGES.COMMANDS.CREATE_PLAYLIST.NO_WHITESPACE);
        }
    }

    const playlistName = dispatch.interaction?.options.getString("name") ?? args[0];
    const [userPlaylist, err] = await api.userPlaylists.create(dispatch, playlistName);

    if(err) {
        if(err.response && err.response.status !== 500) {
            const responseData = err.response.data;
            return dispatch.reply(responseData.message);
        }

        return errors.command({ bot, dispatch, err, errMessage: err.message, commandName: "" });
    }

    if(!userPlaylist) {
        return dispatch.reply("No playlist returned");
    }

    return dispatch.reply(`New playlist **${userPlaylist.name}** created with ID **${userPlaylist.id}**`);
};

export const config: CommandConfigParams = {
    aliases: ["cp"],
    description: "Create a new playlist",
    example: "createplaylist MyPlaylist"
};

export const slashCommand = new SlashCommandBuilder()
.setName("createplaylist")
.setDescription(config.description)
.addStringOption(option => 
    option
    .setName("name")
    .setDescription("The name of your new playlist")
    .setRequired(true)
);

export default CreatePlaylist;