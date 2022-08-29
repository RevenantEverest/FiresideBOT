import { Client } from 'discord.js';
import { CommandDispatch } from '../types/commands.js';
import { Server } from '../types/server.js';

import * as audio from './audio.js';

export function nextInQueue(bot: Client, dispatch: CommandDispatch, server: Server) {
    if(!server.queue.player) return;

    try {
        server.queue.player.stop();
        
        if(server.queue.info.length > 0) {
            audio.stream(bot, dispatch, server);
        }
        else {
            resetQueue(server);
            handleDisconnectTimer(server);
            dispatch.channel.send("Queue concluded");
        }
    }
    catch(err) {
        console.error(err);
    }
};

export function handleDisconnectTimer(server: Server) {
    if(server.queue.disconnectTimer) {
        clearTimeout(server.queue.disconnectTimer);
        server.queue.disconnectTimer = null;
    }

    if(server.queue.playing) return;

    server.queue.disconnectTimer = setTimeout(() => {
        return resetQueue(server, true);
    }, 10000);
};

export function resetQueue(server: Server, withConnection?: boolean) {
    server.queue = {
        ...server.queue,
        playing: false,
        isPaused: false,
        info: [],
        currentSongInfo: null,
        currentSongEmbed: null,
        genres: [],
        player: null,
        resource: null
    };

    if(withConnection) {
        if(server.queue.connection && server.queue.connection.state.status !== "destroyed") {
            server.queue.connection.destroy();
        }

        server.queue.connection = null;
    }
};