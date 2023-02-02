import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandParams, CommandConfig } from '../../../types/commands.js';

import * as api from '../../../api/index.js';

import { ERROR_MESSAGES, FLAGS } from '../../../constants/index.js';
import { flags, errors } from '../../../utils/index.js';

async function CreatePlaylist({ args, dispatch, commandFile }: CommandParams) {

    if(!dispatch.interaction) {
        if(!args[0]) {
            return dispatch.reply(ERROR_MESSAGES.COMMANDS.CREATE_PLAYLIST.NO_ARGS);
        }
    }

    const argFlags = flags.getCommandArgFlags(dispatch, args);
    const playlistName = dispatch.interaction?.options.getString("name") ?? flags.removeFromArgs(args).join(" ");

    if(/\s/gi.test(playlistName)) {
        return dispatch.reply(ERROR_MESSAGES.COMMANDS.CREATE_PLAYLIST.NO_WHITESPACE);
    }

    if(flags.containsFlag(FLAGS.SERVER_PLAYLIST, argFlags)) {
        const [serverPlaylist, err] = await api.guildPlaylists.create(dispatch, playlistName);

        if(err) {
            if(err.response && err.response.status !== 500) {
                const responseData = err.response.data;
                return dispatch.reply(responseData.message);
            }
    
            return errors.command({ dispatch, err, errMessage: err.message, commandName: commandFile.displayName });
        }

        if(!serverPlaylist) {
            return dispatch.reply("No server playlist returned");
        }

        return dispatch.reply(`New server playlist **${serverPlaylist.name}** created with **ID: ${serverPlaylist.id}**`);
    }

    const [userPlaylist, err] = await api.userPlaylists.create(dispatch, playlistName);

    if(err) {
        if(err.response && err.response.status !== 500) {
            const responseData = err.response.data;
            return dispatch.reply(responseData.message);
        }

        return errors.command({ dispatch, err, errMessage: err.message, commandName: commandFile.displayName });
    }

    if(!userPlaylist) {
        return dispatch.reply("No playlist returned");
    }

    return dispatch.reply(`New playlist **${userPlaylist.name}** created with **ID: ${userPlaylist.id}**`);
};

export const config: CommandConfig = {
    aliases: ["cp"],
    permissions: [],
    flags: [FLAGS.SERVER_PLAYLIST],
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
)
.addStringOption(option => 
    option
    .setName("flags")
    .setDescription("Choose which flag to add to the command")
    .addChoices({ name: FLAGS.SERVER_PLAYLIST.name, value: FLAGS.SERVER_PLAYLIST.usageSymbol[0] })
);

export default CreatePlaylist;