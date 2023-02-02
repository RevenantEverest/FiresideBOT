import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandParams, CommandConfigParams } from '../../../types/commands.js';

import handleGuildPlaylist from './handleGuildPlaylist/index.js';
import handleUserPlaylist from './handleUserPlaylist/index.js';

import { ERROR_MESSAGES, FLAGS } from '../../../constants/index.js';
import { flags } from'../../../utils/index.js';

async function AddSong({ args, dispatch, commandFile }: CommandParams) {
    const interaction = dispatch.interaction;

    if(!interaction && !args[0]) {
        return dispatch.reply(ERROR_MESSAGES.COMMANDS.ADD_SONG.NO_ARGS);
    }

    const argFlags = flags.getCommandArgFlags(dispatch, args);
    const removedFlagArgs = flags.removeFromArgs(args);
    const playlistName = dispatch.interaction?.options.getString("playlist") ?? removedFlagArgs[0];
    const request = dispatch.interaction?.options.getString("request") ?? removedFlagArgs.slice(1, removedFlagArgs.length).join(" ");

    if(flags.containsFlag(FLAGS.SERVER_PLAYLIST, argFlags)) {
        return handleGuildPlaylist({ dispatch, commandFile, playlistName, request });
    }

    return handleUserPlaylist({ dispatch, commandFile, playlistName, request });
};

export const config: CommandConfigParams = {
    aliases: ['as'],
    flags: [FLAGS.SERVER_PLAYLIST],
    description: "Adds a song request to a given playlist",
    example: "addsong MyPlaylist Playing God Polyphia"
};

export const slashCommand = new SlashCommandBuilder()
.setName("addsong")
.setDescription(config.description)
.addStringOption(option => 
    option
    .setName("playlist")
    .setDescription("The name of the playlist you'd like to add a song to")
    .setRequired(true)    
)
.addStringOption(option =>
    option
    .setName("request")
    .setDescription("YouTube Search Request or Link")
    .setRequired(true)
)
.addStringOption(option => 
    option
    .setName("flags")
    .setDescription("Choose which flag to add to the command")
    .addChoices({ name: FLAGS.SERVER_PLAYLIST.name, value: FLAGS.SERVER_PLAYLIST.usageSymbol[0] })
);

export default AddSong;