import axios, { AxiosResponse } from 'axios';
import { GuildResolvable } from 'discord.js';
import { CommandDispatch } from '../../types/commands.js';
import { ApiPaginatedResponse, ApiPaginationParams } from '../../types/api.js';
import { Fortune } from '../../types/entities/Fortune.js';
import { HandleReturn } from '../../types/promises.js';

import { issueToken } from '../../middleware/index.js';

import { ENV } from '../../constants/index.js';
import { promises } from '../../utils/index.js';

const baseEndpoint = ENV.API_URL + "/custom/fortunes";

type GetByGuildIdReturn = HandleReturn<ApiPaginatedResponse<Fortune>>;

export async function getByGuildId(guildId: GuildResolvable, dispatch: CommandDispatch, params: ApiPaginationParams): GetByGuildIdReturn {
    const token = await issueToken(dispatch);

    const request = axios.get(`${baseEndpoint}/guild/${guildId}/?page=${params.page ?? 1}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const [res, err] = await promises.handle<AxiosResponse>(request);

    if(err) {
        return [undefined, err];
    }

    if(!res || !res.data.results) {
        return [undefined, new Error("No Fortunes Returned")];
    }

    return [(res.data as ApiPaginatedResponse<Fortune>), undefined];
};

export async function create(guildId: GuildResolvable, dispatch: CommandDispatch, fortune: string): HandleReturn<Fortune> {
    const token = await issueToken(dispatch);

    const data = {
        fortune: fortune
    };

    const request = axios.post(`${baseEndpoint}/guild/${guildId}`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const [res, err] = await promises.handle<AxiosResponse>(request);

    if(err) {
        return [undefined, err];
    }

    if(!res || !res.data.results) {
        return [undefined, new Error("No Fortune returned")];
    }

    return [(res.data.results as Fortune), undefined];
};

export async function destroy(guildId: GuildResolvable, dispatch: CommandDispatch, fortuneId: number): HandleReturn<boolean> {
    const token = await issueToken(dispatch);

    const request = axios.delete(`${baseEndpoint}/guild/${guildId}/id/${fortuneId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const [res, err] = await promises.handle<AxiosResponse>(request);

    if(err) {
        return [undefined, err];
    }

    if(!res || !res.data.results) {
        return [undefined, new Error("No Fortune returned")];
    }

    return [true, undefined];
};