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

import { GuildSong, GuildSongCreate } from '../../types/entities/GuildSong.js';
import { GuildPlaylist } from '../../types/entities/GuildPlaylist.js';

import { issueToken } from '../../middleware/index.js';

import { ENV } from '../../constants/index.js';
import { promises } from '../../utils/index.js';

type ApiResponse = AxiosApiResponse<GuildSong>;
type PaginatedApiResponse = AxiosPaginatedApiResponse<GuildSong>;

type GetByPlaylistIdReturn = HandleAxiosReturn<ApiPaginatedResponse<GuildSong>>;

const baseEndpoint = ENV.API_URL + "/playlists/guild";

export async function getByPlaylistId(dispatch: CommandDispatch, playlist: GuildPlaylist, params: ApiPaginationParams): GetByPlaylistIdReturn {
    const token = await issueToken(dispatch);

    const request = axios.get(`${baseEndpoint}/guild_id/${dispatch.guildId}/id/${playlist.id}/songs?page=${params.page ?? 1}`, {
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

export async function create(dispatch: CommandDispatch, songInfo: GuildSongCreate): HandleAxiosReturn<GuildSong> {
    const token = await issueToken(dispatch);

    const request = axios.post(`${baseEndpoint}/guild_id/${dispatch.guildId}/id/${songInfo.playlist_id}/songs`, songInfo, {
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

export async function destroy(dispatch: CommandDispatch, playlistID: number, id: number): HandleAxiosReturn<GuildSong> {
    const token = await issueToken(dispatch);

    const request = axios.delete(`${baseEndpoint}/guild_id/${dispatch.guildId}/id/${playlistID}/songs/id/${id}`, {
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