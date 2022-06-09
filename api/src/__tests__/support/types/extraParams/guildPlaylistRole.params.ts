import { GuildResolvable } from 'discord.js';
import { GuildPlaylistRole } from '../../../../entities/index.js';

export interface GuildPlaylistRoleMocks {
    hasPermission: Function,
    isGuildMember: Function
};

export interface GuildPlaylistRoleExtraParams {
    mocks: GuildPlaylistRoleMocks,
    guildId: GuildResolvable,
    guildPlaylistRole?: GuildPlaylistRole
};