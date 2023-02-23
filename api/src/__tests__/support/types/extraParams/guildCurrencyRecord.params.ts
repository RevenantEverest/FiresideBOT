import { GuildResolvable } from 'discord.js';
import { GuildCurrencyRecord } from '../../../../entities/index.js';

export interface GuildCurrencyRecordMocks {
    hasPermission: Function,
    isGuildMember: Function
};

export interface GuildCurrencyRecordExtraParams {
     mocks: GuildCurrencyRecordMocks,
     guildId: GuildResolvable,
     createdRecord?: GuildCurrencyRecord
};