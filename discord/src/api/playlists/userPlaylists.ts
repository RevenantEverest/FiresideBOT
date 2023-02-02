import axios from 'axios';
import { UserResolvable } from 'discord.js';
import { CommandDispatch } from '../../types/commands.js';
import { HandleAxiosReturn } from '../../types/promises.js';
import { AxiosApiResponse, AxiosPaginatedApiResponse, ApiPaginatedResponse, ApiPaginationParams } from 'src/types/api.js';

import { UserPlaylist, UserPlaylistUpdate } from '../../types/entities/UserPlaylist.js';

import { issueToken } from '../../middleware/index.js';

import { ENV } from '../../constants/index.js';
import { promises } from '../../utils/index.js';

type ApiResponse = AxiosApiResponse<UserPlaylist>;
type PaginatedApiResponse = AxiosPaginatedApiResponse<UserPlaylist>;

type GetByDiscordIdReturn = HandleAxiosReturn<ApiPaginatedResponse<UserPlaylist>>;

const baseEndpoint = ENV.API_URL + "/playlists/user";

export async function getByDiscordIdAndName(dispatch: CommandDispatch, discordId: UserResolvable, playlistName: string): HandleAxiosReturn<UserPlaylist> {
    const token = await issueToken(dispatch);

    const request = axios.get(`${baseEndpoint}/discord_id/${discordId}/name/${playlistName}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const [res, err] = await promises.handleApi<ApiResponse>(request);

    if(err) {
        return [undefined, err];
    }

    return [res?.data.results, undefined];
};

export async function getByDiscordId(dispatch: CommandDispatch, discordId: UserResolvable, params: ApiPaginationParams): GetByDiscordIdReturn {
    const token = await issueToken(dispatch);

    const request = axios.get(`${baseEndpoint}/discord_id/${discordId}?page=${params.page ?? 1}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const [res, err] = await promises.handleApi<PaginatedApiResponse>(request);

    if(err) {
        return [undefined, err];
    }

    return [res?.data, undefined];
};

export async function getByDiscordIdAndNameOrCreate(dispatch: CommandDispatch, discordId: UserResolvable, playlistName: string): HandleAxiosReturn<UserPlaylist> {
    const token = await issueToken(dispatch);

    // Check here
    const request = axios.get(`${baseEndpoint}/discord_id/${discordId}/name/${playlistName}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const [res, err] = await promises.handleApi<ApiResponse>(request);

    if(err) {
        if(err.response?.status === 404) {
            return create(dispatch, playlistName);
        }
        return [undefined, err];
    }

    return [res?.data.results, undefined];
};

export async function update(dispatch: CommandDispatch, playlist: UserPlaylistUpdate): HandleAxiosReturn<UserPlaylist> {
    const token = await issueToken(dispatch);

    const request = axios.put(`${baseEndpoint}/id/${playlist.id}`, playlist, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const [res, err] = await promises.handleApi<ApiResponse>(request);

    if(err) {
        return [undefined, err];
    }

    return [res?.data.results, undefined];
};

export async function create(dispatch: CommandDispatch, playlistName: string): HandleAxiosReturn<UserPlaylist> {
    const token = await issueToken(dispatch);

    const data = {
        name: playlistName
    };
    const request = axios.post(`${baseEndpoint}`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const [res, err] = await promises.handleApi<ApiResponse>(request);

    if(err) {
        return [undefined, err];
    }

    return [res?.data.results, undefined];
};