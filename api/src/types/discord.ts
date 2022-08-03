import { PermissionResolvable, GuildResolvable, UserResolvable, TextChannel, RoleResolvable } from 'discord.js';

export type TextChannelReturn = Promise<[TextChannel | undefined, Error | undefined]>;

export interface CheckGuildMemberPermissionsOptions {
    guildId: GuildResolvable,
    discordId: UserResolvable,
    permission: PermissionResolvable
};

export interface GuildMemberOptions {
    guildId: GuildResolvable,
    discordId: UserResolvable
};

export interface HasRoleOptions {
    guildId: GuildResolvable,
    roles: RoleResolvable[],
    discordId: UserResolvable
};