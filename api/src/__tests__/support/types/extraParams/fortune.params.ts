import { GuildResolvable } from 'discord.js';
import { Fortune } from '../../../../entities/index.js';

export interface FortuneMocks {
    hasPermission: Function,
    isGuildMember: Function
};

export interface FortuneExtraParams {
    mocks: FortuneMocks,
    guildId: GuildResolvable,
    createdFortune?: Fortune
};