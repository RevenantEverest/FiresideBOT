import { 
    AudioPlayerStatus, 
    createAudioPlayer, 
    createAudioResource,
    entersState
} from '@discordjs/voice';
import playdl from 'play-dl';
import ytdl from 'ytdl-core';
import distubeYtdl from '@distube/ytdl-core';

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

        await entersState(player, AudioPlayerStatus.Playing, 5e3);
    }
    catch(err) {
        const error = err as Error;

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

        dispatch.channel.send(`Error playing track, attempting to switch to audio package ${server.queue.audioSourcePackage.packageIndex + 2}/3 ...`);
    
        server.queue.audioSourcePackage.timesSwitched++;
        if(server.queue.audioSourcePackage.packageIndex === 2) {
            server.queue.audioSourcePackage.packageIndex = 0;
        }
        else {
            server.queue.audioSourcePackage.packageIndex++;
        }
        server.queue.audioSourcePackage.lastSwitched = Date.now();
        // server.queue.info.unshift(currentTrack);
        return stream(bot, dispatch, server);
    }
};

export async function createResource(server: Server) {
    const link = URLS.YOUTUBE_VIDEO + server.queue.info[0].videoId;
    const availableSources = [
        createYTDLResource,
        createPlayDLResource,
        createDistubeYTDLResource
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
    const source = ytdl(link, { filter: 'audioonly', quality: 'highestaudio', highWaterMark: 1<<25 });
    return source;
};

/**
 * Creates an audio source to pass to the `play-dl` package
 * @param link - string
 * @returns audio source
 */
export async function createPlayDLResource(link: string) {
    const source = await playdl.stream(link);
    return source.stream;
};

/**
 * Creates an audio source to pass to the `@distube/ytdl-core` package
 * @param link - string
 * @returns audio source
 */
export async function createDistubeYTDLResource(link: string) {
    const source = distubeYtdl(link, {
        quality: 'highestaudio',
        highWaterMark: 1 << 30,
        liveBuffer: 1 << 30,
    });

    return source;
};