import { GuildResolvable } from 'discord.js';
import { GuildSong } from '../../../../entities/index.js';

export interface GuildSongMocks {
    hasPermission: Function,
    isGuildMember: Function,
    hasRole: Function,
    handleSearch: Function
};

export interface GuildSongExtraParams {
    mocks: GuildSongMocks,
    guildId: GuildResolvable,
    createdSong?: GuildSong
};