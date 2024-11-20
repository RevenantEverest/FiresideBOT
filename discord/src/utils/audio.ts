import { 
    AudioPlayerStatus, 
    createAudioPlayer, 
    createAudioResource,
    entersState
} from '@discordjs/voice';
import { YtdlCore, toPipeableStream } from '@ybd-project/ytdl-core';

import type { Client } from 'discord.js';
import type { Server } from '@@types/server.js';
import type { CommandDispatch } from '@@types/commands.js';

import { URLS } from '@@constants/index.js';
import * as embeds from './embeds.js';
import * as queue from './queue.js';
import * as errors from './errors.js';
import dayjs from 'dayjs';

type BufferingTimeout = NodeJS.Timeout | null;

export async function stream(bot: Client, dispatch: CommandDispatch, server: Server) {
    if(!server.queue.connection) return;

    const maxRetries = 3; // This number should correlate with availableSources length
    let retryCount = 0;

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

        player.removeAllListeners();

        player.on(AudioPlayerStatus.Idle, () => {
            // Potentially fixes memory leak issues due to not clearing bufferingTimer
            if (bufferingTimer) {
                clearTimeout(bufferingTimer);
                bufferingTimer = null;
            }

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

        await entersState(player, AudioPlayerStatus.Playing, 5e3);

        retryCount = 0;
    }
    catch(err) {
        const error = err as Error;

        if(retryCount >= maxRetries) {
            server.queue.playing = false;
            server.queue.connection.destroy();

            return errors.sendErrorEmbed({
                dispatch,
                errMessage: "Max reties reached",
                resourceName: "Audio Player - General Error",
                isUtility: true
            });
        }

        retryCount++;
        
        const timesSwitched = server.queue.audioSourcePackage.timesSwitched;
        const timeAvailableToSwitch = dayjs(server.queue.audioSourcePackage.lastSwitched).add(30, "minutes");
        if(timesSwitched % 3 === 0 && timesSwitched !== 0 && dayjs().isBefore(timeAvailableToSwitch)) {
            server.queue.playing = false;
            return errors.sendErrorEmbed({
                dispatch,
                errMessage: error.message,
                resourceName: "Audio Player - General Error",
                isUtility: true
            });
        }

        server.queue.audioSourcePackage.timesSwitched++;

        dispatch.channel.send(`Error playing track, attempting to switch to audio package ${server.queue.audioSourcePackage.packageIndex + 1}/3 ...`);
    
        if(server.queue.audioSourcePackage.packageIndex === 2) {
            server.queue.audioSourcePackage.packageIndex = 0;
        }
        else {
            server.queue.audioSourcePackage.packageIndex++;
        }
        server.queue.audioSourcePackage.lastSwitched = Date.now();
        
        return stream(bot, dispatch, server);
    }
};

export async function createResource(server: Server) {
    const link = URLS.YOUTUBE_VIDEO + server.queue.info[0].videoId;

    /* The methods related to the audio packageIndex key */
    const availableSources = [
        createYTDLResource
    ];

    const source = await availableSources[server.queue.audioSourcePackage.packageIndex](link);
    const resource = createAudioResource(source, {
        inlineVolume: true
    });

    if(resource.volume) {
        resource.volume.setVolume(server.queue.options.volume / 100);
    }

    return resource;
};

/**
 * Creates an audio source to pass to the `ytdl-core` package
 * @param link - string
 * @returns audio source
 */
export async function createYTDLResource(link: string) {
    const ytdl = new YtdlCore({
        filter: 'audioonly', quality: 'highestaudio', highWaterMark: 1<<25
    });
    const source = await ytdl.download(link);
    return toPipeableStream(source);
};