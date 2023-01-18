import { 
    AudioPlayerError, 
    AudioPlayerStatus, 
    createAudioPlayer, 
    createAudioResource,
    entersState
} from '@discordjs/voice';
import playdl from 'play-dl';
import ytdl from 'ytdl-core';
import DYTDL from 'discord-ytdl-core';

import { Client } from 'discord.js';
import { Server } from 'src/types/server.js';
import { CommandDispatch } from '../types/commands.js';

import { URLS } from '../constants/index.js';
import * as embeds from './embeds.js';
import * as queue from './queue.js';

export async function stream(bot: Client, dispatch: CommandDispatch, server: Server) {
    if(!server.queue.connection) return;

    try {
        const connection = server.queue.connection;
        const resource = await createResource(server);        
        const player = server.queue.player ?? createAudioPlayer();

        server.queue.resource = resource;
        server.queue.player = player;

        connection.subscribe(player);
        player.play(resource);

        embeds.createCurrentSongEmbed(dispatch, server);
        server.queue.info.shift();

        player.on(AudioPlayerStatus.Idle, () => {
            if(!server.queue.playing) return;

            queue.nextInQueue(bot, dispatch, server);
        });

        player.on(AudioPlayerStatus.Playing, () => {
            server.queue.playing = true;
            if(server.queue.disconnectTimer) {
                queue.handleDisconnectTimer(server, dispatch);
            }
        });

        player.on(AudioPlayerStatus.Buffering, () => {
            /*

                Create timeout similar to hanelDisconnectTimer
                that checks for 2 seconds to pass before posting the buffering message

            */
        });

        player.on("error", (err: AudioPlayerError) => {
            server.queue.playing = false;
        });

        await entersState(player, AudioPlayerStatus.Playing, 5e3);
    }
    catch(err) {
        console.error(err);
    }
};

export async function createResource(server: Server) {
    const options: ytdl.downloadOptions = {
        filter: "audioonly",
        highWaterMark: 1<<62,
        liveBuffer: 1 << 62,
        dlChunkSize: 0,
        quality: "lowestaudio"
    };

    const link = URLS.YOUTUBE_VIDEO + server.queue.info[0].videoId;
    const source = await playdl.stream(link);
    const resource = createAudioResource(source.stream, {
        inputType: source.type,
        inlineVolume: true
    });
    // const resource = createAudioResource(ytdl(link, options), {
    //     inlineVolume: true
    // });

    if(resource.volume) {
        resource.volume.setVolume(server.queue.options.volume / 100);
    }

    return resource;
};