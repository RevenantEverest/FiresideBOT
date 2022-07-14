import axios, { AxiosResponse } from 'axios';
import { Message } from 'discord.js';
import { GuildSettings } from '../../types/entities/GuildSettings.js';
import { HandleReturn } from '../../types/promises.js';

import { issueToken } from '../../middleware/index.js';

import { ENV } from '../../constants/index.js';
import { promises } from '../../utils/index.js';

const baseEndpoint = ENV.API_URL + "/settings/guild";

export async function get(guildId: string, message: Message): HandleReturn<GuildSettings> {
    const token = await issueToken(message);
    
    const request = axios.get(`${baseEndpoint}/${guildId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const [res, err] = await promises.handle<AxiosResponse>(request);

    if(err) {
        return [undefined, err];
    }

    if(!res || !res.data.results) {
        return [undefined, new Error("No Guild Settings Returned")];
    }

    return [(res.data.results as GuildSettings), undefined];
};

export async function update(guildId: string, message: Message, guildSettings: GuildSettings): HandleReturn<GuildSettings> {
    const token = await issueToken(message);

    const request = axios.put(`${baseEndpoint}/${guildId}`, guildSettings, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const [res, err] = await promises.handle<AxiosResponse>(request);

    if(err) {
        return [undefined, err];
    }

    if(!res || !res.data.results) {
        return [undefined, new Error("No Guild Settings Returned")];
    }

    return [(res.data.results as GuildSettings), undefined];
};