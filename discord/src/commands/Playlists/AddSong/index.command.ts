import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandParams, CommandConfigParams } from '../../../types/commands.js';

import * as api from '../../../api/index.js';
import { ERROR_MESSAGES } from '../../../constants/index.js';
import { errors } from'../../../utils/index.js';

async function AddSong({ bot, args, dispatch, commandFile }: CommandParams) {
    const interaction = dispatch.interaction;

    if(!interaction && !args[0]) {
        return dispatch.reply(ERROR_MESSAGES.COMMANDS.ADD_SONG.NO_ARGS);
    }

    const playlistName = dispatch.interaction?.options.getString("playlist") ?? args[0];
    args.splice(0, 1); // Remove PlaylistName from args
    const [userPlaylist, getErr] = await api.userPlaylists.getByDiscordIdAndName(dispatch, dispatch.author.id, playlistName);

    if(getErr) {
        if(getErr.response && getErr.response.status !== 500) {
            const responseData = getErr.response.data;
            return dispatch.reply(responseData.message);
        }
        
        return errors.command({ bot, dispatch, err: getErr, errMessage: getErr.message, commandName: commandFile.displayName });
    }

    if(!userPlaylist) {
        return dispatch.reply("No Playlist found");
    }

    let request = dispatch.interaction?.options.getString("request") || args.join(" ");
    const [userSong, err] = await api.userSongs.create(dispatch, { playlist_id: userPlaylist.id, request });

    if(err) {
        if(err.response && err.response.status !== 500) {
            const responseData = err.response.data;
            return dispatch.reply(responseData.message);
        }

        return errors.command({ bot, dispatch, err, errMessage: err.message, commandName: commandFile.displayName });
    }

    if(!userSong) {
        return dispatch.reply("No playlist returned");
    }

    return dispatch.reply(`**${userSong.title}** added to playlist **${userPlaylist.name}** with ID: **${userSong.id}**`);
};

export const config: CommandConfigParams = {
    aliases: ['as'],
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

export default AddSong;