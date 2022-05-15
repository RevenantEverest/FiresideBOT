import { GuildResolvable } from 'discord.js';
import { 
    UserPlaylist, 
    UserSong, 
    GuildPlaylist, 
    GuildPlaylistRole
} from '../../../entities/index.js';

/* User Playlist */
export interface UserPlaylistExtraParams {
    createdPlaylist?: UserPlaylist
};

/* User Songs */
export interface UserSongMocks {
    handleSearch: Function
};

export interface UserSongExtraParams {
    mocks: UserSongMocks,
    createdSong?: UserSong
};

/* Guild Playlist */
export interface GuildPlaylistMocks {
    hasPermission: Function,
    isGuildMember: Function
};

export interface GuildPlaylistExtraParams {
    mocks: GuildPlaylistMocks,
    guildId: GuildResolvable,
    createdPlaylist?: GuildPlaylist
};

/* Guild Playlist Roles */
export interface GuildPlaylistRoleMocks {
    hasPermission: Function,
    isGuildMember: Function
};

export interface GuildPlaylistRoleExtraParams {
    mocks: GuildPlaylistRoleMocks,
    guildId: GuildResolvable,
    guildPlaylistRole?: GuildPlaylistRole
};