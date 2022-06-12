import { GuildResolvable } from 'discord.js';
import { SongInfo } from './youtube';

export interface ServerQueueOptions {
    volume: number,
    loop: boolean,
    recommendations: boolean,
    voteToSkip: boolean
};

export interface ServerQueue {
    playing: boolean,
    info: SongInfo[],
    currentSongInfo?: SongInfo,
    currentSongEmbed: [],
    genres: string[],
    options: ServerQueueOptions
};

export interface Server {
    id: string | number | GuildResolvable,
    premium: boolean,
    queue: ServerQueue
};