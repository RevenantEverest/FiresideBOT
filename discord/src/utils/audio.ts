import { 
    AudioPlayerError, 
    AudioPlayerStatus, 
    createAudioPlayer, 
    createAudioResource,
    entersState
} from '@discordjs/voice';
import ytdl from 'ytdl-core';
import DYTDL from 'discord-ytdl-core';

import { Client } from 'discord.js';
import { Server } from 'src/types/server.js';
import { GuildMessage } from '../types/message.js';

import { URLS } from '../constants/index.js';
import * as embeds from './embeds.js';
import * as queue from './queue.js';

export async function stream(bot: Client, message: GuildMessage, server: Server) {
    if(!server.queue.connection) return;

    try {
        const connection = server.queue.connection;
        const resource = createResource(server);        
        const player = createAudioPlayer();

        server.queue.resource = resource;
        server.queue.player = player;

        connection.subscribe(player);
        player.play(resource);

        embeds.createCurrentSongEmbed(message, server);

        player.on(AudioPlayerStatus.Idle, () => {
            if(!server.queue.playing) return;

            queue.nextInQueue(bot, message, server);
        });

        player.on(AudioPlayerStatus.Playing, () => {
            server.queue.playing = true;
            server.queue.info.shift();
        });

        player.on(AudioPlayerStatus.Buffering, () => {
            message.channel.send("Buffering...");
        });

        player.on("error", (err: AudioPlayerError) => {
            server.queue.playing = false;
            console.log(err);
        });

        await entersState(player, AudioPlayerStatus.Playing, 5e3);
    }
    catch(err) {
        console.error(err);
    }
};

export function createResource(server: Server) {
    const options: ytdl.downloadOptions = {
        filter: "audioonly",
        highWaterMark: 1<<62,
        liveBuffer: 1 << 62,
        dlChunkSize: 0,
        quality: "lowestaudio"
    };

    const link = URLS.YOUTUBE_VIDEO + server.queue.info[0].videoId;
    const resource = createAudioResource(ytdl(link, options), {
        inlineVolume: true
    });

    if(resource.volume) {
        resource.volume.setVolume(server.queue.options.volume / 100);
    }

    return resource;
};