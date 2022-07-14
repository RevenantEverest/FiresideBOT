import { Client } from 'discord.js';
import { GuildMessage } from '../types/message.js';
import { Server } from '../types/server.js';

import * as audio from './audio.js';

export function nextInQueue(bot: Client, message: GuildMessage, server: Server) {
    if(!server.queue.player) return;

    try {
        server.queue.player.stop();
        
        if(server.queue.info.length > 0) {
            audio.stream(bot, message, server);
        }
        else {
            server.queue.playing = false;
            message.channel.send("Queue concluded");
        }
    }
    catch(err) {
        console.error(err);
    }
};