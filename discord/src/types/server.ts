import { GuildResolvable, MessageEmbed } from 'discord.js';
import { AudioResource, AudioPlayer, VoiceConnection } from '@discordjs/voice';
import { SongInfo } from './youtube';

export interface ServerQueueOptions {
    volume: number,
    loop: boolean,
    recommendations: boolean,
    voteToSkip: boolean
};

export interface ServerSongInfo extends SongInfo {
    requestedBy: string
}

export interface ServerQueue {
    playing: boolean,
    isPaused: boolean,
    info: ServerSongInfo[],
    currentSongInfo: ServerSongInfo | null,
    currentSongEmbed: MessageEmbed | null,
    genres: string[],
    options: ServerQueueOptions,
    connection: VoiceConnection | null,
    resource: AudioResource | null,
    player: AudioPlayer | null,
    disconnectTimer: NodeJS.Timeout | null
};

export interface Server {
    id: string | number | GuildResolvable,
    premium: boolean,
    queue: ServerQueue
};