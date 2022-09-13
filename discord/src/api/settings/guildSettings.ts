import axios, { Axios, AxiosError, AxiosResponse } from 'axios';
import { GuildResolvable } from 'discord.js';
import { CommandDispatch } from 'src/types/commands.js';
import { GuildSettings } from '../../types/entities/GuildSettings.js';
import { HandleReturn } from '../../types/promises.js';

import { issueToken } from '../../middleware/index.js';

import { ENV } from '../../constants/index.js';
import { promises } from '../../utils/index.js';

const baseEndpoint = ENV.API_URL + "/settings/guild";

export async function get(dispatch: CommandDispatch): HandleReturn<GuildSettings> {
    const token = await issueToken(dispatch);
    
    const request = axios.get(`${baseEndpoint}/${dispatch.guildId}`, {
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

export async function getOrSave(dispatch: CommandDispatch): HandleReturn<GuildSettings> {

    const [findRes, findErr] = await get(dispatch);

    if(findRes) {
        return [findRes, undefined];
    }

    if((findErr as AxiosError).response?.status !== 404) {
        return [undefined, findErr];
    }

    const token = await issueToken(dispatch);
    const request = axios.post(`${baseEndpoint}/${dispatch.guildId}`, null, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const [postRes, postErr] = await promises.handle(request);

    if(postErr) {
        return [undefined, postErr];
    }

    if(!postRes || !postRes.data.results) {
        return [undefined, new Error("No Guild Settings Returned")];
    }

    return [(postRes.data.results as GuildSettings), undefined];
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