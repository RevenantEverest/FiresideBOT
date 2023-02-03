import { CommandDispatch } from '../../types/commands.js';
import { HandleAxiosReturn } from '../../types/promises.js';
import { ApiPaginatedResponse, ApiPaginationParams } from '../../types/api.js';

import { GuildPlaylistRole, GuildPlaylistRoleCreate } from '../../types/entities/GuildPlaylistRole.js';

import { ENV } from '../../constants/index.js';
import { apiRequests } from '../../utils/index.js';

type PaginatedResponse = HandleAxiosReturn<ApiPaginatedResponse<GuildPlaylistRole>>;

const baseEndpoint = ENV.API_URL + "/playlists/guild";

export async function getByPlaylistId(dispatch: CommandDispatch, playlistId: number, params: ApiPaginationParams): PaginatedResponse {
    const endpoint = `${baseEndpoint}/guild_id/${dispatch.guildId}/id/${playlistId}/roles?page=${params.page ?? 1}`;
    return apiRequests.paginatedRequest<GuildPlaylistRole>({
        dispatch,
        endpoint,
        method: "get"
    });
};

export async function create(dispatch: CommandDispatch, guildPlaylistRole: GuildPlaylistRoleCreate): HandleAxiosReturn<GuildPlaylistRole> {
    const endpoint = `${baseEndpoint}/guild_id/${dispatch.guildId}/id/${guildPlaylistRole.playlist_id}/roles`;
    return apiRequests.request<GuildPlaylistRole, GuildPlaylistRoleCreate>({
        dispatch,
        endpoint,
        method: "post",
        data: guildPlaylistRole
    });
};

export async function destroy(dispatch: CommandDispatch, playlistId: number, roleId: number): HandleAxiosReturn<GuildPlaylistRole> {
    const endpoint = `${baseEndpoint}/guild_id/${dispatch.guildId}/id/${playlistId}/roles/id/${roleId}`;
    return apiRequests.request<GuildPlaylistRole>({
        dispatch,
        endpoint,
        method: "delete"
    });
};