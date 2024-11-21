import { Client } from 'discord.js';

import type { SongInfo } from '@@types/youtube.js';
import type { HandleReturn } from '@@types/promises.js';
import type { CommandDispatch, CommandOptions } from '@@types/commands.js';
import type { Server } from '@@types/server.js';
import type { UserPlaylist } from '@@types/entities/UserPlaylist.js';
import type { GuildPlaylist } from '@@types/entities/GuildPlaylist.js';
import type { UserSong } from '@@types/entities/UserSong.js';
import type { GuildSong } from '@@types/entities/GuildSong.js';
import type { ApiPaginatedResponse } from '@@types/api.js';

import * as api from '@@api/index.js';

import { DEFAULTS, FLAGS, ERROR_MESSAGES } from '@@constants/index.js';
import * as arrays from './arrays.js';
import * as flags from './flags.js';
import * as voiceConnection from './voiceConnection.js';

interface PlayPlaylistParams {
    bot: Client,
    dispatch: CommandDispatch,
    server: Server,
    args: string[],
    playlist: UserPlaylist | GuildPlaylist,
    songs: ApiPaginatedResponse<UserSong | GuildSong>,
    options: CommandOptions,
    isServerPlaylist?: boolean
};

export async function requestSong(dispatch: CommandDispatch, request: string): HandleReturn<SongInfo> {
    return api.youtubeUtils.search(dispatch, request);
};

export async function playPlaylist({ bot, dispatch, server, args, playlist, songs, options, isServerPlaylist }: PlayPlaylistParams) {
    if(!dispatch.member.voice.channel) {
        return dispatch.reply(ERROR_MESSAGES.COMMANDS.NOT_IN_VOICE_CHANNEL);
    }

    if(options.updatePending) {
        return dispatch.reply(ERROR_MESSAGES.UPDATE_PENDING);
    }

    const argFlags = flags.getCommandArgFlags(dispatch, args);
    const apiPageAmount = Math.ceil(songs.count / DEFAULTS.API_PAGINATION.LIMIT);
    
    for(let i = 1; i < apiPageAmount; i++) {
        const params = { page: i + 1 };
        
        const userPlaylistRequest = api.userSongs.getByPlaylistId(dispatch, (playlist as UserPlaylist), params);
        const guildPlaylistRequest = api.guildSongs.getByPlaylistId(dispatch, (playlist as GuildPlaylist), params);

        const [songsPage] = isServerPlaylist ? await guildPlaylistRequest : await userPlaylistRequest;

        if(songsPage) {
            songs.results = songs.results.concat(songsPage.results);
        }
    }

    if(flags.containsFlag(FLAGS.SHUFFLE, argFlags)) {
        songs.results = arrays.shuffle(songs.results);
    }

    for(let i = 0; i < songs.results.length; i++) {
        const song = songs.results[i];

        server.queue.info.push({
            videoId: song.video_id,
            title: song.title,
            author: song.author,
            duration: song.duration,
            thumbnail_url: song.thumbnail_url,
            requestedBy: `${dispatch.author.username} #${dispatch.author.discriminator}`
        });
    }

    const playlistType = isServerPlaylist ? "Server Playlist" : "Playlist";
    dispatch.reply(`${playlistType} **${playlist.name}** was added to the queue`);

    if(!server.queue.playing) {
        return voiceConnection.createConnection(bot, dispatch, server, true);
    }
};