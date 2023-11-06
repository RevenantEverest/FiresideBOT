import type { GuildResolvable } from 'discord.js';
import type { Mocks } from './mocks.js';

import type { Fortune, GuildPlaylist, GuildPlaylistRole, GuildSettings, GuildSong, UserPlaylist, UserSong } from '@@entities/index.js';

export interface ExtraParamsCommon {
    guildId: GuildResolvable
};

export interface ExtraParams<T, D, E, F> extends ExtraParamsCommon {
    mocks: T,
    entity?: D,
    supportEntities?: E[],
    extras?: F
};

/* Specific ExtraParams */
export type FortuneExtraParams<T = any, D = undefined> = ExtraParams<Pick<Mocks, "hasPermission" | "isGuildMember">, Fortune, T, D>;
export type GuildPlaylistExtraParams<T = any, D = undefined> = ExtraParams<Pick<Mocks, "hasPermission" | "isGuildMember">, GuildPlaylist, T, D>;
export type GuildPlaylistRoleExtraParams<T = any, D = undefined> = ExtraParams<Pick<Mocks, "hasPermission" | "isGuildMember">, GuildPlaylistRole, T, D>;
export type GuildSettingsExtraParams<T = any, D = undefined> = ExtraParams<Pick<Mocks, "hasPermission" | "isGuildMember">, GuildSettings, T, D>; // Might need alt guildId
export type GuildSongExtraParams<T = any, D = undefined> = ExtraParams<Pick<Mocks, "hasPermission" | "isGuildMember" | "hasRole" | "handleSearch">, GuildSong, T, D>;
export type UserPlaylistExtraParams<T = any, D = undefined> = ExtraParams<undefined | null, UserPlaylist, T, D>;
export type UserSongExtraParams<T = any, D = undefined> = ExtraParams<Pick<Mocks, "handleSearch">, UserSong, T, D>;