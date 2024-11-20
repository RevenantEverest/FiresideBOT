import type { GuildResolvable } from 'discord.js';
import type { CommandDispatch } from '@@types/commands.js';
import type { GuildSettings } from '@@types/entities/GuildSettings.js';
import type { HandleAxiosReturn } from '@@types/promises.js';

import { ENV } from '@@constants/index.js';
import { apiRequests } from '@@utils/index.js';

const baseEndpoint = ENV.API_URL + "/settings/guild";

export async function get(dispatch: CommandDispatch): HandleAxiosReturn<GuildSettings> {
    const endpoint = `${baseEndpoint}/${dispatch.guildId}`;
    return apiRequests.request<GuildSettings>({
        dispatch,
        endpoint,
        method: "get"
    });
};

export async function getOrSave(dispatch: CommandDispatch): HandleAxiosReturn<GuildSettings> {

    const [res, err] = await get(dispatch);

    if(res) {
        return [res, undefined];
    }

    if(err && err.response?.status !== 404) {
        return [undefined, err];
    }

    const endpoint = `${baseEndpoint}/${dispatch.guildId}`;
    return apiRequests.request<GuildSettings>({
        dispatch,
        endpoint,
        method: "post"
    });
};

export async function update(guildId: GuildResolvable, dispatch: CommandDispatch, guildSettings: GuildSettings): HandleAxiosReturn<GuildSettings> {
    const endpoint = `${baseEndpoint}/${guildId}`;
    return apiRequests.request<GuildSettings, GuildSettings>({
        dispatch,
        endpoint,
        method: "put",
        data: guildSettings
    });
};