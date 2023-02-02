import { GuildResolvable } from 'discord.js';

import { GuildSong } from './GuildSong.js';
import { GuildPlaylistRole } from './GuildPlaylistRole.js';

export interface GuildPlaylistCommon {
    id: number,
    guild_id: GuildResolvable
}

export interface GuildPlaylist extends GuildPlaylistCommon {
    name: string,
    created_at: Date,
    updated_at: Date,
    duration: number,
    songCount: number,
    songs?: GuildSong[],
    roles?: GuildPlaylistRole[]
};

export interface GuildPlaylistUpdate extends GuildPlaylistCommon {
    name?: string
}