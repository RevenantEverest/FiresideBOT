import { UserResolvable } from 'discord.js';

import { CommandDispatch } from '../../types/commands.js';
import { HandleAxiosReturn } from '../../types/promises.js';
import { ApiPaginatedResponse, ApiPaginationParams } from '../../types/api.js';

import { GuildCurrencyRecord } from '../../types/entities/GuildCurrencyRecord.js';

import { ENV } from '../../constants/index.js';
import { apiRequests } from '../../utils/index.js';

const baseEndpoint = ENV.API_URL + "/economy/currency/records/guild";

export async function getByGuildIdAndDiscordId(dispatch: CommandDispatch, discordId: UserResolvable): HandleAxiosReturn<GuildCurrencyRecord> {
    const endpoint = `${baseEndpoint}/guild_id/${dispatch.guildId}/discord_id/${discordId}`;
    return apiRequests.request<GuildCurrencyRecord>({
        dispatch,
        endpoint,
        method: "get"
    });
};

export async function update(dispatch: CommandDispatch, discordId: UserResolvable, balance: string): HandleAxiosReturn<GuildCurrencyRecord> {
    const endpoint = `${baseEndpoint}/guild_id/${dispatch.guildId}/discord_id/${discordId}`;
    return apiRequests.request<GuildCurrencyRecord, { balance: string }>({
        dispatch,
        endpoint,
        method: "put",
        data: {
            balance
        }
    });
};