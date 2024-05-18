import type { UserResolvable } from 'discord.js';
import type { CommandDispatch } from '@@types/commands.js';
import type { HandleAxiosReturn } from '@@types/promises.js';
import type { GuildCurrencyRecord } from '@@types/entities/GuildCurrencyRecord.js';

import { ENV } from '@@constants/index.js';
import { apiRequests } from '@@utils/index.js';

const baseEndpoint = ENV.API_URL + "/economy/currency/records/guild";

export async function getByGuildIdAndDiscordId(dispatch: CommandDispatch, discordId: UserResolvable): HandleAxiosReturn<GuildCurrencyRecord> {
    const endpoint = `${baseEndpoint}/guild_id/${dispatch.guildId}/discord_id/${discordId}`;
    return apiRequests.request<GuildCurrencyRecord>({
        dispatch,
        endpoint,
        method: "get"
    });
};

export async function create(dispatch: CommandDispatch, discordId: UserResolvable): HandleAxiosReturn<GuildCurrencyRecord> {
    const endpoint = `${baseEndpoint}/guild_id/${dispatch.guildId}/discord_id/${discordId}`;
    return apiRequests.request<GuildCurrencyRecord, {  }>({
        dispatch,
        endpoint,
        method: "post"
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

export async function getOrSave(dispatch: CommandDispatch, discordId: UserResolvable): HandleAxiosReturn<GuildCurrencyRecord> {
    const [res, err] = await getByGuildIdAndDiscordId(dispatch, discordId);

    if(err || !res) {
        if(err?.response && err.response.status === 404) {
            return create(dispatch, discordId);
        }
        return [undefined, err];
    }

    return [res, undefined]; 
};