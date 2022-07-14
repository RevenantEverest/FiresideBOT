import { joinVoiceChannel, entersState, VoiceConnectionStatus } from '@discordjs/voice';

import { Client } from 'discord.js';
import { GuildMessage } from 'src/types/message';
import { Server } from 'src/types/server';

import * as audio from './audio.js';

export function createConnection(bot: Client, message: GuildMessage, server: Server,) {
    if(!server.queue.connection) {
        if(!message.member.voice.channel) {
            return message.reply("Voice Channel is unavailable");
        }

        if(!message.member.voice.channel.joinable) {
            return message.reply("Fireside is unable to join this voice channel");
        }

        const connection = joinVoiceChannel({
            guildId: message.guildId,
            channelId: message.member.voice.channel.id,
            adapterCreator: message.guild.voiceAdapterCreator
        });

        server.queue.connection = connection;
    }

    handleConnection(server);

    return audio.stream(bot, message, server);
};

export function handleConnection(server: Server) {
    if(!server.queue.connection) return;

    const connection = server.queue.connection;

    connection.on(VoiceConnectionStatus.Disconnected, async (oldState, newState) => {
        try {
            await entersState(connection, VoiceConnectionStatus.Signalling, 5_000);
            await entersState(connection, VoiceConnectionStatus.Connecting, 5_000);
        }
        catch(err) {
            connection.destroy();
            console.error(err);
        }
    });

    connection.on(VoiceConnectionStatus.Destroyed, async () => {
        server.queue.info = [];
    });
};