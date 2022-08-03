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
            server.queue.playing = false;
            dispatch.channel.send("Queue concluded");
        }
    }
    catch(err) {
        console.error(err);
    }
};