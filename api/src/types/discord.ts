import { PermissionResolvable, GuildResolvable, UserResolvable, TextChannel } from 'discord.js';

export type TextChannelReturn = Promise<[TextChannel | undefined, Error | undefined]>;

export interface CheckGuildMemberPermissionsOptions {
    guildId: GuildResolvable,
    discordId: UserResolvable,
    permission: PermissionResolvable
};