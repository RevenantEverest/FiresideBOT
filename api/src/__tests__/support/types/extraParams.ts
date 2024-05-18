import type { GuildResolvable } from 'discord.js';
import type { Mocks } from './mocks.js';

import type { 
    Fortune, 
    GuildCurrencyRecord, 
    GuildPlaylist, 
    GuildPlaylistRole, 
    GuildSettings, 
    GuildSong, 
    UserPlaylist, 
    UserSong 
} from '@@entities/index.js';

export interface ExtraParamsCommon {
    guildId: GuildResolvable
};

export interface ExtraParams<T, D, E, F> extends ExtraParamsCommon {
    mocks: T,
    entity?: D,
    supportEntities?: E[],
    extras?: F
};

/* Fortune */
export type FortuneMocks = Pick<Mocks, "hasPermission" | "isGuildMember">;
export type FortuneExtraParams<T = any, D = undefined> = (
    ExtraParams<FortuneMocks, Fortune, T, D>
);

/* Guild Playlist */
export type GuildPlaylistMocks = Pick<Mocks, "hasPermission" | "isGuildMember">;
export type GuildPlaylistExtraParams<T = any, D = undefined> = (
    ExtraParams<GuildPlaylistMocks, GuildPlaylist, T, D>
);

/* Guild Playlist Role */
export type GuildPlaylistRoleMocks = Pick<Mocks, "hasPermission" | "isGuildMember">;
export type GuildPlaylistRoleExtraParams<T = any, D = undefined> = (
    ExtraParams<GuildPlaylistRoleMocks, GuildPlaylistRole, T, D>
);

/* Guild Setting */
export type GuildSettingMocks = Pick<Mocks, "hasPermission" | "isGuildMember">;
export type GuildSettingsExtraParams<T = any, D = undefined> = ( // Might need alt guildId
    ExtraParams<GuildSettingMocks, GuildSettings, T, D>
); 

/* Guild Song */
export type GuildSongMocks = Pick<Mocks, "hasPermission" | "isGuildMember" | "hasRole" | "handleSearch">;
export type GuildSongExtraParams<T = any, D = undefined> = (
    ExtraParams<GuildSongMocks, GuildSong, T, D>
);

/* Guild Currency Record */
export type GuildCurrencyRecordMocks = Pick<Mocks, "hasPermission" | "isGuildMember">;
export type GuildCurrencyRecordExtraParams<T = any, D = undefined> = (
    ExtraParams<GuildCurrencyRecordMocks, GuildCurrencyRecord, T, D>
);

/* User Playlist */
export type UserPlaylistMocks = undefined | null;
export type UserPlaylistExtraParams<T = any, D = undefined> = (
    ExtraParams<UserPlaylistMocks, UserPlaylist, T, D>
);

/* User Song */
export type UserSongMocks = Pick<Mocks, "handleSearch">;
export type UserSongExtraParams<T = any, D = undefined> = ExtraParams<UserSongMocks, UserSong, T, D>;