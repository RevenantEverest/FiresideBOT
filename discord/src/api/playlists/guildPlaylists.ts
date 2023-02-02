import axios from 'axios';
import { GuildResolvable } from 'discord.js';
import { CommandDispatch } from '../../types/commands.js';
import { HandleAxiosReturn } from '../../types/promises.js';
import { 
    AxiosApiResponse, 
    AxiosPaginatedApiResponse, 
    ApiPaginatedResponse, 
    ApiPaginationParams
} from '../../types/api.js';

import { GuildPlaylist, GuildPlaylistUpdate } from '../../types/entities/GuildPlaylist.js';

import { issueToken } from '../../middleware/index.js';

import { ENV } from '../../constants/index.js';
import { promises } from '../../utils/index.js';

type ApiResponse = AxiosApiResponse<GuildPlaylist>;
type PaginatedApiResponse = AxiosPaginatedApiResponse<GuildPlaylist>;

type GetByGuildIdReturn = HandleAxiosReturn<ApiPaginatedResponse<GuildPlaylist>>;

const baseEndpoint = ENV.API_URL + "/playlists/guild";

export async function getByGuildId(dispatch: CommandDispatch, guildId: GuildResolvable, params: ApiPaginationParams): GetByGuildIdReturn {
    const token = await issueToken(dispatch);

    const request = axios.get(`${baseEndpoint}/guild_id/${guildId}?page=${params.page ?? 1}`, {
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

export async function getByGuildIdAndName(dispatch: CommandDispatch, guildId: GuildResolvable, playlistName: string): HandleAxiosReturn<GuildPlaylist> {
    const token = await issueToken(dispatch);

    const request = axios.get(`${baseEndpoint}/guild_id/${guildId}/name/${playlistName}`, {
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

export async function update(dispatch: CommandDispatch, playlist: GuildPlaylistUpdate): HandleAxiosReturn<GuildPlaylist> {
    const token = await issueToken(dispatch);

    const request = axios.put(`${baseEndpoint}/guild_id/${dispatch.guildId}/id/${playlist.id}`, playlist, {
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

export async function create(dispatch: CommandDispatch, playlistName: string): HandleAxiosReturn<GuildPlaylist> {
    const token = await issueToken(dispatch);

    const data = {
        name: playlistName
    };
    const request = axios.post(`${baseEndpoint}/guild_id/${dispatch.guildId}`, data, {
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