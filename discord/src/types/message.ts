import { Message, Guild, GuildMember } from 'discord.js';

export interface GuildMessage extends Message {
    guild: Guild,
    guildId: string,
    member: GuildMember
};