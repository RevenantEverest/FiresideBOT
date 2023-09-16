import { Client } from 'discord.js';

import { SongInfo } from '../types/youtube.js';
import { HandleReturn } from '../types/promises.js';
import { CommandDispatch, CommandOptions } from '../types/commands.js';
import { Server } from '../types/server.js';
import { UserPlaylist } from '../types/entities/UserPlaylist.js';
import { GuildPlaylist } from '../types/entities/GuildPlaylist.js';
import { UserSong } from '../types/entities/UserSong.js';
import { GuildSong } from '../types/entities/GuildSong.js';
import { ApiPaginatedResponse } from '../types/api.js';

import * as api from '../api/index.js';

import { DEFAULTS, FLAGS, ERROR_MESSAGES } from '../constants/index.js';
import * as youtube from './youtube.js';
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

export async function requestSong(request: string): HandleReturn<SongInfo> {
    const isLink: boolean = await youtube.isValidLink(request);

    if(isLink) {
        const videoId = await youtube.extractVideoId(request);

        if(!videoId) {
            return [undefined, new Error("Invalid Video ID")];
        }

        request = videoId;        
    }

    const [youtubeSearchRes, youtubeSearchErr] = await youtube.handleSearch(request);

    if(youtubeSearchErr) {
        return [undefined, youtubeSearchErr];
    }

    return [youtubeSearchRes, undefined];
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