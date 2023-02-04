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