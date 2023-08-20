import { HandleAxiosReturn } from '../../types/promises.js';
import { ApiPaginatedResponse, ApiPaginationParams } from '../../types/api.js';

import { GuildWarsEvent } from '../../types/guildwarsEvents.js';

import { ENV } from '../../constants/index.js';
import { apiRequests } from '../../utils/index.js';

type PaginatedResponse = HandleAxiosReturn<ApiPaginatedResponse<GuildWarsEvent>>;

const baseEndpoint = ENV.API_URL + "/guildwars/events";

export async function getByEventTime(timestamp: string, params?: ApiPaginationParams): PaginatedResponse {
    const endpoint = `${baseEndpoint}/time/${timestamp}?page=${params?.page ?? 1}`;
    return apiRequests.paginatedRequest({
        endpoint,
        method: "get"
    });
};