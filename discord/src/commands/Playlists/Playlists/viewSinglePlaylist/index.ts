import { Client, UserResolvable } from 'discord.js';
import { CommandDispatch, CommandFile, CommandOptions } from '../../../../types/commands.js';
import { Server } from '../../../../types/server.js';

import * as api from '../../../../api/index.js';

import { EMOJIS, FLAGS } from '../../../../constants/index.js';
import { songRequests, flags, playlists, errors } from '../../../../utils/index.js';

export interface Params {
    bot: Client,
    dispatch: CommandDispatch,
    args: string[],
    server: Server,
    options: CommandOptions,
    discordId: UserResolvable,
    playlistName: string,
    commandFile: CommandFile
};

async function viewSinglePlaylist({ bot, dispatch, args, server, options, discordId, playlistName, commandFile }: Params) {
    const [userPlaylist, err] = await api.userPlaylists.getByDiscordIdAndName(dispatch, discordId, playlistName);

    if(err) {
        if(err.response && err.response.status !== 500) {
            const responseData = err.response.data;
            return dispatch.reply(responseData.message);
        }
        
        return errors.command({ dispatch, err, errMessage: err.message, commandName: commandFile.displayName });
    }

    if(!userPlaylist) {
        return dispatch.reply("No Playlist found");
    }

    const [playlistSongs, getSongsErr] = await api.userSongs.getByPlaylistId(dispatch, userPlaylist, {
        page: 1
    });

    if(getSongsErr) {
        return errors.command({ 
            dispatch, 
            err: getSongsErr, 
            errMessage: getSongsErr.message, 
            commandName: commandFile.displayName
        });
    }

    if(!playlistSongs) {
        return dispatch.reply("No Playlist Songs found");
    }

    const argFlags = flags.getCommandArgFlags(dispatch, args);

    if(flags.containsFlag(FLAGS.INFO, argFlags)) {
        return playlists.sendSinglePlaylistEmbed({ 
            dispatch, 
            commandFile, 
            playlist: userPlaylist, 
            songs: playlistSongs,
            setDescription: () => `${userPlaylist?.is_public ? "Public" : `${EMOJIS.LOCKED}Private`}\n\u200b`,
            setAuthor: () => ({
                iconURL: dispatch.author.avatarURL({ dynamic: true }) ?? "",
                name: `${dispatch.author.username} #${dispatch.author.discriminator}`
            })
        });
    }

    return songRequests.playPlaylist({ 
        bot, 
        dispatch, 
        args,
        server, 
        options, 
        playlist: userPlaylist,
        songs: playlistSongs
    });
};

export default viewSinglePlaylist;