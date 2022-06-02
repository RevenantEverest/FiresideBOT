import { GuildResolvable } from 'discord.js';
import { GuildPlaylist } from '../../../../entities/index.js';

export interface GuildPlaylistMocks {
    hasPermission: Function,
    isGuildMember: Function
};

export interface GuildPlaylistExtraParams {
    mocks: GuildPlaylistMocks,
    guildId: GuildResolvable,
    createdPlaylist?: GuildPlaylist
};