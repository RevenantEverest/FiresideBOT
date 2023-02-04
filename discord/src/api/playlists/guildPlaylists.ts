import { GuildResolvable } from 'discord.js';
import { CommandDispatch } from '../../types/commands.js';
import { HandleAxiosReturn } from '../../types/promises.js';
import { ApiPaginatedResponse, ApiPaginationParams } from '../../types/api.js';

import { GuildPlaylist, GuildPlaylistUpdate } from '../../types/entities/GuildPlaylist.js';

import { ENV } from '../../constants/index.js';
import { apiRequests } from '../../utils/index.js';

type PaginatedResponse = HandleAxiosReturn<ApiPaginatedResponse<GuildPlaylist>>;

const baseEndpoint = ENV.API_URL + "/playlists/guild";

export async function getByGuildId(dispatch: CommandDispatch, guildId: GuildResolvable, params: ApiPaginationParams): PaginatedResponse {
    const endpoint = `${baseEndpoint}/guild_id/${guildId}?page=${params.page ?? 1}`;
    return apiRequests.paginatedRequest<GuildPlaylist>({
        dispatch,
        endpoint,
        method: "get"
    });
};

export async function getByGuildIdAndName(dispatch: CommandDispatch, guildId: GuildResolvable, playlistName: string): HandleAxiosReturn<GuildPlaylist> {
    const endpoint = `${baseEndpoint}/guild_id/${guildId}/name/${playlistName}`;
    return apiRequests.request<GuildPlaylist>({
        dispatch,
        endpoint,
        method: "get"
    });
};

export async function update(dispatch: CommandDispatch, playlist: GuildPlaylistUpdate): HandleAxiosReturn<GuildPlaylist> {
    const endpoint = `${baseEndpoint}/guild_id/${dispatch.guildId}/id/${playlist.id}`;
    return apiRequests.request<GuildPlaylist, GuildPlaylistUpdate>({
        dispatch, 
        endpoint,
        method: "put",
        data: playlist 
    });
};

export async function create(dispatch: CommandDispatch, playlistName: string): HandleAxiosReturn<GuildPlaylist> {
    const endpoint = `${baseEndpoint}/guild_id/${dispatch.guildId}`;
    return apiRequests.request<GuildPlaylist, { name: string }>({ 
        dispatch, 
        endpoint,
        method: "post", 
        data: { 
            name: playlistName 
        } 
    });
};

export async function destroy(dispatch: CommandDispatch, playlist: GuildPlaylist): HandleAxiosReturn<GuildPlaylist> {
    const endpoint = `${baseEndpoint}/guild_id/${dispatch.guildId}/id/${playlist.id}`;
    return apiRequests.request<GuildPlaylist>({
        dispatch,
        endpoint,
        method: "delete"
    });
};