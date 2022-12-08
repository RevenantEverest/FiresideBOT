import { Client } from 'discord.js';
import { CommandDispatch, CommandOptions } from '../../../../types/commands.js';
import { Server } from '../../../../types/server.js';
import { UserPlaylist } from '../../../../types/entities/UserPlaylist.js';
import { ApiPaginatedResponse } from '../../../../types/api.js';

import { DEFAULTS, ERROR_MESSAGES } from '../../../../constants/index.js';
import { arrays, voiceConnection } from '../../../../utils/index.js';

import * as api from '../../../../api/index.js';
import { UserSong } from 'src/types/entities/UserSong.js';

interface Params {
    bot: Client,
    dispatch: CommandDispatch,
    args: string[],
    server: Server,
    playlist: UserPlaylist,
    songs: ApiPaginatedResponse<UserSong>,
    options: CommandOptions
};

async function requestPlaylist({ bot, dispatch, args, server, playlist, songs, options }: Params) {

    if(!dispatch.member.voice.channel) {
        return dispatch.reply(ERROR_MESSAGES.COMMANDS.NOT_IN_VOICE_CHANNEL);
    }

    if(options.updatePending) {
        return dispatch.reply(ERROR_MESSAGES.UPDATE_PENDING);
    }

    const apiPageAmount = Math.ceil(songs.count / DEFAULTS.API_PAGINATION.LIMIT);
    for(let i = 1; i < apiPageAmount; i++) {
        const [songsPage] = await api.userSongs.getByPlaylistId(dispatch, playlist, { page: i + 1 });

        if(songsPage) {
            songs.results = songs.results.concat(songsPage.results);
        }
    }

    if(args.includes("-s")) {
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

    dispatch.reply(`Playlist **${playlist.name}** was added to the queue`);

    if(!server.queue.playing) {
        return voiceConnection.createConnection(bot, dispatch, server, true);
    }
};

export default requestPlaylist;