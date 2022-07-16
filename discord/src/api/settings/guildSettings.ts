import axios, { AxiosResponse } from 'axios';
import { GuildResolvable, Message } from 'discord.js';
import { CommandDispatch } from 'src/types/commands.js';
import { GuildSettings } from '../../types/entities/GuildSettings.js';
import { HandleReturn } from '../../types/promises.js';

import { issueToken } from '../../middleware/index.js';

import { ENV } from '../../constants/index.js';
import { promises } from '../../utils/index.js';

const baseEndpoint = ENV.API_URL + "/settings/guild";

export async function get(guildId: GuildResolvable, dispatch: CommandDispatch): HandleReturn<GuildSettings> {
    const token = await issueToken(dispatch);
    
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

export async function update(guildId: GuildResolvable, dispatch: CommandDispatch, guildSettings: GuildSettings): HandleReturn<GuildSettings> {
    const token = await issueToken(dispatch);

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