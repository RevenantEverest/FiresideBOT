import { Message, Guild } from 'discord.js';

export interface GuildMessage extends Message {
    guild: Guild,
    guildId: string
};