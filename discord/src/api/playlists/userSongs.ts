import { CommandDispatch } from '../../types/commands.js';
import { HandleAxiosReturn } from '../../types/promises.js';
import { UserSong, UserSongCreate } from '../../types/entities/UserSong.js';
import { UserPlaylist } from '../../types/entities/UserPlaylist.js';
import { ApiPaginatedResponse, ApiPaginationParams } from '../../types/api.js';

import { ENV } from '../../constants/index.js';
import { apiRequests } from '../../utils/index.js';

type PaginatedResponse = HandleAxiosReturn<ApiPaginatedResponse<UserSong>>;

const baseEndpoint = ENV.API_URL + "/playlists/user";

export async function getByPlaylistId(dispatch: CommandDispatch, playlist: UserPlaylist, params: ApiPaginationParams): PaginatedResponse {
    const endpoint = `${baseEndpoint}/id/${playlist.id}/songs?page=${params.page ?? 1}`;
    return apiRequests.paginatedRequest<UserSong>({
        dispatch,
        endpoint,
        method: "get"
    });
};

export async function create(dispatch: CommandDispatch, songInfo: UserSongCreate): HandleAxiosReturn<UserSong> {
    const endpoint = `${baseEndpoint}/songs`;
    return apiRequests.request<UserSong, UserSongCreate>({
        dispatch,
        endpoint,
        method: "post",
        data: songInfo
    });
};

export async function destroy(dispatch: CommandDispatch, playlistID: number, id: number): HandleAxiosReturn<UserSong> {
    const endpoint = `${baseEndpoint}/id/${playlistID}/songs/id/${id}`;
    return apiRequests.request<UserSong>({
        dispatch,
        endpoint,
        method: "delete"
    });
};