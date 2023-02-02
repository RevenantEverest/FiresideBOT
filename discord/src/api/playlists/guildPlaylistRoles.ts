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

import { GuildPlaylistRole, GuildPlaylistRoleCreate } from '../../types/entities/GuildPlaylistRole.js';

import { issueToken } from '../../middleware/index.js';

import { ENV } from '../../constants/index.js';
import { promises } from '../../utils/index.js';

type ApiResponse = AxiosApiResponse<GuildPlaylistRole>;
type PaginatedApiResponse = AxiosPaginatedApiResponse<GuildPlaylistRole>;

type GetByPlaylistIdReturn = HandleAxiosReturn<ApiPaginatedResponse<GuildPlaylistRole>>;

const baseEndpoint = ENV.API_URL + "/playlists/guild";

export async function getByPlaylistId(dispatch: CommandDispatch, playlistId: number, params: ApiPaginationParams): GetByPlaylistIdReturn {
    const token = await issueToken(dispatch);

    const request = axios.get(`${baseEndpoint}/guild_id/${dispatch.guildId}/id/${playlistId}/roles?page=${params.page ?? 1}`, {
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

export async function create(dispatch: CommandDispatch, guildPlaylistRole: GuildPlaylistRoleCreate): HandleAxiosReturn<GuildPlaylistRole> {
    const token = await issueToken(dispatch);

    const request = axios.post(`${baseEndpoint}/guild_id/${dispatch.guildId}/id/${guildPlaylistRole.playlist_id}/roles`, guildPlaylistRole, {
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

export async function destroy(dispatch: CommandDispatch, playlistId: number, roleId: number): HandleAxiosReturn<GuildPlaylistRole> {
    const token = await issueToken(dispatch);

    const request = axios.delete(`${baseEndpoint}/guild_id/${dispatch.guildId}/id/${playlistId}/roles/id/${roleId}`, {
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