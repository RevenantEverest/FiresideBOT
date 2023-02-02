import { Client, GuildResolvable } from 'discord.js';
import { Server } from '../../../../types/server.js';
import { CommandDispatch, CommandFile, CommandOptions } from '../../../../types/commands.js';

import * as api from '../../../../api/index.js';

import { FLAGS } from '../../../../constants/index.js';
import { songRequests, flags, playlists, errors } from '../../../../utils/index.js';

export interface Params {
    bot: Client,
    dispatch: CommandDispatch,
    args: string[],
    server: Server,
    options: CommandOptions,
    guildId: GuildResolvable,
    playlistName: string,
    commandFile: CommandFile
};

async function viewSinglePlaylist({ bot, dispatch, args, server, options, guildId, playlistName, commandFile }: Params) {
    
    const argFlags = flags.getCommandArgFlags(dispatch, args);
    const [guildPlaylist, err] = await api.guildPlaylists.getByGuildIdAndName(dispatch, dispatch.guildId, playlistName);

    if(err) {
        if(err.response && err.response.status !== 500) {
            const responseData = err.response.data;
            return dispatch.reply(responseData.message);
        }
        
        return errors.command({ dispatch, err, errMessage: err.message, commandName: commandFile.displayName });
    }

    if(!guildPlaylist) {
        return dispatch.reply("No Playlist found");
    }

    if(flags.containsFlag(FLAGS.GUILD_PLAYLIST_ROLES, argFlags)) {
        const [roles, getRolesErr] = await api.guildPlaylistRoles.getByPlaylistId(dispatch, guildPlaylist.id, {
            page: 1
        });
    
        if(getRolesErr) {
            if(getRolesErr.response && getRolesErr.response.status !== 500) {
                const responseData = getRolesErr.response.data;
                return dispatch.reply(responseData.message);
            }
            
            return errors.command({ dispatch, err: getRolesErr, errMessage: getRolesErr.message, commandName: commandFile.displayName });
        }
    
        if(!roles) {
            return dispatch.reply("No playlist roles found");
        }
    }

    const [songs, getSongsErr] = await api.guildSongs.getByPlaylistId(dispatch, guildPlaylist, {
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

    if(!songs) {
        return dispatch.reply("No playlist songs found");
    }

    if(flags.containsFlag(FLAGS.INFO, argFlags)) {
        return playlists.sendSinglePlaylistEmbed({
            dispatch,
            commandFile,
            playlist: guildPlaylist,
            songs,
            setDescription: () => ``,
            setAuthor: () => ({
                iconURL: dispatch.guild.iconURL({ dynamic: true }) ?? "",
                name: `${dispatch.guild.name} - Server Playlists`
            }),
            isServerPlaylist: true
        });
    }

    return songRequests.playPlaylist({
        bot,
        dispatch,
        server,
        args, 
        playlist: guildPlaylist,
        songs,
        options,
        isServerPlaylist: true
    });
};

export default viewSinglePlaylist;