import { joinVoiceChannel, entersState, VoiceConnectionStatus, DiscordGatewayAdapterCreator } from '@discordjs/voice';

import { Client } from 'discord.js';
import { CommandDispatch } from '../types/commands.js';
import { Server } from '../types/server.js';

import * as audio from './audio.js';
import * as errors from './errors.js';
import * as queue from './queue.js';

export function createConnection(bot: Client, dispatch: CommandDispatch, server: Server,  deferredReply?: boolean) {
    if(!server.queue.connection) {
        if(!dispatch.member.voice.channel) {
            return dispatch.reply("Voice Channel is unavailable", deferredReply);
        }

        if(!dispatch.member.voice.channel.joinable) {
            return dispatch.reply("Fireside is unable to join this voice channel", deferredReply);
        }

        const connection = joinVoiceChannel({
            guildId: (dispatch.guildId as string),
            channelId: dispatch.member.voice.channel.id,
            adapterCreator: dispatch.member.voice.channel.guild.voiceAdapterCreator as DiscordGatewayAdapterCreator
        });

        server.queue.connection = connection;
    }

    handleConnection(server);

    return audio.stream(bot, dispatch, server);
};

export function handleConnection(server: Server) {
    if(!server.queue.connection) return;

    const connection = server.queue.connection;

    connection.on(VoiceConnectionStatus.Disconnected, async (oldState, newState) => {
        try {
            const statePromises = [
                entersState(connection, VoiceConnectionStatus.Signalling, 5_000),
                entersState(connection, VoiceConnectionStatus.Connecting, 5_000)
            ];

            await Promise.race(statePromises);
        }
        catch(err) {
            const error = err as Error;
            connection.destroy();
            server.queue.connection = null;
            errors.internal({ err: error, errMessage: error.message, resourceName: "VoiceConnection - HandleConnection" });
        }
    });

    /* 
        3/7/23 - Workaround change related to: 
        https://github.com/Androz2091/discord-player/issues/1630#issuecomment-1452877967
    */
    connection.on('stateChange', (oldState, newState) => {
        const oldNetworking = Reflect.get(oldState, 'networking');
        const newNetworking = Reflect.get(newState, 'networking');
      
        const networkStateChangeHandler = (oldNetworkState: any, newNetworkState: any) => {
          const newUdp = Reflect.get(newNetworkState, 'udp');
          clearInterval(newUdp?.keepAliveInterval);
        }
      
        oldNetworking?.off('stateChange', networkStateChangeHandler);
        newNetworking?.on('stateChange', networkStateChangeHandler);
    });

    connection.on(VoiceConnectionStatus.Destroyed, () => queue.resetQueue(server, true));
};