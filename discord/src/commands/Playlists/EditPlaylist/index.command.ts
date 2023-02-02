import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandParams, CommandConfigParams } from '../../../types/commands.js';

import handleGuildPlaylist from './handleGuildPlaylist/index.js';
import handleUserPlaylist from './handleUserPlaylist/index.js';

import { ERROR_MESSAGES, FLAGS } from '../../../constants/index.js';
import { flags } from '../../../utils/index.js';

async function EditPlaylist({ args, dispatch, commandFile }: CommandParams) {
    if(!dispatch.interaction && !args[0]) {
        return dispatch.reply(ERROR_MESSAGES.COMMANDS.EDIT_PLAYLIST.NO_ARGS);
    }

    const argFlags: string[] = flags.getCommandArgFlags(dispatch, args);
    const playlistName: string  = dispatch.interaction?.options.getString("name") ?? flags.removeFromArgs(args)[0];
    const updatedPlaylistName: string | undefined = dispatch.interaction?.options.getString("new") ?? flags.removeFromArgs(args)[1];

    if(flags.containsFlag(FLAGS.SERVER_PLAYLIST, argFlags)) {
        return handleGuildPlaylist({ dispatch, args, commandFile, playlistName, updatedPlaylistName });
    }

    return handleUserPlaylist({ dispatch, args, commandFile, playlistName, updatedPlaylistName, argFlags });
};

export const config: CommandConfigParams = {
    aliases: ["ep"],
    flags: [FLAGS.PRIVATE_TOGGLE],
    description: "Edit the name and public state of your playlist",
    example: "editplaylist MyPlaylist MyNewPlaylist"
};

export const slashCommand = new SlashCommandBuilder()
.setName("editplaylist")
.setDescription(config.description)
.addStringOption(option => 
    option
    .setName("name")
    .setDescription("The name of the playlist to edit")
    .setRequired(true)
)
.addStringOption(option => 
    option
    .setName("new")
    .setDescription("The updated name you'd like to give the playlist")
)
.addStringOption(option => 
    option
    .setName("flags")
    .setDescription("Choose which flag to add to the command")
    .addChoices({ name: FLAGS.PRIVATE_TOGGLE.name, value: FLAGS.PRIVATE_TOGGLE.usageSymbol[0] })
    .addChoices({ name: FLAGS.SERVER_PLAYLIST.name, value: FLAGS.SERVER_PLAYLIST.usageSymbol[0] })
);

export default EditPlaylist;