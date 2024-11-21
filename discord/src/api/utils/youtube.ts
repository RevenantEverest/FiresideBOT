import type { CommandDispatch } from '@@types/commands.js';
import type { HandleAxiosReturn } from '@@types/promises.js';
import type { SongInfo } from '@@types/youtube.js';


import { ENV } from '@@constants/index.js';
import { apiRequests } from '@@utils/index.js';

const baseEndpoint = ENV.API_URL + "/utils/youtube";

export async function search(dispatch: CommandDispatch, request: string): HandleAxiosReturn<SongInfo> {
    const endpoint = `${baseEndpoint}/search/${request}`;
    return apiRequests.request<SongInfo>({
        dispatch,
        endpoint,
        method: "get"
    });
};