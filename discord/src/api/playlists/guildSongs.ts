import { CommandDispatch } from '../../types/commands.js';
import { HandleAxiosReturn } from '../../types/promises.js';
import { ApiPaginatedResponse, ApiPaginationParams } from '../../types/api.js';

import { GuildSong, GuildSongCreate } from '../../types/entities/GuildSong.js';
import { GuildPlaylist } from '../../types/entities/GuildPlaylist.js';

import { ENV } from '../../constants/index.js';
import { apiRequests } from '../../utils/index.js';

type PaginatedResponse = HandleAxiosReturn<ApiPaginatedResponse<GuildSong>>;

const baseEndpoint = ENV.API_URL + "/playlists/guild";

export async function getByPlaylistId(dispatch: CommandDispatch, playlist: GuildPlaylist, params: ApiPaginationParams): PaginatedResponse {
    const endpoint = `${baseEndpoint}/guild_id/${dispatch.guildId}/id/${playlist.id}/songs?page=${params.page ?? 1}`;
    return apiRequests.paginatedRequest<GuildSong>({
        dispatch,
        endpoint,
        method: "get"
    });
};

export async function create(dispatch: CommandDispatch, songInfo: GuildSongCreate): HandleAxiosReturn<GuildSong> {
    const endpoint = `${baseEndpoint}/guild_id/${dispatch.guildId}/id/${songInfo.playlist_id}/songs`;
    return apiRequests.request<GuildSong, GuildSongCreate>({
        dispatch,
        endpoint,
        method: "post",
        data: songInfo
    });
};

export async function destroy(dispatch: CommandDispatch, playlistID: number, id: number): HandleAxiosReturn<GuildSong> {
    const endpoint = `${baseEndpoint}/guild_id/${dispatch.guildId}/id/${playlistID}/songs/id/${id}`;
    return apiRequests.request<GuildSong>({
        dispatch,
        endpoint,
        method: "delete"
    });
};