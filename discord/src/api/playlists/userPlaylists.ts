import { UserResolvable } from 'discord.js';
import { CommandDispatch } from '../../types/commands.js';
import { HandleAxiosReturn } from '../../types/promises.js';
import { ApiPaginatedResponse, ApiPaginationParams } from 'src/types/api.js';

import { UserPlaylist, UserPlaylistUpdate } from '../../types/entities/UserPlaylist.js';

import { ENV } from '../../constants/index.js';
import { apiRequests } from '../../utils/index.js';

type PaginatedResponse = HandleAxiosReturn<ApiPaginatedResponse<UserPlaylist>>;

const baseEndpoint = ENV.API_URL + "/playlists/user";

export async function getByDiscordId(dispatch: CommandDispatch, discordId: UserResolvable, params: ApiPaginationParams): PaginatedResponse {
    const endpoint = `${baseEndpoint}/discord_id/${discordId}?page=${params.page ?? 1}`;
    return apiRequests.paginatedRequest<UserPlaylist>({
        dispatch,
        endpoint,
        method: "get"
    });
};

export async function getByDiscordIdAndName(dispatch: CommandDispatch, discordId: UserResolvable, playlistName: string): HandleAxiosReturn<UserPlaylist> {
    const endpoint = `${baseEndpoint}/discord_id/${discordId}/name/${playlistName}`;
    return apiRequests.request<UserPlaylist>({
        dispatch,
        endpoint,
        method: "get"
    });
};

export async function getByDiscordIdAndNameOrCreate(dispatch: CommandDispatch, discordId: UserResolvable, playlistName: string): HandleAxiosReturn<UserPlaylist> {
    const endpoint = `${baseEndpoint}/discord_id/${discordId}/name/${playlistName}`;
    return apiRequests.request<UserPlaylist>({
        dispatch,
        endpoint,
        method: "get"
    });
};

export async function update(dispatch: CommandDispatch, playlist: UserPlaylistUpdate): HandleAxiosReturn<UserPlaylist> {
    const endpoint = `${baseEndpoint}/id/${playlist.id}`;
    return apiRequests.request<UserPlaylist, UserPlaylistUpdate>({
        dispatch,
        endpoint,
        method: "put",
        data: playlist
    });
};

export async function create(dispatch: CommandDispatch, playlistName: string): HandleAxiosReturn<UserPlaylist> {
    const endpoint = baseEndpoint;
    return apiRequests.request<UserPlaylist, { name: string }>({
        dispatch,
        endpoint,
        method: "post",
        data: {
            name: playlistName
        }
    });
};

export async function destroy(dispatch: CommandDispatch, playlist: UserPlaylist): HandleAxiosReturn<UserPlaylist> {
    const endpoint = `${baseEndpoint}/id/${playlist.id}`;
    return apiRequests.request<UserPlaylist>({
        dispatch,
        endpoint,
        method: "delete"
    });
};