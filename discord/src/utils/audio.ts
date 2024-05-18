import { 
    AudioPlayerError, 
    AudioPlayerStatus, 
    createAudioPlayer, 
    createAudioResource,
    entersState
} from '@discordjs/voice';
import playdl from 'play-dl';
import ytdl from 'ytdl-core';

import type { Client } from 'discord.js';
import type { Server } from '@@types/server.js';
import type { CommandDispatch } from '@@types/commands.js';

import { URLS } from '@@constants/index.js';
import * as embeds from './embeds.js';
import * as queue from './queue.js';
import * as errors from './errors.js';

type BufferingTimeout = NodeJS.Timeout | null;

export async function stream(bot: Client, dispatch: CommandDispatch, server: Server) {
    if(!server.queue.connection) return;

    try {
        let bufferingTimer: BufferingTimeout = null;

        const connection = server.queue.connection;
        const resource = await createResource(server);        
        const player = server.queue.player ?? createAudioPlayer();

        server.queue.currentSongInfo = server.queue.info[0];
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
            if(bufferingTimer) {
                clearTimeout(bufferingTimer);
            }

            server.queue.playing = true;
            if(server.queue.disconnectTimer) {
                queue.handleDisconnectTimer(server, dispatch);
            }
        });

        player.on(AudioPlayerStatus.Buffering, () => {
            bufferingTimer = setTimeout(() => {
                dispatch.channel.send('Buffering...');
            }, 2000);
        });

        player.on("error", (err: AudioPlayerError) => {
            errors.logError({ err, errMessage: err.message, resourceName: "Audio Player - Player Error" });
            server.queue.playing = false;
        });

        await entersState(player, AudioPlayerStatus.Playing, 5e3);
    }
    catch(err) {
        const error = err as Error;
        errors.logError({ 
            err: error, 
            errMessage: error.message, 
            resourceName: "Audio Player - General Error"
        });
    }
};

export async function createResource(server: Server) {
    const link = URLS.YOUTUBE_VIDEO + server.queue.info[0].videoId;
    const source = ytdl(link, { filter: 'audioonly', quality: 'highestaudio', highWaterMark: 1<<25 });
    const resource = createAudioResource(source, {
        inlineVolume: true
    });

    if(resource.volume) {
        resource.volume.setVolume(server.queue.options.volume / 100);
    }

    return resource;
};