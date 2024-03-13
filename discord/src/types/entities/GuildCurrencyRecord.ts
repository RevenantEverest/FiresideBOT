import { GuildResolvable, UserResolvable } from 'discord.js';

export interface GuildCurrencyRecord {
    id: number,
    guild_id: GuildResolvable,
    discord_id: UserResolvable,
    balance: string
};