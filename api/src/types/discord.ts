import { PermissionResolvable, TextChannel } from 'discord.js';

export type TextChannelReturn = Promise<[TextChannel | undefined, Error | undefined]>;

export interface CheckGuildMemberPermissionsOptions {
    guildId: string,
    discordId: string,
    permission: PermissionResolvable
};