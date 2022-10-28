import axios from 'axios';
import { CommandDispatch } from '../../types/commands.js';
import { HandleAxiosReturn } from '../../types/promises.js';
import { UserSong } from '../../types/entities/UserSong.js';
import { UserPlaylist } from '../../types/entities/UserPlaylist.js';
import { SongInfo } from '../../types/youtube.js';
import { 
    ApiPaginatedResponse, 
    ApiPaginationParams, 
    AxiosApiResponse,
    AxiosPaginatedApiResponse
} from '../../types/api.js';

import { issueToken } from '../../middleware/index.js';

import { ENV } from '../../constants/index.js';
import { promises } from '../../utils/index.js';

type ApiResponse = AxiosApiResponse<UserSong>;
type PaginatedApiResponse = AxiosPaginatedApiResponse<UserSong>;

type GetByPlaylistIdReturn = HandleAxiosReturn<ApiPaginatedResponse<UserSong>>;

const baseEndpoint = ENV.API_URL + "/playlists/user";

export async function getByPlaylistId(dispatch: CommandDispatch, playlist: UserPlaylist, params: ApiPaginationParams): GetByPlaylistIdReturn {
    const token = await issueToken(dispatch);

    const request = axios.get(`${baseEndpoint}/id/${playlist.id}/songs?page=${params.page ?? 1}`, {
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

export async function create(dispatch: CommandDispatch, songInfo: SongInfo): HandleAxiosReturn<UserSong> {
    const token = await issueToken(dispatch);

    const request = axios.post(`${baseEndpoint}/songs`, songInfo, {
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