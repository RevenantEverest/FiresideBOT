import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandParams, CommandConfig } from '../../../types/commands.js';

import handleGuildPlaylist from './handleGuildPlaylist/index.js';
import handleUserPlaylist from './handleUserPlaylist/index.js';

import { FLAGS, ERROR_MESSAGES } from '../../../constants/index.js';
import { flags } from '../../../utils/index.js';

async function RemoveSong({ args, dispatch, commandFile }: CommandParams) {
    const interaction = dispatch.interaction;

    if(!interaction && !args[0]) {
        return dispatch.reply(ERROR_MESSAGES);
    }

    const argFlags = flags.getCommandArgFlags(dispatch, args);
    const removedFlagArgs = flags.removeFromArgs(args);
    const playlistName = interaction?.options.getString("playlist") ?? removedFlagArgs[0];
    const parsedId = interaction?.options.getNumber("id") ?? parseInt(removedFlagArgs[1], 10);

    if(!Number.isInteger(parsedId)) {
        return dispatch.reply(ERROR_MESSAGES.INVALID_INTEGER);
    }

    if(flags.containsFlag(FLAGS.SERVER_PLAYLIST, argFlags)) {
        return handleGuildPlaylist({ dispatch, commandFile, playlistName, parsedId });
    }

    return handleUserPlaylist({ dispatch, commandFile, playlistName, parsedId });
};

export const config: CommandConfig = {
    aliases: ["rs"],
    permissions: [],
    flags: [FLAGS.SERVER_PLAYLIST],
    description: "Removes a song from a playlist",
    example: "removesong 56"
};

export const slashCommand = new SlashCommandBuilder()
.setName("removesong")
.setDescription(config.description)
.addStringOption(option => 
    option
    .setName("playlist")
    .setDescription("The name of the playlist you wish to remove a song from")
    .setRequired(true)
)
.addNumberOption(option => 
    option
    .setName("id")
    .setDescription("The ID of the song you wish to remove. Can be found using /playlists <Playlist Name>")
    .setRequired(true)
)
.addStringOption(option => 
    option
    .setName("flags")
    .setDescription("Choose which flag to add to the command")
    .addChoices({ name: FLAGS.SERVER_PLAYLIST.name, value: FLAGS.SERVER_PLAYLIST.usageSymbol[0] })
);

export default RemoveSong;