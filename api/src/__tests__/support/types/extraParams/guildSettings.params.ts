import { GuildResolvable } from 'discord.js';
import { GuildSettings } from '../../../../entities/index.js';

export interface GuildSettingsMocks {
    hasPermission: Function,
    isGuildMember: Function
};

export interface GuildSettingsExtraParams {
    mocks: GuildSettingsMocks,
    guildId: GuildResolvable,
    guildSettings?: GuildSettings
};